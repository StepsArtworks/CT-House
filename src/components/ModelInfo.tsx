import React from 'react';
import { Info, Building, AreaChart, Calendar, User } from 'lucide-react';

const ModelInfo: React.FC = () => {
  // Mock data for the house model
  const modelInfo = {
    name: "Modern Family House",
    architect: "ArchDesign Studio",
    dateCreated: "2024-05-15",
    totalArea: "245 sq m",
    floors: 3,
    bedrooms: 4,
    bathrooms: 3,
    description: "A modern family house with open floor plan, featuring three floors with distinct living areas and functional spaces."
  };
  
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex items-center gap-2">
        <Info size={18} className="text-primary" />
        <h3 className="font-medium">Model Information</h3>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h4 className="text-base font-medium">{modelInfo.name}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{modelInfo.description}</p>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <User size={16} className="text-slate-500" />
            <span className="text-sm">Architect: <span className="font-medium">{modelInfo.architect}</span></span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            <span className="text-sm">Created: <span className="font-medium">{modelInfo.dateCreated}</span></span>
          </div>
          
          <div className="flex items-center gap-2">
            <Building size={16} className="text-slate-500" />
            <span className="text-sm">Floors: <span className="font-medium">{modelInfo.floors}</span></span>
          </div>
          
          <div className="flex items-center gap-2">
            <AreaChart size={16} className="text-slate-500" />
            <span className="text-sm">Total Area: <span className="font-medium">{modelInfo.totalArea}</span></span>
          </div>
        </div>
        
        <div className="flex border-t border-slate-200 dark:border-slate-700">
          <button className="flex-1 py-2 text-sm text-center text-primary hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Details
          </button>
          <button className="flex-1 py-2 text-sm text-center text-primary hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-l border-slate-200 dark:border-slate-700">
            Specifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;