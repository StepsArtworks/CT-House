import React from 'react';
import { useModelContext } from '../context/ModelContext';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isPanelOpen, togglePanel } = useModelContext();

  return (
    <header className="h-16 glass border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePanel}
            className="lg:hidden btn-secondary p-2 rounded-lg"
            aria-label="Toggle panel"
          >
            {isPanelOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-semibold">
            <span className="text-primary">3D</span> House Viewer
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;