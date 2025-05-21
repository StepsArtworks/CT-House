import React, { useEffect } from 'react';
import { useModelContext } from '../context/ModelContext';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function useModels() {
  const fullHouse = useGLTF('/models/1FullHouse.glb', true);
  const groundFloor = useGLTF('/models/GroundFloor.glb', true);
  const firstFloor = useGLTF('/models/FirstFloor.glb', true);
  const basement = useGLTF('/models/BasementFloor.glb', true);
  
  // Cleanup function to dispose of models when component unmounts
  useEffect(() => {
    return () => {
      fullHouse.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      groundFloor.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      firstFloor.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      basement.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, []);
  
  return {
    fullHouse,
    groundFloor,
    firstFloor,
    basement
  };
}

interface FloorProps {
  model: THREE.Group;
  position: [number, number, number];
  isVisible: boolean;
  name: string;
}

const Floor: React.FC<FloorProps> = ({ model, position, isVisible, name }) => {
  if (!isVisible) return null;
  
  return (
    <group position={position}>
      <primitive object={model} />
      <Html
        position={[0, 2, 0]}
        center
        distanceFactor={10}
      >
        <div className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 rounded text-xs shadow-sm">
          {name}
        </div>
      </Html>
    </group>
  );
};

const HouseModel: React.FC = () => {
  const { currentFloor, isLoading } = useModelContext();
  const models = useModels();
  
  if (isLoading) return null;

  // Show full house model
  if (currentFloor === -1) {
    return (
      <group>
        <primitive object={models.fullHouse.scene} />
      </group>
    );
  }
  
  // Define floor configurations
  const floors = [
    {
      name: 'Basement',
      position: [0, 0, 0] as [number, number, number],
      model: models.basement.scene,
    },
    {
      name: 'Ground Floor',
      position: [0, 0, 0] as [number, number, number],
      model: models.groundFloor.scene,
    },
    {
      name: 'First Floor',
      position: [0, 0, 0] as [number, number, number],
      model: models.firstFloor.scene,
    }
  ];

  // Show selected floor
  const selectedFloor = floors[currentFloor];
  if (!selectedFloor) return null;

  return (
    <group>
      <Floor 
        position={selectedFloor.position}
        model={selectedFloor.model}
        isVisible={true}
        name={selectedFloor.name}
      />
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