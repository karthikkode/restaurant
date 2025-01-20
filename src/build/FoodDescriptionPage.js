import React, { useState } from 'react';
import './FoodDescriptionPage.css';
import backgroundImage from '../images/rest.jpg'; // Correct image path
import { useNavigate } from 'react-router-dom';

const FoodDescriptionPage = ({ onLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // State to display login error

  const navigate = useNavigate(); // Hook to navigate between pages

  // Static list of valid usernames and passwords
  const validCredentials = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
  ];

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseClick = () => {
    setShowLoginForm(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Check if the entered credentials match any in the validCredentials array
    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (true) {
      onLogin(username); // Pass the username to the parent component
      navigate('/home'); // Navigate to the home page on success
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <h2>Delicious Food Choices</h2>
        <p>
          Our restaurant offers a wide variety of dishes made with fresh ingredients.
          Whether you're craving a hearty meal or a light snack, we have something for every taste.
        </p>
      </div>

      <button className="login-button-top" onClick={handleLoginClick}>
        Login
      </button>

      {showLoginForm && (
        <div className="login-form">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit" className="login-button">Submit</button>
            <button
              type="button"
              className="close-button"
              onClick={handleCloseClick}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodDescriptionPage;
