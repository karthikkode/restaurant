import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = ({ username, onLogout, onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle user dropdown visibility
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const backendUrl = "http://www.localhost:3000/events/trendingPhrases";

  useEffect(() => {
    if (showSuggestions) {
      fetchSuggestions();
    }
  }, [showSuggestions]);

  const fetchSuggestions = async () => {
    try {
      const queryParams = new URLSearchParams({
        timeRange: "10d", // Adjust the time range as needed
        limit: "5", // Limit the number of suggestions
        traceEventName: "restaurant-search", // Adjust the event name dynamically
      });

      const response = await fetch(`${backendUrl}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.response || []); // Set suggestions from the API response
      } else {
        console.error("Failed to fetch suggestions:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchValue(value);
    setShowSuggestions(true);
    onSearch(value); // Trigger the onSearch callback if needed
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.phrase);
    setShowSuggestions(false);
    onSearch(suggestion.phrase); // Trigger the onSearch callback with the selected suggestion
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <a href="/home">Home</a>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search Restaurants"
            className="search-bar"
            trace-search="restaurant-search"
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions with a delay
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.phrase}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="user-logo" onClick={toggleDropdown}>
          {username || 'User'} {/* Display username or 'User' if not logged in */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"/>
          </svg>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={onLogout} className="dropdown-item">Logout</button>
              <button onClick={toggleDropdown} className="dropdown-item">Close</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
