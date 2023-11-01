import axios from "axios";
import { useEffect, useState } from "react";
import SwapBox from "./swap/SwapBox";
import SwapTokenChoice from "./swap/SwapTokenChoice";

const Home = () => {
  // state token 1
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenOnePrice, setTokenOnePrice] = useState("");
  // state token 2
  const [tokenTwo, setTokenTwo] = useState(null);
  const [tokenTwoPrice, setTokenTwoPrice] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  // other state
  const [loading, setLoading] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [showSwap, setShowSwap] = useState(1);
  let ratio = tokenOnePrice / tokenTwoPrice;

  // clean up fields
  const cleanUpToken = () => {
    setTokenTwoPrice("");
    setTokenOnePrice("");
    setTokenOneAmount("");
    setTokenTwoAmount("");
    setTokenOne("");
    setTokenTwo("");
  };

  // switch token between inputs
  const switchToken = () => {
    cleanUpToken();
    setTokenOne(tokenTwo);
    setTokenTwo(tokenOne);
    setTokenTwoPrice(tokenOnePrice);
    setTokenOnePrice(tokenTwoPrice);
  };

  // open token choice box
  const hanldeSelectToken = (value) => {
    setChangeToken(value);
    setShowSwap(2);
  };

  // select token
  const modifyToken = (token) => {
    if (changeToken === 1 && tokenTwo?._id !== token._id) {
      setTokenOne(token);
    } else {
      if (tokenOne?._id === token._id) {
        toast.error("please select another token");
      } else {
        setTokenTwo(token);
      }
    }

    setShowSwap(1);
  };

  // get tokens price handler
  const fetchPrices = async (one, two) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one},${two}&tsyms=USD`
      );
      const tokenPrices = Object.values(data);
      setTokenOnePrice(tokenPrices[0].USD);
      setTokenTwoPrice(tokenPrices[1].USD);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPrices(tokenOne?.symbol, tokenTwo?.symbol);
  }, [tokenOne, tokenTwo]);

  // on change inputs
  const onChangeAmount = (e) => {
    setTokenOneAmount(e.target.value);
    if (e.target.value && ratio) {
      setTokenTwoAmount((e.target.value * ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  };

  return (
    <section className="flex-1 flex items-center justify-center h-full">
      <div className="border-indigo-900 relative border-2 bg-[#202020] md:w-[450px] rounded-2xl p-2 text-white w-[90%] mx-auto shadow-lg">
        {showSwap == 1 && (
          <SwapBox
            onSelectToken={hanldeSelectToken}
            onClean={cleanUpToken}
            onSwitch={switchToken}
            tokenOne={tokenOne}
            tokenOnePrice={tokenOnePrice}
            tokenTwoPrice={tokenTwoPrice}
            tokenTwo={tokenTwo}
            tokenOneAmount={tokenOneAmount}
            tokenTwoAmount={tokenTwoAmount}
            onChangeAmount={onChangeAmount}
            loading={loading}
          />
        )}
        {showSwap == 2 && (
          <SwapTokenChoice setShowSwap={setShowSwap} onModify={modifyToken} />
        )}
      </div>
    </section>
  );
};

export default Home;
