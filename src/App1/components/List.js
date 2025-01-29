import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  setPage,
  setHasNextPage,
  setIsLoading,
} from "../../redux/action/listActions";
import { toggleFavorite } from "../../redux/action/favoriteActions"; // Import toggleFavorite action
import { fetchItemsFromAPI } from "../../utils/api";

const List = () => {
  const dispatch = useDispatch();
  const { items, page, hasNextPage, isLoading } = useSelector(
    (state) => state.list
  );
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux state
  const loaderRef = useRef(null);

  // Helper function to check if data for the current page already exists
  const isPageDataLoaded = (page) => {
    const startIndex = (page - 1) * 10; // Assuming 10 items per page
    const endIndex = page * 10;
    return items.slice(startIndex, endIndex).length === 10; // If 10 items exist for the page
  };

  // Fetch items when the page changes
  useEffect(() => {
    const fetchItems = async () => {
      // Skip API call if data for the current page is already loaded
      if (isPageDataLoaded(page)) {
        console.log(`Page ${page} data already loaded, skipping API call.`);
        return;
      }
      dispatch(setIsLoading(true)); // Set loading to true when starting to fetch
      try {
        const data = await fetchItemsFromAPI(page);
        if (data.length > 0) {
          dispatch(setItems([...items, ...data])); // Append new items
          dispatch(setHasNextPage(true));
        } else {
          dispatch(setHasNextPage(false)); // No more pages
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        dispatch(setIsLoading(false)); // Set loading to false once done
      }
    };

    fetchItems();
  }, [page, dispatch]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          dispatch(setPage(page + 1)); // Trigger next page load when scrolled to the bottom
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isLoading, page, dispatch]);

  return (
    <div>
      <button onClick={() => window.history.back()}>Back to Dashboard</button>
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.id}</p>

            <img src={item.thumbnailUrl} alt={item.title} />
            <p>{item.title}</p>

            <button onClick={() => dispatch(toggleFavorite(item))}>
              {favorites.some((fav) => fav.id === item.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {hasNextPage && !isLoading && (
        <div ref={loaderRef}>Scroll to load more...</div>
      )}
      {!hasNextPage && <p>No more items to load.</p>}
    </div>
  );
};

export default List;
