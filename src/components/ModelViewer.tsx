import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ModelState, FloorLevel } from '../types/model';
import LoadingScreen from './LoadingScreen';
import * as THREE from 'three';

// Mock sample model - replace with actual geometry
function HouseModel({ modelState }: { modelState: ModelState }) {
  // Temporary box geometry to represent the house
  const groundFloor = new THREE.BoxGeometry(5, 1, 5);
  const firstFloor = new THREE.BoxGeometry(4.5, 1, 4.5);
  const secondFloor = new THREE.BoxGeometry(4, 1, 4);
  
  return (
    <group>
      {/* Ground Floor */}
      <mesh 
        geometry={groundFloor} 
        position={[0, 0.5, 0]}
        visible={modelState.floors.ground.visible}
      >
        <meshStandardMaterial 
          color="#8B7355"
          transparent
          opacity={modelState.floors.ground.furnitureOpacity / 100}
        />
      </mesh>
      
      {/* First Floor */}
      <mesh 
        geometry={firstFloor}
        position={[0, 2, 0]}
        visible={modelState.floors.first.visible}
      >
        <meshStandardMaterial 
          color="#A0522D"
          transparent
          opacity={modelState.floors.first.furnitureOpacity / 100}
        />
      </mesh>
      
      {/* Second Floor */}
      <mesh 
        geometry={secondFloor}
        position={[0, 3.5, 0]}
        visible={modelState.floors.second.visible}
      >
        <meshStandardMaterial 
          color="#6B4423"
          transparent
          opacity={modelState.floors.second.furnitureOpacity / 100}
        />
      </mesh>
    </group>
  );
}

interface ModelViewerProps {
  modelState: ModelState;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelState }) => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {modelState.isLoading ? (
        <LoadingScreen progress={modelState.loadingProgress} />
      ) : (
        <Canvas shadows>
          <Suspense fallback={<LoadingScreen progress={0} />}>
            <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={45} />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 10]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            <HouseModel modelState={modelState} />
            <Environment preset="apartment" />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default ModelViewer;