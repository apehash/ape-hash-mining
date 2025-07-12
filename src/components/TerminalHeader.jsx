import React from 'react';
import { motion } from 'framer-motion';

const TerminalHeader = ({ text, showCursor }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="terminal-window p-6 mb-12 max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-xs text-green-300 ml-4">terminal@apehash.mining</span>
      </div>
      <div className="text-left font-mono">
        <p className="text-green-400">
          {text}
          {showCursor && <span className="terminal-cursor"></span>}
        </p>
      </div>
    </motion.div>
  );
};

export default TerminalHeader;