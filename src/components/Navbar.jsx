import * as RiIcon from "react-icons/ri";
import { useAccount } from "wagmi";
import CoinChainPopover from "./common/coinChainPopover";
import ConnectButton from "./common/ConnectButton";

const Navbar = () => {
  const { address, isConnected } = useAccount();

  return (
    <nav className="w-full lg:px-2 px-4 xl:px-0 py-4 max-w-7xl mx-auto flex items-center justify-between border-b-2 border-gray-400">
      <div className="flex items-center gap-x-2 text-indigo-500">
        <RiIcon.RiWallet3Line size={30} />
        <h2 className="text-2xl font-bold">DexSwap</h2>
      </div>
      <div className="gap-x-2 flex items-center">
      <CoinChainPopover isConnected={isConnected} />
      <ConnectButton isConnected={isConnected} address={address} />
      </div>
    </nav>
  );
};

export default Navbar;
