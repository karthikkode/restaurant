import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RestaurantMenu.css";
import menuData from "../constants/menuData";

const RestaurantMenu = () => {
  const { restaurantId } = useParams(); // Get the restaurantId from the URL
  const navigate = useNavigate();

  const handleBuyNow = (itemName) => {
    navigate(`/payment/${itemName}`); // Navigate to the Payment page with the item name
  };

  return (
    <div className="menu-container">
      <h2>Menu for Restaurant ID: {restaurantId}</h2>
      <div className="menu-items">
        {menuData.length > 0 ? (
          menuData.map((item, index) => (
            <div className="menu-item" key={index}>
              <img src={item.image} alt={item.itemName} className="menu-image" />
              <div className="menu-details">
                <h3 className="menu-title">{item.itemName}</h3>
                {item.tag && <span className="menu-tag">{item.tag}</span>}
                <p className="menu-rating">⭐ {item.rating}</p>
                <p className="menu-cost">₹{item.cost}</p>
                <p className="menu-cuisines">{item.cuisines.join(", ")}</p>
                <button
                  className="buy-now-button"
                  onClick={() => handleBuyNow(item.itemName)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available for this restaurant.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
