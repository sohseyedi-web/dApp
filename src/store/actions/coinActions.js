export const ADD_PIN_COINS = "ADD_PIN_COINS";
export const REMOVE_PIN_COINS = "REMOVE_PIN_COINS";
export const SLIPPAGE_VALUE = "SLIPPAGE_VALUE";
export const COIN_CHAIN = "COIN_CHAIN";

export const pinCoinsLists = (coins) => {
  return {
    type: ADD_PIN_COINS,
    payload: coins,
  };
};
export const removePinCoinsLists = (id) => {
  return {
    type: REMOVE_PIN_COINS,
    payload: id,
  };
};
export const changeSlippage = (value) => {
  return {
    type: SLIPPAGE_VALUE,
    payload: value,
  };
};
export const selectCoinChain = (value) => {
  return {
    type: COIN_CHAIN,
    payload: value,
  };
};
