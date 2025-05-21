import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModelContextType {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  floorCount: number;
  isPanelOpen: boolean;
  togglePanel: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const floorCount = 3;

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <ModelContext.Provider
      value={{
        currentFloor,
        setCurrentFloor,
        floorCount,
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

export const useModelContext = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
};