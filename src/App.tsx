import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModelViewer from './components/ModelViewer';
import FloorControls from './components/FloorControls';
import { ModelState, FloorLevel } from './types/model';
import { Building2, Info } from 'lucide-react';

const initialModelState: ModelState = {
  currentFloor: 'ground',
  floors: {
    ground: { visible: true, furnitureOpacity: 100 },
    first: { visible: false, furnitureOpacity: 100 },
    second: { visible: false, furnitureOpacity: 100 }
  },
  isLoading: true,
  loadingProgress: 0
};

function App() {
  const [modelState, setModelState] = useState<ModelState>(initialModelState);
  const [showInfo, setShowInfo] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    if (modelState.isLoading) {
      const interval = setInterval(() => {
        setModelState(prev => {
          const newProgress = prev.loadingProgress + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...prev,
              isLoading: false,
              loadingProgress: 100
            };
          }
          return {
            ...prev,
            loadingProgress: newProgress
          };
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [modelState.isLoading]);

  const handleFloorChange = (floor: FloorLevel) => {
    setModelState(prev => {
      const newFloors = { ...prev.floors };
      
      // First make the selected floor visible and hide others
      Object.keys(newFloors).forEach(key => {
        const floorKey = key as FloorLevel;
        newFloors[floorKey].visible = floorKey === floor;
      });
      
      return {
        ...prev,
        currentFloor: floor,
        floors: newFloors
      };
    });
  };

  const handleFurnitureOpacityChange = (floor: FloorLevel, value: number) => {
    setModelState(prev => ({
      ...prev,
      floors: {
        ...prev.floors,
        [floor]: {
          ...prev.floors[floor],
          furnitureOpacity: value
        }
      }
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white p-4 md:p-8 gap-4 md:gap-8">
      <motion.div 
        className="md:flex-1 h-[400px] md:h-auto relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ModelViewer modelState={modelState} />
        
        <motion.button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-4 right-4 bg-white bg-opacity-10 backdrop-blur-md p-2 rounded-full hover:bg-opacity-20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Info className="w-5 h-5 text-white" />
        </motion.button>
        
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg max-w-xs shadow-lg border border-white border-opacity-20"
          >
            <h3 className="font-medium mb-2 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              3D House Viewer
            </h3>
            <p className="text-sm text-gray-300">
              Explore a 3D model of a house with multiple floors.
              Select different floors and control furniture visibility with the sliders.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <div className="md:w-80 flex flex-col gap-4">
        <FloorControls 
          modelState={modelState}
          onFloorChange={handleFloorChange}
          onFurnitureOpacityChange={handleFurnitureOpacityChange}
        />
        
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-3">Controls</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Left-click + drag to rotate</span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Right-click + drag to pan</span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Scroll to zoom in/out</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default App;