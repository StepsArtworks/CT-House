import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { Layers } from 'lucide-react';

const FloorSelector: React.FC = () => {
  const { currentFloor, setCurrentFloor, floorCount } = useModelContext();
  
  // Array of floor names
  const floorNames = ['Ground Floor', 'First Floor', 'Second Floor'];
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Layers size={18} className="text-primary" />
        <h3 className="font-medium">Floor Selection</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        {/* All floors button */}
        <button
          onClick={() => setCurrentFloor(-1)}
          className={`btn text-sm ${
            currentFloor === -1
              ? 'bg-primary/10 border border-primary/30 text-primary font-medium'
              : 'btn-secondary'
          }`}
        >
          View All Floors
        </button>
        
        {/* Individual floor buttons */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          {Array.from({ length: floorCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFloor(index)}
              className={`py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                currentFloor === index
                  ? 'bg-primary/10 border border-primary/30 text-primary font-medium'
                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Floor {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      {/* Floor description */}
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        {currentFloor === -1 ? (
          <p>Viewing all floors of the house model.</p>
        ) : (
          <p>Currently viewing: <span className="font-medium text-slate-900 dark:text-white">{floorNames[currentFloor]}</span></p>
        )}
      </div>
    </div>
  );
};

export default FloorSelector;