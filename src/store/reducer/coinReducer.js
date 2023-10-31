import {
  COIN_CHAIN,
  ADD_PIN_COINS,
  REMOVE_PIN_COINS,
  SLIPPAGE_VALUE,
} from "./../actions/coinActions";

const initialState = {
  pinCoins: [],
  slippage: "0.5",
  coinChain: "Ethereum ",
};

export const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIN_COINS:
      return {
        ...state,
        pinCoins: [...state.pinCoins, action.payload],
      };
    case REMOVE_PIN_COINS:
      return {
        ...state,
        pinCoins: state.pinCoins.filter((item) => item._id !== action.payload),
      };
    case SLIPPAGE_VALUE:
      return {
        ...state,
        slippage: action.payload,
      };
    case COIN_CHAIN:
      return { ...state, coinChain: action.payload };
    default:
      return state;
  }
};
