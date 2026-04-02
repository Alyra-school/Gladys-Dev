'use client';
import NotConnected from "@/components/shared/NotConnected";
import NFT from "@/components/shared/Mint";
import { useConnection } from "wagmi";

export default function Home() {

  const { isConnected } = useConnection();

  return (
    <div>
      {isConnected ? (
        <NFT />
      ) : (
        <NotConnected />
      )}
    </div>
  );
}