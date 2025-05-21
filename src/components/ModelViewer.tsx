import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera,
  Html,
  useProgress 
} from '@react-three/drei';
import { useModelContext } from '../context/ModelContext';
import HouseModel from './HouseModel';
import { Loader } from 'lucide-react';

// Loading component for 3D model loading
const Loader3D = () => {
  const { progress, errors } = useProgress();
  
  if (errors.length > 0) {
    return (
      <Html center>
        <div className="glass p-6 rounded-lg flex flex-col items-center text-center max-w-xs">
          <p className="text-lg font-medium text-error">Error loading models</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Please check your model files</p>
        </div>
      </Html>
    );
  }
  
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

// Error boundary for 3D components
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="glass p-6 rounded-lg text-center">
            <p className="text-lg font-medium text-error">Something went wrong</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Failed to load the 3D model
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ModelViewer: React.FC = () => {
  const { isLoading, setIsLoading } = useModelContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsLoading(false);
  }, [setIsLoading]);

  if (!isMounted) return null;

  return (
    <div className="flex-1 min-h-[60vh] lg:min-h-0 model-container relative">
      <ModelErrorBoundary>
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
          
          <Suspense fallback={<Loader3D />}>
            <HouseModel />
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
};

export default ModelViewer