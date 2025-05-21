import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { Ruler } from 'lucide-react';

const MeasurementsToggle: React.FC = () => {
  const { showMeasurements, setShowMeasurements } = useModelContext();
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Ruler size={18} className="text-primary" />
        <h3 className="font-medium">Measurements</h3>
      </div>
      
      <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg">
        <span className="text-sm">Show Grid & Measurements</span>
        <div className="relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={showMeasurements}
            onChange={() => setShowMeasurements(!showMeasurements)}
            className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className={`block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer ${
              showMeasurements ? 'bg-primary' : ''
            }`}
          >
            <span
              className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                showMeasurements ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></span>
          </label>
        </div>
      </label>
      
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        <p>
          {showMeasurements 
            ? 'Grid and measurements are visible' 
            : 'Grid and measurements are hidden'}
        </p>
      </div>
    </div>
  );
};

export default MeasurementsToggle;