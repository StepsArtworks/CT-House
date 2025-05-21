import React, { useEffect } from 'react';
import { useModelContext } from '../context/ModelContext';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_BASE_PATH = '/capetownhouse/models/';

const HouseModel: React.FC = () => {
  const { currentFloor, showFurniture, setIsLoading } = useModelContext();
  
  // Load models using useGLTF
  const model = useGLTF(
    currentFloor === -1
      ? `${MODEL_BASE_PATH}1FullHouse.glb`
      : `${MODEL_BASE_PATH}${getFloorModelName(currentFloor)}`
  );

  // Load furniture model if needed
  const furnitureModel = (currentFloor === 0 || currentFloor === 1 || currentFloor === 2) && showFurniture
    ? useGLTF(`${MODEL_BASE_PATH}${getFurnitureModelName(currentFloor)}`)
    : null;

  useEffect(() => {
    // Apply default material and lighting settings to both models
    const applyModelSettings = (scene: THREE.Group) => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            const material = child.material as THREE.Material;
            material.needsUpdate = true;
            material.side = THREE.DoubleSide;
          }
        }
      });
    };

    applyModelSettings(model.scene);
    if (furnitureModel) {
      applyModelSettings(furnitureModel.scene);
    }

    setIsLoading(false);
    
    // Cleanup
    return () => {
      const disposeModel = (scene: THREE.Group) => {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      };

      disposeModel(model.scene);
      if (furnitureModel) {
        disposeModel(furnitureModel.scene);
      }
    };
  }, [model, furnitureModel, setIsLoading]);

  const floorName = getFloorName(currentFloor);

  return (
    <group>
      <primitive object={model.scene} />
      {furnitureModel && (
        <primitive object={furnitureModel.scene} />
      )}
      {currentFloor !== -1 && (
        <Html
          position={[0, 2, 0]}
          center
          distanceFactor={10}
        >
          <div className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 rounded text-xs shadow-sm">
            {floorName}
            {(currentFloor === 0 || currentFloor === 1 || currentFloor === 2) && showFurniture && " (with furniture)"}
          </div>
        </Html>
      )}
    </group>
  );
};

// Helper functions
function getFloorModelName(floor: number): string {
  switch(floor) {
    case 0: return 'BasementFloor.glb';
    case 1: return 'GroundFloor.glb';
    case 2: return 'FirstFloor.glb';
    default: return '1FullHouse.glb';
  }
}

function getFurnitureModelName(floor: number): string {
  switch(floor) {
    case 0: return 'BasementFurniture.glb';
    case 1: return 'GroundFloorFurniture.glb';
    case 2: return 'FirstFloorFurniture.glb';
    default: return '';
  }
}

function getFloorName(floor: number): string {
  switch(floor) {
    case 0: return 'Basement';
    case 1: return 'Ground Floor';
    case 2: return 'First Floor';
    default: return 'Full House';
  }
}

// Preload models
useGLTF.preload([
  `${MODEL_BASE_PATH}1FullHouse.glb`,
  `${MODEL_BASE_PATH}BasementFloor.glb`,
  `${MODEL_BASE_PATH}GroundFloor.glb`,
  `${MODEL_BASE_PATH}FirstFloor.glb`,
  `${MODEL_BASE_PATH}BasementFurniture.glb`,
  `${MODEL_BASE_PATH}GroundFloorFurniture.glb`,
  `${MODEL_BASE_PATH}FirstFloorFurniture.glb`
]);

export default HouseModel;