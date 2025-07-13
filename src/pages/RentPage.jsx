import { motion } from 'framer-motion';
import { Zap, Cpu, Server, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommonStats } from '../stats/useCommon';
import { extractRevertReason, formatPrice } from '../utils/helper';
import { APPROVE_LIMIT, BUY_SYMBOL, MINING_ADDRESS, miningRigs, TOKEN_ADDRESS, USDC_DECIMALS } from '../utils/constant';
import { useAccountStats } from '../stats/useAccount';
import { useAppKitAccount } from '@reown/appkit/react';
import ConnectButton from '../components/ConnectButton';
import { useEthersSigner } from '../stats/useEthersProvider';
import { getContract, getWeb3 } from '../utils/contractHelper';
import toast from 'react-hot-toast';
import tokenAbi from '../abi/token.json'
import miningAbi from '../abi/mining.json'
import { ethers } from 'ethers';
import { useState } from 'react';


const RentPage = () => {
  const { address, isConnected } = useAppKitAccount();
  const [updater, setUpdater] = useState(1)
  const stats = useCommonStats();
  const accStats = useAccountStats(updater);
  const signer = useEthersSigner();
  const web3 = getWeb3();
  const [loading, setLoading] = useState({
    index: 0,
    status: false
  });

  const handleSubmit = async (machineId = 0, type = 0) => {
    try {
      setLoading({
        index: machineId,
        status: true
      });
      if (!type) {
        toast.error('something went wrong!');
      }

      if (!address || !isConnected) {
        toast.error('Please connect wallet!');
        return setLoading(false);
      }

      let tx;
      if (type === 1) {
        let tokenContract = getContract(tokenAbi, TOKEN_ADDRESS, signer);
        tx = await tokenContract.approve(MINING_ADDRESS, ethers.utils.parseUnits(APPROVE_LIMIT.toString() , USDC_DECIMALS), {
          from: address
        });
      }
      else {
        let miningContract = getContract(miningAbi, MINING_ADDRESS, signer);
        tx = await miningContract.buyMachine(machineId, {
          from: address
        });
      }

      toast.loading('Waiting for confirmation.');

      var interval = setInterval(async function () {
        var response = await web3.eth.getTransactionReceipt(tx.hash);
        if (response != null) {
          setLoading({
            index: 0,
            status: false
          });
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
      setLoading({
        index: 0,
        status: false
      });
      toast.dismiss();
      toast.error(extractRevertReason(err));
    }
  }

  return (
    <>
      {stats.loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
      )}
      <motion.section
        key="rent"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen p-6 pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold terminal-glow mb-2 text-center">
            RENT A MINING RIG
          </h1>
          <p className="text-center text-green-300 mb-12 font-mono">Select a rig to start mining $HASH tokens.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {miningRigs.map((rig, index) => {
              let miningInfo = stats.products && stats.products.length > 0 && stats.products[index] ? stats.products[index] : [0, 0, 0];
              return (
                <motion.div
                  key={rig.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="terminal-window p-6 flex flex-col justify-between hover:bg-green-400/5 hover:border-green-400/80 transition-all duration-300 group"
                >
                  <div>
                    <div className="bg-black border border-green-400/20 rounded mb-4 p-2 aspect-square flex items-center justify-center">
                      <img src={rig.image} alt={rig.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold terminal-glow mb-4 group-hover:text-green-300 transition-colors">{rig.name}</h2>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-green-300 flex items-center"><Zap size={14} className="mr-2" />Hash Rate:</span>
                        <span className="text-yellow-400 font-bold">{rig.hashRate}</span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-green-300 flex items-center"><Zap size={14} className="mr-2" />Reward Rate:</span>
                        <span className="text-yellow-400 font-bold">{miningInfo[2] ? formatPrice(miningInfo[2] / Math.pow(10, 18)) : '-'} {TOKEN_SYMBOL}/Day</span>
                      </div> */}
                      <div className="flex justify-between items-center">
                        <span className="text-green-300 flex items-center"><Cpu size={14} className="mr-2" />Power Tier:</span>
                        <span className="text-blue-400 font-bold">{rig.power}</span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-green-300 flex items-center"><Cpu size={14} className="mr-2" />Mining Time:</span>
                        <span className="text-blue-400 font-bold">{miningInfo[1] ? formatPrice(miningInfo[1] / 86400) : '-'} Days</span>
                      </div> */}
                      <div className="flex justify-center items-center mt-3">
                        <span className="text-green-300 flex items-center"><Server size={14} className="mr-2" />Rental Cost:</span>
                        {/* <span className="text-orange-400 font-bold">{miningInfo[0] ? formatPrice(miningInfo[0] / Math.pow(10, 18)) : '-'} {TOKEN_SYMBOL}/{miningInfo[1] ? formatPrice(miningInfo[1] / 86400) : '-'} Days</span> */}
                      </div>
                      <div className="flex justify-center items-center">
                        <span className="text-orange-400 font-bold">{miningInfo[0] ? formatPrice(miningInfo[0] / Math.pow(10, USDC_DECIMALS)) : '-'} ${BUY_SYMBOL} / {miningInfo[1] ? formatPrice(miningInfo[1] / 86400) : '-'} Days</span>
                      </div>
                    </div>
                  </div>
                  {address ? (
                    parseFloat(accStats.allowance) >= parseFloat(miningInfo[0] ? parseFloat(miningInfo[0] / Math.pow(10, USDC_DECIMALS)) : 0) ? (
                      <Button
                        disabled={parseInt(loading.index) === parseInt(index) && loading.status}
                        onClick={() => handleSubmit(index, 2)}
                        className="w-full mt-6 bg-green-400 text-black hover:bg-green-300 font-mono neon-glow"
                      >
                        {parseInt(loading.index) === parseInt(index) && loading.status ? 'Loading...' : 'RENT NOW'}

                      </Button>
                    ) : (
                      <Button
                        disabled={parseInt(loading.index) === parseInt(index) && loading.status}
                        onClick={() => handleSubmit(index, 1)}
                        className="w-full mt-6 bg-green-400 text-black hover:bg-green-300 font-mono neon-glow"
                      >
                        {parseInt(loading.index) === parseInt(index) && loading.status ? 'Loading...' : 'APPROVE'}

                      </Button>
                    )
                  ) : (
                    <ConnectButton
                      className="w-full mt-6 bg-green-400 text-black hover:bg-green-300 font-mono neon-glow"
                    />
                  )
                  }
                </motion.div>
              )
            }
            )}
          </div>
        </div>
      </motion.section >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="terminal-window p-8 mt-16 max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
          <Info className="mr-3 text-blue-400" />
          Important Notes
        </h3>
        <div className="space-y-4 font-mono text-green-200 text-left">
          <p className="border-l-2 border-green-400 pl-4">
            <span className="text-yellow-400 font-bold">$HASH</span> tokens obtained from mining rig purchases will be burned
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default RentPage;