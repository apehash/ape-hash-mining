import React from 'react';
import { motion } from 'framer-motion';
import { Network, Zap, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NetworkPage = ({ handleFeatureClick }) => {
  return (
    <motion.section
      key="network"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 pt-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold terminal-glow mb-8">
          BASE NETWORK
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="terminal-window p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <Network className="text-blue-400 mr-4" size={48} />
            <div>
              <h2 className="text-3xl font-bold text-blue-400">BASE</h2>
              <p className="text-green-300">Layer 2 Network</p>
            </div>
          </div>

          <p className="text-lg text-green-200 mb-8">
            APE HASH is built on Base, Coinbase's secure, low-cost, builder-friendly Ethereum L2.
            Experience lightning-fast transactions with minimal fees.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-400/10 rounded border border-blue-400/30">
              <Zap className="mx-auto mb-3 text-blue-400" size={32} />
              <h3 className="font-bold mb-2">Fast Transactions</h3>
              <p className="text-sm text-green-300">Sub-second confirmation times</p>
            </div>
            <div className="p-6 bg-blue-400/10 rounded border border-blue-400/30">
              <DollarSign className="mx-auto mb-3 text-green-400" size={32} />
              <h3 className="font-bold mb-2">Low Fees</h3>
              <p className="text-sm text-green-300">Minimal transaction costs</p>
            </div>
            <div className="p-6 bg-blue-400/10 rounded border border-blue-400/30">
              <Network className="mx-auto mb-3 text-purple-400" size={32} />
              <h3 className="font-bold mb-2">Ethereum Compatible</h3>
              <p className="text-sm text-green-300">Full EVM compatibility</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="terminal-window p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Network Statistics</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-left">
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="text-blue-400">Base Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span>Chain ID:</span>
                <span className="text-green-400">8453</span>
              </div>
              <div className="flex justify-between">
                <span>Block Time:</span>
                <span className="text-yellow-400">~2 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Price:</span>
                <span className="text-purple-400">~0.001 gwei</span>
              </div>
            </div>
            <div className="space-y-4">
              <Button
                onClick={async () => {
                  if (window.ethereum) {
                    try {
                      await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                          chainId: '0x2105', // 8453 in hex
                          chainName: 'Base Mainnet',
                          nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18,
                          },
                          rpcUrls: ['https://mainnet.base.org'],
                          blockExplorerUrls: ['https://basescan.org'],
                        }],
                      });
                    } catch (addError) {
                      alert('Could not add Base network: ' + addError.message);
                    }
                  } else {
                    alert('MetaMask is not installed!');
                  }
                }}
                className="w-full bg-blue-400 text-black hover:bg-blue-300 font-mono"
              >
                ADD BASE NETWORK
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400/10 font-mono"
              >
                <a
                  href="https://bridge.base.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BRIDGE TO BASE
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400/10 font-mono"
              >
                <a
                  href="https://basescan.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW EXPLORER
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NetworkPage;