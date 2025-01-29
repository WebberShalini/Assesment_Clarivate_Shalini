import { TOGGLE_FAVORITE } from "../action/favoriteActions";

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exists = state.some((fav) => fav.id === action.payload.id);
      return exists
        ? state.filter((fav) => fav.id !== action.payload.id)
        : [...state, action.payload];
    default:
      return state;
  }
};

export default favoritesReducer;
