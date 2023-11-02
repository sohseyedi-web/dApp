import * as RiIcon from "react-icons/ri";
import { useState } from "react";
import InfoModalToken from "../common/InfoModalToken";
import { useAccount } from "wagmi";
import { commas } from "./../../utils/comma";
import { Skeleton } from "@mui/material";
import Slippage from "../common/Slippage";

const SwapBox = ({
  onSelectToken,
  onChangeAmount,
  tokenOne,
  tokenTwo,
  tokenTwoAmount,
  tokenOneAmount,
  onSwitch,
  onClean,
  tokenTwoPrice,
  tokenOnePrice,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isConnected } = useAccount();

  const show = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3">
        <h3 className="text-2xl m-0 font-semibold ">Swap</h3>
        <div className="flex items-center gap-x-2">
          <RiIcon.RiRefreshLine
            onClick={onClean}
            size={30}
            className="text-indigo-700 cursor-pointer rotate-0 transition-all duration-300 hover:rotate-180"
          />
          <RiIcon.RiSettings3Line
            id="fade-button"
            onClick={handleClick}
            size={30}
            aria-controls={show ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={show ? "true" : undefined}
            className="text-indigo-700 cursor-pointer rotate-0 transition-all duration-300 hover:rotate-180"
          />
          <Slippage open={show} anchorEl={anchorEl} handleClose={handleClose} />
          {(tokenOne?.name || tokenTwo?.name) && (
            <>
              <RiIcon.RiInformationLine
                onClick={() => setOpen(true)}
                size={30}
                className="text-indigo-700 animate-pulse cursor-pointer rotate-0 transition-all duration-300 hover:rotate-[360deg]"
              />
              <InfoModalToken
                open={open}
                setOpen={setOpen}
                tokenOne={tokenOne}
                tokenTwo={tokenTwo}
              />
            </>
          )}
        </div>
      </div>
      <form className="my-2 relative">
        {/* token one field */}
        <div className="w-full bg-[#0d111b] rounded-lg h-[120px] px-3 py-2 shadow-lg mb-3 relative">
          <h6 className="font-semibold mb-5">You sell</h6>
          <input
            value={commas(tokenOneAmount)}
            onChange={onChangeAmount}
            disabled={!tokenOnePrice}
            dir="rtl"
            placeholder="0"
            type="text"
            className="w-full relative rounded-lg outline-none bg-transparent text-2xl mb-2"
          />
          <div
            onClick={() => onSelectToken(1)}
            className={`${
              tokenOne
                ? "bg-[#0d111b] border-2 border-blue-600"
                : "bg-black border-transparent border-2"
            } absolute px-1 left-3 top-[40%] gap-x-1 h-[35px] rounded-3xl flex items-center cursor-pointer text-lg`}
          >
            {tokenOne && (
              <img
                src={tokenOne.img}
                width={22}
                height={22}
                alt={tokenOne.name}
              />
            )}
            {tokenOne ? (
              <span className="uppercase">{tokenOne.symbol}</span>
            ) : (
              <span>Select a Token</span>
            )}
            <RiIcon.RiArrowDropDownLine size={30} />
          </div>
          {tokenOne && (
            <div className="flex items-center justify-between text-base py-1">
              <h6 className="text-gray-500 font-semibold">{tokenOne.name}</h6>
              <span className="text-gray-500 font-semibold">
                {loading ? (
                  <Skeleton
                    width={"50px"}
                    height={"30px"}
                    sx={{
                      margin: 0,
                      borderRadius: ".5rem",
                      background:
                        "linear-gradient(270deg, rgba(71, 77, 96, 0) 0%, #474D60 100%)",
                    }}
                  />
                ) : (
                  `$${tokenOnePrice?.toFixed(2)}`
                )}
              </span>
            </div>
          )}
        </div>
        {/* switch token */}
        <span
          onClick={onSwitch}
          className="absolute rotate-0 transition-all duration-300 hover:rotate-180 z-20 top-[32%] cursor-pointer right-[45%] w-[35px] h-[35px] bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <RiIcon.RiArrowUpDownLine size={24} />
        </span>
        {/* token two field */}
        <div className="w-full bg-[#0d111b] rounded-lg h-[120px] px-3 py-2 shadow-lg mb-3 relative">
          <h6 className="font-semibold mb-5">You Buy</h6>
          <input
            value={commas(tokenTwoAmount)}
            readOnly
            dir="rtl"
            placeholder="0"
            type="text"
            className="w-full relative rounded-lg outline-none bg-transparent text-2xl mb-2"
          />
          <div
            onClick={() => onSelectToken(2)}
            className={`${
              tokenTwo
                ? "bg-[#0d111b] border-2 border-blue-600"
                : "bg-black border-transparent border-2"
            } absolute px-1 left-3 top-[40%] gap-x-1 h-[35px] rounded-3xl flex items-center cursor-pointer text-lg`}
          >
            {tokenTwo && (
              <img
                src={tokenTwo.img}
                width={22}
                height={22}
                alt={tokenTwo.name}
              />
            )}
            {tokenTwo ? (
              <span className="uppercase">{tokenTwo.symbol}</span>
            ) : (
              <span>Select a Token</span>
            )}
            <RiIcon.RiArrowDropDownLine size={30} />
          </div>
          {tokenTwo && (
            <div className="flex items-center justify-between text-base py-1">
              <h6 className="text-gray-500 font-semibold">{tokenTwo.name}</h6>
              <span className="text-gray-500 font-semibold">
                {loading ? (
                  <Skeleton
                    width={"50px"}
                    height={"30px"}
                    sx={{
                      margin: 0,
                      borderRadius: ".5rem",
                      background:
                        "linear-gradient(270deg, rgba(71, 77, 96, 0) 0%, #474D60 100%)",
                    }}
                  />
                ) : (
                  `$${tokenTwoPrice?.toFixed(2)}`
                )}
              </span>
            </div>
          )}
        </div>
        <button
          className={`${
            isConnected ? "opacity-100" : "opacity-50"
          } w-full h-[60px] rounded-lg bg-blue-600 transition-all hover:bg-blue-700 text-xl my-2`}
        >
          Swap
        </button>
      </form>
    </>
  );
};

export default SwapBox;
