import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shovel as Pickaxe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccountMiningStats } from '../stats/useAccount';
import { MINING_ADDRESS, miningRigs, TOKEN_SYMBOL } from '../utils/constant';
import { extractRevertReason, formatPrice } from '../utils/helper';
import { Link } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import toast from 'react-hot-toast';
import { getContract, getWeb3 } from '../utils/contractHelper';
import { useEthersSigner } from '../stats/useEthersProvider';
import miningAbi from '../abi/mining.json'
import Countdown from 'react-countdown'


const MiningPage = () => {
  const { address, isConnected } = useAppKitAccount();
  const [updater, setUpdater] = useState(1);
  const stats = useAccountMiningStats(updater)
  const [loading, setLoading] = useState(false);
  const signer = useEthersSigner();
  const web3 = getWeb3();
  const now = Date.now();
  const totalMiningRate = stats.getUserMachines && stats.getUserMachines.length > 0
    ? stats.getUserMachines
      .filter((item) => Number(item.endTime) * 1000 > now) // Only active rigs
      .map((item) => item.tokensPerDay / Math.pow(10, 18))
      .reduce((acc, curr) => acc + curr, 0)
    : 0;


  const handleClaim = async () => {
    try {
      setLoading(true);

      if (!address || !isConnected) {
        toast.error('Please connect wallet!');
        return setLoading(false);
      }


      let miningContract = getContract(miningAbi, MINING_ADDRESS, signer);
      let tx = await miningContract.claimRewards({
        from: address
      });


      toast.loading('Waiting for confirmation.');

      var interval = setInterval(async function () {
        var response = await web3.eth.getTransactionReceipt(tx.hash);
        if (response != null) {
          setLoading(false);
          toast.dismiss();
          clearInterval(interval);
          if (response.status === true) {
            toast.success('Success! Your last transaction is successful 👍');
          } else {
            toast.error('Error! Your last transaction failed.');
          }
          setUpdater(Math.random());
        }
      }, 5000);

    }
    catch (err) {
      console.log(err)
      setLoading(false);
      toast.dismiss();
      toast.error(extractRevertReason(err));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdater(Math.random());
    }, 3000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <motion.section
      key="mining"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 pt-20"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold terminal-glow mb-8 text-center">
          MINING PROTOCOL
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="terminal-window p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Pickaxe className="mr-3 text-green-400" />
              Mining Rigs
            </h2>
            <div className="max-h-[220px] overflow-y-auto space-y-4 pr-2 custom-scroll">
              {stats.getUserMachines && stats.getUserMachines.length === 0 ? (
                <div className="gap-2 p-4 bg-green-400/10 rounded border border-green-400/30">
                  <p className="text-green-700 font-medium">No Product Purchased</p>
                  <p className="text-sm text-green-600">Rent a mining rig and start earning rewards!</p>
                </div>
              ) : (
                stats.getUserMachines.map((items, index) => {
                  // Parse endTime as a timestamp (seconds or ms)
                  const endTime = Number(items['endTime']) * 1000; // adjust if already ms
                  return (
                    <div
                      key={index}
                      className="relative flex justify-between items-center p-4 bg-green-400/10 rounded border border-green-400/30"
                    >
                      {/* Countdown in top-right */}
                      <div className="absolute top-[-6px] left-0 text-xs text-yellow-400 bg-gray-900/80 px-2 py-1 rounded shadow">
                        <Countdown
                          date={endTime}
                          renderer={({ days, hours, minutes, seconds, completed }) =>
                            completed ? (
                              <span>Expired</span>
                            ) : (
                              <span>
                                End in: {days}d {hours}h {minutes}m {seconds}s
                              </span>
                            )
                          }
                        />
                      </div>
                      <span>{miningRigs[items[0]] ? miningRigs[items[0]].name : '-'}</span>
                      <span className="text-yellow-400">
                        {items['tokensPerDay'] ? formatPrice(items['tokensPerDay'] / Math.pow(10, 18)) : 0} {TOKEN_SYMBOL}/day
                      </span>
                    </div>
                  )
                })

              )}
            </div>
            <Link to="/rent">
              <Button
                className="w-full mt-6 bg-green-400 text-black hover:bg-green-300 font-mono"
              >
                RENT MINING RIG
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="terminal-window p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="mr-3 text-green-400" />
              Mining Stats
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Mining Reward Rate</span>
                  <span className="text-green-400">{formatPrice(totalMiningRate)} {TOKEN_SYMBOL}/day</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-400/10 rounded border border-green-400/30">
                <span>Total Pending Reward</span>
                <span className="text-yellow-400">
                  {stats.getPendingRewards ? formatPrice(stats.getPendingRewards) : 0} {TOKEN_SYMBOL}
                </span>
              </div>
              <Button
                disabled={loading}
                onClick={() => handleClaim()}
                className="w-full mt-6 bg-green-400 text-black hover:bg-green-300 font-mono"
              >
                {loading ? 'Loading...' : 'Claim Reward'}

              </Button>


            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MiningPage;