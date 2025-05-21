import React, { createContext, useState, useContext, ReactNode } from 'react';

// Enum for view modes
export enum ViewMode {
  SOLID = 'solid',
  WIREFRAME = 'wireframe',
  TRANSPARENT = 'transparent',
}

// Types for our context
interface ModelContextType {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  floorCount: number;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showMeasurements: boolean;
  setShowMeasurements: (show: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isPanelOpen: boolean;
  togglePanel: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SOLID);
  const [showMeasurements, setShowMeasurements] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const floorCount = 3; // Fixed count as per requirements

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle control panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <ModelContext.Provider
      value={{
        currentFloor,
        setCurrentFloor,
        floorCount,
        viewMode,
        setViewMode,
        showMeasurements,
        setShowMeasurements,
        isDarkMode,
        toggleDarkMode,
        isPanelOpen,
        togglePanel,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

// Hook for using the context
export const useModelContext = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
};