import { combineReducers } from "redux";
import { coinReducer } from "./coinReducer";

export const rootReducer = combineReducers({
  coin: coinReducer,
});
