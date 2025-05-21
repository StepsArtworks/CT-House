import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { ViewMode } from '../context/ModelContext';
import { Layers, EyeOff, Grid3X3 } from 'lucide-react';

const ViewModeSelector: React.FC = () => {
  const { viewMode, setViewMode } = useModelContext();
  
  const modes = [
    { 
      value: ViewMode.SOLID, 
      label: 'Solid', 
      icon: <Layers size={16} />,
      description: 'View the model with solid surfaces'
    },
    { 
      value: ViewMode.WIREFRAME, 
      label: 'Wireframe', 
      icon: <Grid3X3 size={16} />,
      description: 'View the model structure wireframe'
    },
    { 
      value: ViewMode.TRANSPARENT, 
      label: 'Transparent', 
      icon: <EyeOff size={16} />,
      description: 'View the model with transparent surfaces'
    },
  ];
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Layers size={18} className="text-primary" />
        <h3 className="font-medium">View Mode</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => setViewMode(mode.value)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 gap-1 ${
              viewMode === mode.value
                ? 'bg-primary/10 border border-primary/30 text-primary'
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title={mode.description}
          >
            {mode.icon}
            <span className="text-xs font-medium">{mode.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        <p>{modes.find(mode => mode.value === viewMode)?.description}</p>
      </div>
    </div>
  );
};

export default ViewModeSelector;