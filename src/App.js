import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './build/NavBar';
import RestaurantBox from './build/RestaurantBox';
import restaurantData from './constants/Restaurantdata';
import FoodDescriptionPage from './build/FoodDescriptionPage';
import RestaurantMenu from './build/RestaurantMenu';
import Payment from './build/Payment'; // Import the Payment component
import OTP from './build/OTP'; // Import the OTP component
import PaymentFailure from './build/PaymentFailure'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [filteredData, setFilteredData] = useState(restaurantData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/eventLogger.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <NavBar username={username} onSearch={handleSearch} onLogout={handleLogout} />}
        <Routes>
          <Route path="/home" element={isAuthenticated ? <div className="restaurant-list">
            {filteredData.length > 0 ? (
              filteredData.map((restaurant) => (
                <RestaurantBox
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  rating={restaurant.rating}
                  location={restaurant.location}
                  image={restaurant.image}
                />
              ))
            ) : (
              <p>No restaurants found.</p>
            )}
          </div> : <Navigate to="/" />} />
          
          <Route path="/" element={!isAuthenticated ? <FoodDescriptionPage onLogin={handleLogin} /> : <Navigate to="/home" />} />
          <Route path="/menu/:restaurantId" element={<RestaurantMenu />} />
          <Route path="/payment/:itemName" element={<Payment />} /> {/* Route for Payment */}
          <Route path="/otp" element={<OTP />} /> {/* Route for OTP */}
          <Route path="/paymentFailure" element={<PaymentFailure />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
