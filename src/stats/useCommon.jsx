import { useState, useEffect } from "react";
import miningAbi from '../abi/mining.json';
import { MINING_ADDRESS } from "../utils/constant";
import { getMultiCall, getWeb3Contract } from "../utils/contractHelper";


export const useCommonStats = () => {
    const [stats, setStats] = useState({
        loading: true,
        products: [],
    });


    const miningContract = getWeb3Contract(miningAbi, MINING_ADDRESS);

    useEffect(() => {
        const fetch = async () => {

            try {
                setStats({
                    ...stats,
                    loading : true
                })

                let activeMachines = await getMultiCall([
                    miningContract.methods.getActiveMachines(), //0
                ])

                let products = [];
                if (activeMachines && activeMachines[0]) {
                    let productCalls = [];
                    activeMachines[0].map((index) => {
                        productCalls[index] = miningContract.methods.machineConfigs(index)
                    });

                    products = await getMultiCall(productCalls);
                }

                setStats({
                    loading: false,
                    products,
                })
            }
            catch (err) {
                console.log(err.message);
            }
        }

        fetch();
        // eslint-disable-next-line
    }, []);

    return stats;
}