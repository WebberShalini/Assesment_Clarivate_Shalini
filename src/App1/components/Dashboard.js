import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/action/favoriteActions";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/app1/list">
        <button>Go to List</button>
      </Link>
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => dispatch(toggleFavorite(item))}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
