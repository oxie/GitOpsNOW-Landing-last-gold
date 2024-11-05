import React, { Suspense } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ParticleBackground from './components/ParticleBackground';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <ParticleBackground />
      <div className="relative">
        <Header />
          <HomePage />
      </div>
    </div>
  );
}

export default App;