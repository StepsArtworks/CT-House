import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { Html, useGLTF } from '@react-three/drei';
import { ViewMode } from '../context/ModelContext';
import * as THREE from 'three';

// Load all models
function useModels() {
  const groundFloor = useGLTF('./models/GroundFloor.glb');
  const firstFloor = useGLTF('./models/FirstFloor.glb');
  const basement = useGLTF('./models/BasementFloor.glb');
  const roof = useGLTF('./models/Roof.glb');
  const basementFurniture = useGLTF('./models/BasementFurniture.glb');
  const groundFurniture = useGLTF('./models/GroundFloorFurniture.glb');
  const firstFurniture = useGLTF('./models/FirstFloorFurniture.glb');
  
  return {
    groundFloor,
    firstFloor,
    basement,
    roof,
    basementFurniture,
    groundFurniture,
    firstFurniture
  };
}

interface FloorProps {
  model: THREE.Group;
  furniture: THREE.Group;
  position: [number, number, number];
  isVisible: boolean;
  name: string;
  viewMode: ViewMode;
}

const Floor: React.FC<FloorProps> = ({ model, furniture, position, isVisible, name, viewMode }) => {
  if (!isVisible) return null;
  
  // Clone the models to avoid sharing materials
  const floorModel = model.clone();
  const furnitureModel = furniture.clone();
  
  // Apply material based on view mode
  floorModel.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material.clone();
      switch (viewMode) {
        case ViewMode.WIREFRAME:
          material.wireframe = true;
          break;
        case ViewMode.TRANSPARENT:
          material.transparent = true;
          material.opacity = 0.5;
          break;
        default:
          break;
      }
      child.material = material;
    }
  });
  
  return (
    <group position={position}>
      <primitive object={floorModel} />
      <primitive object={furnitureModel} />
      
      {/* Floor label */}
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
  const { currentFloor, viewMode, isLoading } = useModelContext();
  const models = useModels();
  
  if (isLoading) return null;
  
  // Define the floor configurations
  const floors = [
    {
      name: 'Basement',
      position: [0, -3, 0] as [number, number, number],
      model: models.basement.scene,
      furniture: models.basementFurniture.scene,
    },
    {
      name: 'Ground Floor',
      position: [0, 0, 0] as [number, number, number],
      model: models.groundFloor.scene,
      furniture: models.groundFurniture.scene,
    },
    {
      name: 'First Floor',
      position: [0, 3, 0] as [number, number, number],
      model: models.firstFloor.scene,
      furniture: models.firstFurniture.scene,
    }
  ];

  return (
    <group>
      {floors.map((floor, index) => (
        <Floor 
          key={index}
          position={floor.position}
          model={floor.model}
          furniture={floor.furniture}
          isVisible={currentFloor === -1 || currentFloor === index}
          name={floor.name}
          viewMode={viewMode}
        />
      ))}
      {/* Roof is always visible */}
      <primitive object={models.roof.scene} position={[0, 6, 0]} />
    </group>
  );
};

export default HouseModel;