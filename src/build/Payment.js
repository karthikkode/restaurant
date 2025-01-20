import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";

// Inside Payment Component
const Payment = () => {
  const { itemName } = useParams(); // Get itemName from the URL
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validCardNumbers = ['1234567890123456', '9876543210987654', '1111222233334444'];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validCardNumbers.includes(cardNumber)) {
      navigate('/otp'); // Navigate to OTP page on success
    } else {
      setError('Invalid card number. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment for {itemName}</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
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
            onChange={(e) => setCardNumber(e.target.value)} 
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
