import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera,
  Html,
  useProgress,
  SoftShadows
} from '@react-three/drei';
import { useModelContext } from '../context/ModelContext';
import HouseModel from './HouseModel';
import { Loader } from 'lucide-react';

const Loader3D = () => {
  const { progress, errors } = useProgress();
  
  if (errors.length > 0) {
    return (
      <Html center>
        <div className="glass p-6 rounded-lg flex flex-col items-center text-center max-w-xs">
          <p className="text-lg font-medium text-error">Error loading model</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Please try refreshing the page
          </p>
        </div>
      </Html>
    );
  }
  
  return (
    <Html center>
      <div className="glass p-6 rounded-lg flex flex-col items-center text-center max-w-xs">
        <Loader className="animate-spin h-8 w-8 text-primary mb-3" />
        <p className="text-lg font-medium">{progress.toFixed(0)}% loaded</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Loading model...</p>
      </div>
    </Html>
  );
};

const ModelViewer: React.FC = () => {
  const { isLoading, setIsLoading } = useModelContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsLoading(false);
  }, [setIsLoading]);

  if (!isMounted) return null;

  return (
    <div className="flex-1 h-full w-full model-container">
      <Canvas shadows>
        <SoftShadows size={25} samples={16} />
        <color attach="background" args={['#f8fafc']} />
        
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.6} />
        
        {/* Main directional light (sun-like) */}
        <directionalLight 
          position={[15, 15, 15]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light for softer shadows */}
        <directionalLight 
          position={[-5, 5, -5]}
          intensity={0.4}
        />

        <PerspectiveCamera makeDefault position={[8, 8, 8]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Suspense fallback={<Loader3D />}>
          <HouseModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;