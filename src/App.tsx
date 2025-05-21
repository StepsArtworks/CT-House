import React from 'react';
import ModelViewer from './components/ModelViewer';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import { ModelProvider } from './context/ModelContext';

function App() {
  return (
    <ModelProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
        <Header />
        <main className="flex flex-col lg:flex-row flex-1 relative">
          <ModelViewer />
          <ControlPanel />
        </main>
      </div>
    </ModelProvider>
  );
}

export default App;