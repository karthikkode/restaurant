import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

const Payment = () => {
  const { itemName } = useParams(); // Get itemName from the URL
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const formId = "paymentForm"; // Unique identifier for the form
  const [sessionId, setSessionId] = useState(""); // Session ID
  const backendUrl = "http://localhost:3000/form/logFormInteraction";
  

  const debounceTimer = useRef(null); // Use useRef to persist the timer across re-renders

  const validCardNumbers = ['1234567890123456', '9876543210987654', '1111222233334444'];

  // Function to log form interactions
  const logFormInteraction = async (fieldName, fieldContent, fieldRank) => {
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_id: formId,
          field_name: fieldName,
          field_content: fieldContent,
          field_rank: fieldRank,
          sessionId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log form interaction");
      }

      console.log(`Logged interaction for ${fieldName}`);
    } catch (error) {
      console.error("Error logging form interaction:", error);
    }
  };

  // Debounced handler for logging interactions
  const handleFieldChange = (fieldName, fieldContent, fieldRank, setter) => {
    setter(fieldContent);

    // Clear the previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new debounce timer
    debounceTimer.current = setTimeout(() => {
      logFormInteraction(fieldName, fieldContent, fieldRank);
    }, 500); // Debounce delay of 500ms
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validCardNumbers.includes(cardNumber)) {
      navigate('/otp'); // Navigate to OTP page on success
    } else {
      setError('Invalid card number. Please try again.');
    }
  };

  // Generate a session ID when the form is interacted with for the first time
  useEffect(() => {
    if (!sessionId) {
      const timestamp = Date.now(); // Get the current timestamp
      const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
      setSessionId(`${timestamp}-${randomNum}`); // Combine them to form a unique sessionId
    }
  }, [sessionId]);

  return (
    <div className="payment-container">
      <h2>Payment for {itemName}</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              handleFieldChange("Name", e.target.value, 1, setName)
            }
            required
          />
        </div>
        <div>
          <label>Item</label>
          <input
            type="text"
            value={itemName}
            readOnly
          />
        </div>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) =>
              handleFieldChange("Card Number", e.target.value, 2, setCardNumber)
            }
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) =>
              handleFieldChange("Address", e.target.value, 3, setAddress)
            }
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Proceed to OTP</button>
      </form>
    </div>
  );
};

export default Payment;
