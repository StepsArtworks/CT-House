import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { Box, Html } from '@react-three/drei';
import { ViewMode } from '../context/ModelContext';
import * as THREE from 'three';

// Colors for the different floors
const floorColors = [
  new THREE.Color('#90cdf4'), // First floor - light blue
  new THREE.Color('#9ae6b4'), // Second floor - light green
  new THREE.Color('#fbd38d'), // Third floor - light yellow
];

interface FloorProps {
  position: [number, number, number];
  size: [number, number, number];
  color: THREE.Color;
  isVisible: boolean;
  name: string;
  viewMode: ViewMode;
}

const Floor: React.FC<FloorProps> = ({ position, size, color, isVisible, name, viewMode }) => {
  if (!isVisible) return null;
  
  // Determine material based on view mode
  let material;
  switch (viewMode) {
    case ViewMode.WIREFRAME:
      material = <meshStandardMaterial wireframe color={color} />;
      break;
    case ViewMode.TRANSPARENT:
      material = <meshStandardMaterial transparent opacity={0.5} color={color} />;
      break;
    case ViewMode.SOLID:
    default:
      material = <meshStandardMaterial color={color} />;
      break;
  }
  
  return (
    <group position={[position[0], position[1], position[2]]}>
      <Box args={size} castShadow receiveShadow>
        {material}
      </Box>
      
      {/* Floor label */}
      <Html
        position={[0, size[1]/2 + 0.2, 0]}
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

// Mock house model with three floors
const HouseModel: React.FC = () => {
  const { currentFloor, viewMode, isLoading } = useModelContext();
  
  if (isLoading) return null;
  
  // Define the floor dimensions and positions
  const floors = [
    {
      name: 'Ground Floor',
      position: [0, 0.5, 0] as [number, number, number],
      size: [10, 1, 8] as [number, number, number],
    },
    {
      name: 'First Floor',
      position: [0, 2, 0] as [number, number, number],
      size: [9, 1, 7] as [number, number, number],
    },
    {
      name: 'Second Floor',
      position: [0, 3.5, 0] as [number, number, number],
      size: [8, 1, 6] as [number, number, number],
    },
  ];

  return (
    <group>
      {floors.map((floor, index) => (
        <Floor 
          key={index}
          position={floor.position}
          size={floor.size}
          color={floorColors[index]}
          isVisible={currentFloor === -1 || currentFloor === index}
          name={floor.name}
          viewMode={viewMode}
        />
      ))}
    </group>
  );
};

export default HouseModel;