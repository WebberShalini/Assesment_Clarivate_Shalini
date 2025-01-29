import React from "react";
import PropTypes from "prop-types";
import "./ItemCard.scss";

const ItemCard = ({ item, isFavorite, toggleFavorite }) => {
  return (
    <div className="item" key={item.id}>
      <p className="item-id">ID: {item.id}</p>
      <p className="item-title">{item.title}</p>
      <img src={item.thumbnailUrl} alt={item.title} className="item-image" />
      <button
        className={`btn-toggle-favorite ${isFavorite ? "favorite" : ""}`}
        onClick={() => toggleFavorite(item)}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default ItemCard;
