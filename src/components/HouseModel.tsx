import React, { useEffect } from 'react';
import { useModelContext } from '../context/ModelContext';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function useModels() {
  const fullHouse = useGLTF('/models/1FullHouse.glb');
  const groundFloor = useGLTF('/models/GroundFloor.glb');
  const firstFloor = useGLTF('/models/FirstFloor.glb');
  const basement = useGLTF('/models/BasementFloor.glb');
  
  useEffect(() => {
    return () => {
      [fullHouse, groundFloor, firstFloor, basement].forEach(model => {
        model.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      });
    };
  }, [fullHouse, groundFloor, firstFloor, basement]);
  
  return {
    fullHouse,
    groundFloor,
    firstFloor,
    basement
  };
}

const HouseModel: React.FC = () => {
  const { currentFloor, setIsLoading } = useModelContext();
  const models = useModels();
  
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  // Show full house model
  if (currentFloor === -1) {
    return (
      <group>
        <primitive object={models.fullHouse.scene} />
      </group>
    );
  }
  
  // Show individual floor based on selection
  let currentModel;
  let floorName;
  
  switch(currentFloor) {
    case 0:
      currentModel = models.basement.scene;
      floorName = 'Basement';
      break;
    case 1:
      currentModel = models.groundFloor.scene;
      floorName = 'Ground Floor';
      break;
    case 2:
      currentModel = models.firstFloor.scene;
      floorName = 'First Floor';
      break;
    default:
      return null;
  }

  return (
    <group>
      <primitive object={currentModel} />
      <Html
        position={[0, 2, 0]}
        center
        distanceFactor={10}
      >
        <div className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 rounded text-xs shadow-sm">
          {floorName}
        </div>
      </Html>
    </group>
  );
};

// Preload models
useGLTF.preload([
  '/models/1FullHouse.glb',
  '/models/GroundFloor.glb',
  '/models/FirstFloor.glb',
  '/models/BasementFloor.glb'
]);

export default HouseModel;