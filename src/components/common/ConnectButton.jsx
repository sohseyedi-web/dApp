import Meta from "../../assets/meta.svg";
import * as TbIcon from "react-icons/tb";
import * as RiIcon from "react-icons/ri";
import { useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useState } from "react";
import { Box, Popover, useMediaQuery, useTheme } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ConnectButton = ({ isConnected, address }) => {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [copy, setCopy] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-modal" : undefined;

  return isConnected ? (
    <>
      {isMobile ? (
        <button
          aria-describedby={id}
          onClick={handleClick}
          className=" bg-indigo-600 flex items-center justify-center  text-white transition-all duration-300 hover:bg-indigo-900 hover:text-indigo-100 font-bold w-[70px] rounded-2xl h-[45px] text-xl"
        >
          <img src={Meta} alt="" />
          <RiIcon.RiArrowDownSLine size={28} />
        </button>
      ) : (
        <button
          aria-describedby={id}
          onClick={handleClick}
          className=" bg-indigo-600 justify-center gap-x-2 items-center border-none flex border text-white transition-all duration-300 hover:bg-indigo-900 hover:text-indigo-100 font-bold w-[200px] rounded-2xl h-[45px] text-xl"
        >
          <img src={Meta} alt="" />
          {address.slice(0, 4) + "..." + address.slice(38)}
          <RiIcon.RiArrowDownSLine size={28} />
        </button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "200px",
            backgroundColor: "#252525",
            padding: ".5rem .7rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
            <button
              className={`${
                copy ? "text-green-600" : "text-white"
              } rounded-xl hover:bg-[#000] font-bold transition-all duration-300  bg-[#0d111b] w-full my-1 h-[40px] flex items-center justify-center gap-x-2`}
            >
              {copy ? (
                <>
                  Copied.!
                  <RiIcon.RiCheckDoubleFill size={24} className="" />
                </>
              ) : (
                <>
                  Copy Address <RiIcon.RiFileCopyLine size={24} />
                </>
              )}
            </button>
          </CopyToClipboard>
          <button
            onClick={disconnect}
            className="rounded-xl transition-all duration-300 hover:bg-[#000] font-bold my-1 bg-[#0d111b] w-full h-[40px] text-red-500 flex items-center justify-center gap-x-2"
          >
            Disconnect <RiIcon.RiShutDownLine size={24} />
          </button>
        </Box>
      </Popover>
    </>
  ) : (
    <>
      {/* not connect button */}
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
