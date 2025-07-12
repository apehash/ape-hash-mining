import React from 'react';
import { motion } from 'framer-motion';
import { Hash, Shovel as Pickaxe, Coins, Users , Briefcase, Gift} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUY_LINK } from '../utils/constant';
import { Link } from 'react-router-dom';

const TokenPage = ({ handleFeatureClick }) => {
  return (
    <motion.section
      key="token"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 pt-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold terminal-glow mb-8">
          $HASH TOKEN
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="terminal-window p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <Hash className="text-yellow-400 mr-4" size={48} />
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">$HASH</h2>
              <p className="text-green-300">Utility Token</p>
            </div>
          </div>

          <p className="text-lg text-green-200 mb-8">
            The $HASH token powers the entire APE HASH ecosystem. Use it to rent mining rigs,
            participate in governance, and earn staking rewards.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-400/10 rounded border border-green-400/30">
              <Pickaxe className="mx-auto mb-3 text-green-400" size={32} />
              <h3 className="font-bold mb-2">Mining Access</h3>
              <p className="text-sm text-green-300">Rent mining rigs with $HASH tokens</p>
            </div>
            <div className="p-6 bg-green-400/10 rounded border border-green-400/30">
              <Coins className="mx-auto mb-3 text-yellow-400" size={32} />
              <h3 className="font-bold mb-2">Rewards</h3>
              <p className="text-sm text-green-300">Earn $HASH through mining activities</p>
            </div>
            <div className="p-6 bg-green-400/10 rounded border border-green-400/30">
              <Users className="mx-auto mb-3 text-blue-400" size={32} />
              <h3 className="font-bold mb-2">Governance</h3>
              <p className="text-sm text-green-300">Vote on protocol upgrades</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="terminal-window p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Token Metrics</h3>
            <div className="space-y-4 text-left font-mono">
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Hash className="mr-2" size={16} />Total Supply:</span>
                <span className="text-yellow-400">1,000,000,000 $HASH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Coins className="mr-2" size={16} />Dev Buys at launch:</span>
                <span className="text-green-400">250,000,000 $HASH</span>
              </div>
              <div className="pt-4 mt-4 border-t border-green-400/20">
                <h4 className="text-lg font-bold mb-2 text-green-300">Used For:</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><Gift className="mr-2" size={16} />Mining Rewards:</span>
                    <span className="text-blue-400">200,000,000 $HASH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><Briefcase className="mr-2" size={16} />Team & Development:</span>
                    <span className="text-purple-400">50,000,000 $HASH</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="terminal-window p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Get $HASH</h3>
            <div className="space-y-4">
              <a
                href={BUY_LINK}
                target='_blank'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-yellow-400 text-black hover:bg-yellow-300 font-mono'
              >

                BUY ON APE.STORE

              </a>
              <Link
                to="/rent"
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-green-400 text-black hover:bg-green-300 font-mono'
              >

                MINE $HASH

              </Link>
              <Button
                onClick={() => handleFeatureClick('stake-hash')}
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400/10 font-mono"
              >
                STAKE $HASH
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TokenPage;