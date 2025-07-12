import React, { useEffect } from 'react'
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { trimAddress } from '../utils/helper';
import { Button } from './ui/button';


export default function ConnectButton({ className }) {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();

    return (
        address && isConnected ? (
            <>
                <Button onClick={() => open()} type="button" className={className} >
                    {trimAddress(address)}
                </Button>
            </>
        ) : (
            <Button onClick={() => open()} type="button" className={className} >
                Connect Wallet
            </Button >
        )

    )
}