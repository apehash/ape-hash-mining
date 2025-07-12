import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="relative z-20 p-6 terminal-window border-t border-green-400/30 mt-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/9481945bf1e63fecf366e715b27415c0.png"
              alt="APE HASH Logo"
              className="w-8 h-8"
            />
            <span className="font-mono text-sm">© 2025 APE HASH. All rights reserved.</span>
          </div>

          <div className="flex space-x-6 font-mono text-sm">
            <a
              href="https://t.me/ape_hash"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
            >
              TELEGRAM
            </a>
            <a
              href="https://x.com/ApeHash_base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
            >
              TWITTER
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-400/20">
          <p className="font-mono text-xs text-green-300">
            Launched via ape.store • Built on Base Network • Powered by $HASH
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;