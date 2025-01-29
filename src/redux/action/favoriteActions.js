export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const toggleFavorite = (item) => ({
  type: TOGGLE_FAVORITE,
  payload: item,
});
