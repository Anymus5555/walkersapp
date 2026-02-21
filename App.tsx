
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import PlayerPage from './components/PlayerPage';
import MainLayout from './components/MainLayout';
import SquadPage from './components/SquadPage';
import BackupGamesPage from './components/BackupGamesPage';
import { InitialLoader } from './components/InitialLoader';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HashRouter>
      {!isLoaded && <InitialLoader onComplete={() => setIsLoaded(true)} />}
      <div className={`min-h-screen flex flex-col stadium-bg relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/watch" element={<PlayerPage />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/backup" element={<BackupGamesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </div>
    </HashRouter>
  );
};

export default App;
