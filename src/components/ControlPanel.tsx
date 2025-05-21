import React from 'react';
import { useModelContext } from '../context/ModelContext';
import FloorSelector from './FloorSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { isPanelOpen, togglePanel } = useModelContext();

  return (
    <>
      {/* Mobile panel (slide-in) */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={togglePanel}
      />
      
      <div 
        className={`control-panel fixed lg:relative top-16 lg:top-0 right-0 h-[calc(100vh-4rem)] lg:h-auto 
        lg:min-h-0 w-72 glass z-30 transition-transform duration-300 overflow-y-auto
        border-l border-slate-200 dark:border-slate-700 flex flex-col
        ${isPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-0 lg:min-w-0 lg:opacity-0'}`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Floor Selection</h2>
          <button 
            onClick={togglePanel}
            className="lg:hidden btn-secondary p-1 rounded-lg"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-6 flex-1">
          <FloorSelector />
        </div>
      </div>
      
      {/* Toggle button (visible only on desktop when panel is closed) */}
      <button
        onClick={togglePanel}
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 
          bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300
          p-2 rounded-l-lg shadow-md border border-slate-200 dark:border-slate-700
          transition-all duration-300 z-20
          ${isPanelOpen ? 'right-72 opacity-0' : 'right-0 opacity-100'}`}
        aria-label={isPanelOpen ? "Close panel" : "Open panel"}
      >
        {isPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </>
  );
};

export default ControlPanel;

// Helper icon component
const X: React.FC<{ size: number }> = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);