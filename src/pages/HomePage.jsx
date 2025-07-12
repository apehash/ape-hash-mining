import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shovel as Pickaxe, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TerminalHeader from '@/components/TerminalHeader';
import StatsGrid from '@/components/StatsGrid';
import { Link } from 'react-router-dom';
import { BUY_LINK } from '../utils/constant';

const HomePage = ({ handleFeatureClick, setCurrentSection }) => {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "root@apehash:~$ Initializing mining protocol...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <motion.section
      key="home"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <TerminalHeader text={terminalText} showCursor={showCursor} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold terminal-glow mb-6">
            <span className="glitch" data-text="APE HASH">APE HASH</span>
          </h1>

          <p className="text-xl md:text-2xl text-green-300 max-w-3xl mx-auto font-mono">
            Revolutionary mining platform on the <span className="text-blue-400 terminal-glow">Base Network</span>
          </p>

          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            Rent mining rigs with <span className="text-yellow-400 font-bold">$HASH</span> tokens and earn rewards through our cutting-edge mining protocol launched via ape.store
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              to="/rent"
            >
              <Button
                className="bg-green-400 text-black hover:bg-green-300 font-mono text-lg px-8 py-4 neon-glow">
                <Pickaxe className="mr-2" size={20} />
                START MINING
              </Button>
            </Link>
            <a
              href={BUY_LINK}
              target='_blank'>
              <Button
                onClick={() => handleFeatureClick('buy-hash')}
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400/10 font-mono text-lg px-8 py-4"
              >
                <Coins className="mr-2" size={20} />
                BUY $HASH
              </Button>
            </a>
          </div>
        </motion.div>

        {/* <StatsGrid /> */}
      </div>
    </motion.section>
  );
};

export default HomePage;