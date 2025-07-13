import { base, baseSepolia } from "viem/chains";


export const projectId = import.meta.env.VITE_PROJECT_ID;
export const projectName = import.meta.env.VITE_PROJECT_NAME;
export const projectDesc = import.meta.env.VITE_PROJECT_DESC;
export const projectUrl = import.meta.env.VITE_PROJECT_URL;
export const projectIcon = import.meta.env.VITE_PROJECT_ICON;
export const modalColorCode = import.meta.env.VITE_CONNECT_MODAL_COLOR_CODE;

//testnet
// export const DEFAULT_CHAIN_ID = 84532;
// export const DEFAULT_RPC = "https://sepolia.base.org";
// export const MULTICALL_ADDRESS = "0x46751862b49e6273f9669216a3072b77a3178b65";
// export const TOKEN_ADDRESS = "0xf46f842d0fd1706c0eabf5b5a90cf75dd6d25b5e";
// export const MINING_ADDRESS = "0xdf39937d182401e612f5c59c0818393f7da91145";
// export const TOKEN_SYMBOL = "$HASH";
// export const BUY_SYMBOL = "USDC";
// export const APPROVE_LIMIT = 1000;
// export const chains = [baseSepolia]
// export const BUY_LINK = "https://app.uniswap.org/";
// export const USDC_DECIMALS = 6

//mainnet
export const DEFAULT_CHAIN_ID = 8453;
export const DEFAULT_RPC = "https://mainnet.base.org";
export const MULTICALL_ADDRESS = "0xfee958fa595b4478cea7560c91400a98b83d6c91";
export const TOKEN_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; //USDC address
export const MINING_ADDRESS = "0xcd7e4401dbf49587e693123f0fccf85c55df4d2b";
export const TOKEN_SYMBOL = "$HASH";
export const BUY_SYMBOL = "$HASH";
export const APPROVE_LIMIT = 100000000;
export const chains = [base]
export const BUY_LINK = "https://app.uniswap.org/swap?outputCurrency=0x060377E5E4133947895e14eCe513AfEd03c14835&chain=base";
export const USDC_DECIMALS = 18

export const miningRigs = [
    {
        name: 'Rusty Rover',
        image: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/92d2d78e7138837900e27187335407e4.png',
        hashRate: '150 MH/s',
        power: 'Basic',
        cost: '10 $USDC/7 day',
    },
    {
        name: 'Dual Fan Unit',
        image: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/3b548fa623a25413ef98dfbac31147b9.png',
        hashRate: '750 MH/s',
        power: 'Standard',
        cost: '25 $USDC/10 day',
    },
    {
        name: 'RGB Powerhouse',
        image: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/4e85c672871b7766b33b867869054d8f.png',
        hashRate: '2.5 GH/s',
        power: 'Advanced',
        cost: '100 $USDC/20 Days',
    },
    {
        name: 'Quantum Core',
        image: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/33867c83-d5be-4000-9cdc-c671cde4b363/c6377ce22991ee9a0bf10c525aaacea0.png',
        hashRate: '15 GH/s',
        power: 'Elite',
        cost: '150 $USDC/30 Days',
    },
];
