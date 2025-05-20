import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { ModelState } from '../types/model';
import LoadingScreen from './LoadingScreen';

// Preload the full house model
useGLTF.preload('/public/assets/models/1FullHouse.glb');

function HouseModel({ modelState }: { modelState: ModelState }) {
  // Load the full house model
  const { scene } = useGLTF('/public/assets/models/1FullHouse.glb');
  
  // Clone the scene to avoid modifying the cached original
  const model = React.useMemo(() => scene.clone(), [scene]);

  // Cleanup function to dispose of materials and geometries
  React.useEffect(() => {
    return () => {
      model.traverse((child) => {
        if ('geometry' in child) {
          child.geometry?.dispose();
        }
        if ('material' in child) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(material => material?.dispose());
        }
      });
    };
  }, [model]);

  return (
    <group>
      <primitive object={model} />
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
            <PerspectiveCamera makeDefault position={[10, 5, 10]} fov={45} />
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