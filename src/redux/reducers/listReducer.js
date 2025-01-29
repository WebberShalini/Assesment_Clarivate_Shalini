// redux/reducers/listReducer.js

import {
  SET_ITEMS,
  SET_PAGE,
  SET_HAS_NEXT_PAGE,
  SET_IS_LOADING, // Import the new action type
} from "../action/listActions";

const initialState = {
  items: [],
  page: 1,
  hasNextPage: true,
  isLoading: false, // Add isLoading to the initial state
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.payload, isLoading: false }; // Reset loading when items are set
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload };
    case SET_IS_LOADING: // Handle the loading state
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default listReducer;
