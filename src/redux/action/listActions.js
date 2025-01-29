// redux/actions/listActions.js

export const SET_ITEMS = "SET_ITEMS";
export const SET_PAGE = "SET_PAGE";
export const SET_HAS_NEXT_PAGE = "SET_HAS_NEXT_PAGE";
export const SET_IS_LOADING = "SET_IS_LOADING"; // New action type

// Action to set items
export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

// Action to set the current page
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

// Action to set hasNextPage
export const setHasNextPage = (hasNextPage) => ({
  type: SET_HAS_NEXT_PAGE,
  payload: hasNextPage,
});

// Action to set isLoading (new action)
export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});
