import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Grid,
  Html,
  useProgress 
} from '@react-three/drei';
import { useModelContext } from '../context/ModelContext';
import HouseModel from './HouseModel';
import { Loader } from 'lucide-react';

// Loading component for 3D model loading
const Loader3D = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="glass p-6 rounded-lg flex flex-col items-center text-center max-w-xs">
        <Loader className="animate-spin h-8 w-8 text-primary mb-3" />
        <p className="text-lg font-medium">{progress.toFixed(0)}% loaded</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Loading 3D model...</p>
      </div>
    </Html>
  );
};

const ModelViewer: React.FC = () => {
  const { viewMode, showMeasurements, isLoading, setIsLoading } = useModelContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Simulate loading of 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!isMounted) return null;

  return (
    <div className="flex-1 min-h-[60vh] lg:min-h-0 model-container relative">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        
        <HouseModel />
        
        {showMeasurements && <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />}
        
        <Environment preset="city" />
        
        {isLoading && <Loader3D />}
      </Canvas>
    </div>
  );
};

export default ModelViewer;