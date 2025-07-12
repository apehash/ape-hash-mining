import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from './pages/HomePage';
import MiningPage from './pages/MiningPage';
import TokenPage from './pages/TokenPage';
import NetworkPage from './pages/NetworkPage';
import RentPage from './pages/RentPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage handleFeatureClick={handleFeatureClick} setCurrentSection={setCurrentSection} />;
      case 'mining':
        return <MiningPage handleFeatureClick={handleFeatureClick} setCurrentSection={setCurrentSection} />;
      case 'token':
        return <TokenPage handleFeatureClick={handleFeatureClick} />;
      case 'network':
        return <NetworkPage handleFeatureClick={handleFeatureClick} />;
      case 'rent':
        return <RentPage handleFeatureClick={handleFeatureClick} />;
      default:
        return <HomePage handleFeatureClick={handleFeatureClick} setCurrentSection={setCurrentSection} />;
    }
  };

  return (
    <BrowserRouter basename="/">
      <Toaster position="top-center" />
      <Helmet>
        <title>APE HASH - Revolutionary Mining Platform on Base Network</title>
        <meta name="description" content="Join APE HASH, the cutting-edge mining platform on Base network. Rent mining rigs with $HASH tokens and earn rewards through our innovative mining protocol." />
      </Helmet>

      <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="matrix-bg hash-pattern"></div>
        <div className="terminal-scanlines fixed inset-0 pointer-events-none z-10"></div>

        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} handleFeatureClick={handleFeatureClick} />

        <main className="relative">
          <AnimatePresence mode="wait">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/mining" element={<MiningPage />} />
              <Route exact path="/rent" element={<RentPage />} />
              <Route exact path="/token" element={<TokenPage />} />
              <Route exact path="/network" element={<NetworkPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer handleFeatureClick={handleFeatureClick} />

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;