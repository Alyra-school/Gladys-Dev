'use client';
import { useConnection } from "wagmi";
import NotConnected from "@/components/shared/NotConnected";
import Jobs from "@/components/shared/Jobs";

export default function Home() {

  const { isConnected } = useConnection();

  return (
    <div>
      {isConnected ? (
        <Jobs />
      ) : (
        <NotConnected />
      )}
    </div>
  );
}
