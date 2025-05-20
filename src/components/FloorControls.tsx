import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowUpCircle, ArrowDownCircle, Sofa } from 'lucide-react';
import { FloorLevel, ModelState } from '../types/model';

interface FloorControlsProps {
  modelState: ModelState;
  onFloorChange: (floor: FloorLevel) => void;
  onFurnitureOpacityChange: (floor: FloorLevel, value: number) => void;
}

const FloorControls: React.FC<FloorControlsProps> = ({
  modelState,
  onFloorChange,
  onFurnitureOpacityChange,
}) => {
  const floors: { id: FloorLevel; name: string; icon: React.ReactNode }[] = [
    { id: 'second', name: 'Second Floor', icon: <ArrowUpCircle className="w-5 h-5" /> },
    { id: 'first', name: 'First Floor', icon: <ArrowUpCircle className="w-5 h-5" /> },
    { id: 'ground', name: 'Ground Floor', icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 w-full max-w-xs shadow-lg border border-white border-opacity-20"
    >
      <h2 className="text-xl font-medium text-white mb-4">Floor Controls</h2>
      
      <div className="space-y-4">
        {floors.map((floor) => (
          <div key={floor.id} className={`rounded-lg p-4 transition-all duration-300 ${modelState.currentFloor === floor.id ? 'bg-blue-500 bg-opacity-20' : 'bg-white bg-opacity-5 hover:bg-opacity-10'}`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => onFloorChange(floor.id)}
                className="flex items-center space-x-3 text-white"
              >
                <div className={`p-2 rounded-full ${modelState.currentFloor === floor.id ? 'bg-blue-500' : 'bg-gray-700'}`}>
                  {floor.icon}
                </div>
                <span>{floor.name}</span>
              </button>
              
              <div className={`w-3 h-3 rounded-full ${modelState.floors[floor.id].visible ? 'bg-green-500' : 'bg-gray-500'}`} />
            </div>
            
            {modelState.floors[floor.id].visible && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <Sofa className="w-4 h-4" />
                  <span className="text-sm">Furniture Visibility</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modelState.floors[floor.id].furnitureOpacity}
                  onChange={(e) => onFurnitureOpacityChange(floor.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FloorControls;