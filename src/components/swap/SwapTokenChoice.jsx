import { useState, useEffect } from "react";
import * as RiIcon from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkInPin } from "./../../utils/checkInPin";
import {
  pinCoinsLists,
  removePinCoinsLists,
} from "../../store/actions/coinActions";

const SwapTokenChoice = ({ setShowSwap, onModify }) => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const { coinChain, pinCoins } = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  const handleCoinToPinList = (value) => {
    if (checkInPin(pinCoins, value)) {
      dispatch(removePinCoinsLists(value._id));
    } else {
      dispatch(pinCoinsLists(value));
    }
  };

  const getCoinswithQuery = async (value) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_DATA}/tokens?c=${value}`
      );
      setCoins(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterCoins = coins.filter((coin) => coin.chain.includes(coinChain));

  useEffect(() => {
    getCoinswithQuery(search);
  }, [search]);

  return (
    <>
      <div className="flex items-center p-3 relative">
        <RiIcon.RiArrowLeftDoubleLine
          onClick={() => setShowSwap(1)}
          size={30}
          className="text-indigo-700 scale-100 cursor-pointer transition-all duration-200 hover:scale-110"
        />
        <h3 className="text-2xl flex-1 m-0 font-semibold text-center">Token</h3>
      </div>
      <div className="w-[95%] mx-auto">
        {/* search coin field */}
        <form className="relative">
          <input
            placeholder="Search Token ..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 text-blue-100 rounded-lg h-[55px] outline-none bg-transparent border border-indigo-700"
          />
          <span className="absolute left-2 top-[25%] text-indigo-700">
            <RiIcon.RiSearchLine size={24} />
          </span>
        </form>
        {/* pin coins box */}
        <div className="flex items-center gap-2 flex-wrap my-4">
          {pinCoins.map((pin) => (
            <span
              onClick={() => onModify(pin)}
              key={pin._id}
              className="p-1 cursor-pointer rounded-lg border border-gray-500 text-sm flex items-center gap-x-1"
            >
              <img src={pin.img} width={22} height={22} alt={pin.name} />
              {pin.name}
            </span>
          ))}
        </div>
        <hr className=" border-indigo-700" />
        {/* result coins */}
        <div className="py-2 overflow-auto max-h-[200px] scroll">
          {filterCoins.length === 0 ? (
            <div className="flex items-center justify-center gap-x-1 text-red-500">
              <RiIcon.RiEmotionUnhappyLine size={24} />
              No Found Coins{" "}
            </div>
          ) : (
            filterCoins.map((coin) => (
              <div
                className="my-2 z-10 flex items-center justify-between cursor-pointer"
                key={coin._id}
              >
                <div
                  className="flex items-center gap-x-2"
                  onClick={() => onModify(coin)}
                >
                  <img
                    src={coin.img}
                    alt={coin.name}
                    className="object-cover w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <h6 className="text-base opacity-95">{coin.name}</h6>
                    <p className="text-sm opacity-85">{coin.symbol}</p>
                  </div>
                </div>
                <button
                  className={`${
                    checkInPin(pinCoins, coin)
                      ? "text-indigo-700"
                      : "text-white"
                  } z-50 transition-all duration-300`}
                  onClick={() => handleCoinToPinList(coin)}
                >
                  <RiIcon.RiPushpinFill size={24} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SwapTokenChoice;
