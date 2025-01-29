import { combineReducers } from "redux";
import listReducer from "./listReducer";
import favoritesReducer from "./favoritesReducer";

const rootReducer = combineReducers({
  list: listReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
