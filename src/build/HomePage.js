import React from 'react';
import './HomePage.css';
import NavBar from './NavBar';
import RestaurantBox from './RestaurantBox';
import restaurantData from '../constants/Restaurantdata';


const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <h2 className="section-title">Best Restaurants</h2>
      <div className="restaurant-container">
        {restaurantData.map((restaurant, index) => (
          <RestaurantBox
            key={index}
            name={restaurant.name}
            rating={restaurant.rating}
            location={restaurant.location}
            image={restaurant.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
