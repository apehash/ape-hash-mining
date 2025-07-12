import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shovel as Pickaxe, Coins, Network, Server, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectButton from '../ConnectButton';
import { Link, useLocation } from 'react-router-dom';

const sections = [
  { id: 'home', link: '/', label: 'HOME', icon: Terminal },
  { id: 'mining', link: '/mining', label: 'MINING', icon: Pickaxe },
  { id: 'rent', link: '/rent', label: 'RENT', icon: Server },
  { id: 'token', link: '/token', label: '$HASH', icon: Coins },
  { id: 'network', link: '/network', label: 'BASE', icon: Network },
];

const Header = ({ currentSection, setCurrentSection, handleFeatureClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 p-4 md:p-6 terminal-window border-b border-green-400/30"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/9481945bf1e63fecf366e715b27415c0.png"
              alt="APE HASH Logo"
              className="w-10 h-10 md:w-12 md:h-12 neon-glow"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold terminal-glow glitch" data-text="APE HASH">
                APE HASH
              </h1>
              <p className="hidden md:block text-sm text-green-300">Mining Protocol v2.1.0</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = location.pathname === section.link;
              return (
                <Link
                  to={section.link}
                  key={section.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded terminal-border transition-all duration-300 hover:bg-green-400/10 ${isActive ? 'bg-green-400/20 terminal-glow' : ''
                    }`}
                >
                  <Icon size={16} />
                  <span className="font-mono text-sm">{section.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <ConnectButton className="bg-green-400 text-black hover:bg-green-300 font-mono neon-glow" />
          </div>

          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border-green-400 text-green-400 hover:bg-green-400/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/95 z-20 p-4 pt-24 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-6">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = location.pathname === section.link;
                return (
                  <Link
                     to={section.link}
                    key={section.id}
                    onClick={()=>handleMobileNavClick()}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded terminal-border transition-all duration-300 hover:bg-green-400/10 ${isActive ? 'bg-green-400/20 terminal-glow' : ''
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-mono text-lg">{section.label}</span>
                  </Link>
                );
              })}
              <div className="pt-6 w-full">
                <Button
                  onClick={() => {
                    handleFeatureClick('connect');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-green-400 text-black hover:bg-green-300 font-mono neon-glow text-lg py-3"
                >
                  CONNECT WALLET
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;