import Meta from "../../assets/meta.svg";
import * as TbIcon from "react-icons/tb";
import { useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ConnectButton = ({ isConnected, address }) => {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return isConnected ? (
    <>
      <button
        onClick={disconnect}
        className=" bg-indigo-600 justify-center gap-x-2 items-center border-none lg:flex hidden border text-white transition-all duration-300 hover:bg-indigo-900 hover:text-indigo-100 font-bold w-[200px] rounded-2xl h-[45px] text-xl"
      >
        <img src={Meta} alt="" />
        {address.slice(0, 4) + "..." + address.slice(38)}
      </button>
      <button
        onClick={disconnect}
        className=" bg-indigo-600 lg:hidden flex items-center justify-center  text-white transition-all duration-300 hover:bg-indigo-900 hover:text-indigo-100 font-bold w-[60px] rounded-2xl h-[45px] text-xl"
      >
        <img src={Meta} alt="" />
      </button>
    </>
  ) : (
    <>
      <button
        onClick={connect}
        className="border-indigo-700 lg:block hidden border text-blue-700 transition-all duration-300 hover:bg-blue-700 hover:text-indigo-100 font-bold w-[200px] rounded-2xl h-[45px] text-xl"
      >
        Connect Wallet
      </button>
      <button
        onClick={connect}
        className="border-indigo-700 items-center justify-center text-blue-700 lg:hidden flex border transition-all duration-300 hover:bg-blue-700 hover:text-indigo-100 font-bold w-[60px] rounded-2xl h-[45px] text-xl"
      >
        <TbIcon.TbWallet size={30} />
      </button>
    </>
  );
};

export default ConnectButton;
