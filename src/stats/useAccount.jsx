import { useState, useEffect } from "react";
import miningAbi from '../abi/mining.json';
import tokenAbi from '../abi/token.json';
import { MINING_ADDRESS, TOKEN_ADDRESS, USDC_DECIMALS } from "../utils/constant";
import { getMultiCall, getWeb3Contract } from "../utils/contractHelper";
import { useAppKitAccount } from "@reown/appkit/react";


export const useAccountStats = (updater) => {
    const { address } = useAppKitAccount();
    const [stats, setStats] = useState({
        loading: true,
        allowance: 0,
        balance: 0,
    });

    const tokenContract = getWeb3Contract(tokenAbi, TOKEN_ADDRESS);

    useEffect(() => {
        const fetch = async () => {

            try {
                setStats({
                    ...stats,
                    loading: true
                })

                let data = await getMultiCall([
                    tokenContract.methods.balanceOf(address), //0
                    tokenContract.methods.allowance(address, MINING_ADDRESS), //1
                ])

                setStats({
                    loading: false,
                    allowance: data[1] / Math.pow(10, USDC_DECIMALS),
                    balance: data[0] / Math.pow(10, USDC_DECIMALS),
                })
            }
            catch (err) {
                console.log(err.message);
            }
        }
        if (address) {
            fetch();
        }
        else {
            setStats({
                loading: true,
                allowance: 0,
                balance: 0,
            })
        }
        // eslint-disable-next-line
    }, [address, updater]);

    return stats;
}


export const useAccountMiningStats = (updater) => {
    const { address } = useAppKitAccount();
    const [stats, setStats] = useState({
        loading: true,
        getUserMachines: [],
        getPendingRewards: 0
    });

    const miningContract = getWeb3Contract(miningAbi, MINING_ADDRESS);

    useEffect(() => {
        const fetch = async () => {

            try {
                setStats({
                    ...stats,
                    loading: true
                })

                let data = await getMultiCall([
                    miningContract.methods.getUserMachines(address), //0
                    miningContract.methods.getPendingRewards(address), //1
                ])

                setStats({
                    loading: false,
                    getPendingRewards: data[1] / Math.pow(10, 18),
                    getUserMachines: data[0],
                })
            }
            catch (err) {
                console.log(err.message);
            }
        }
        if (address) {
            fetch();
        }
        else {
            setStats({
                loading: true,
                getUserMachines: [],
                getPendingRewards: 0
            })
        }
        // eslint-disable-next-line
    }, [address, updater]);

    return stats;
}

