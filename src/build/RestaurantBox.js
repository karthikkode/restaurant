import { useNavigate } from "react-router-dom";
import "./RestaurantBox.css"; // Ensure the CSS is imported

const RestaurantBox = ({ id, name, rating, location, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/menu/${id}`); // Navigate to the menu page with the restaurant ID
  };

  return (
    <div className="restaurant-box" onClick={handleClick} trace-click="restaurant" trace-hover="restaurant">
      <img src={image} alt={name} className="restaurant-image" />
      <div className="restaurant-info">
        <h3>{name}</h3>
        <p>Rating: {rating} ⭐</p>
        <p>Location: {location}</p>
      </div>
    </div>
  );
};

export default RestaurantBox;
