import { ethers } from "ethers";
import tokenABI from '../abi/token.json';
import multicallAbi from '../abi/multicall.json';
import Web3 from "web3";
import { DEFAULT_RPC, MULTICALL_ADDRESS } from "./constant";



export const getWeb3 = () => {
    return new Web3(DEFAULT_RPC);
};

export const getContract = (abi, address, library) => {
    try {
        return new ethers.Contract(address, abi, library)
    }
    catch {
        return false;
    }
}

export const getWeb3TokenContract = (address) => {
    let web3 = getWeb3();
    return new web3.eth.Contract(tokenABI, address);
}

export const getWeb3Contract = (ABI, address) => {
    let web3 = getWeb3();

    return new web3.eth.Contract(ABI, address);
}

export const getMultiCall = async (calls) => {

    let web3 = getWeb3();
    const mc = new web3.eth.Contract(multicallAbi, MULTICALL_ADDRESS);
    const callRequests = calls.map((call) => {
        const callData = call.encodeABI();
        return {
            target: call._parent._address,
            callData,
        };
    });

    const { returnData } = await mc.methods
        .aggregate(callRequests)
        .call({});

    let finalData = returnData.map((hex, index) => {
        const types = calls[index]._method.outputs.map((o) =>
            o.internalType !== o.type && o.internalType !== undefined ? o : o.type
        );

        let result = web3.eth.abi.decodeParameters(types, hex);

        delete result.__length__;

        result = Object.values(result);

        return result.length === 1 ? result[0] : result;
    });

    return finalData;
}