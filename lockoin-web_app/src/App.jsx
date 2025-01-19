import { useState } from "react";
import "./index.css";
import StripeContainer from "./components/StripeContainer";

function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState("");

  const handleCheckout = () => {
    if (!sellerId || !productName || !amount || !deliveryDetails) {
      alert("Please fill in all fields to proceed!");
      return;
    }
    setShowCheckout(true);
  };

  return (
    <div className="App">
      <h1>New Escrow Transaction</h1>
      {showCheckout ? (
        <StripeContainer
          sellerId={sellerId}
          productName={productName}
          amount={amount}
          quantity={quantity}
          deliveryDetails={deliveryDetails}
        />
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
          >
            <div className="form-group">
              <label htmlFor="sellerId">Seller ID:</label>
              <input
                type="text"
                id="sellerId"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
                placeholder="Enter Seller ID"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Black Shades"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (in cents):</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in cents"
                required
              />
            </div>

            <div className="form-group">
              <label>Product Quantity:</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="quantity-display"
                />
                <button type="button" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deliveryDetails">Delivery Details:</label>
              <textarea
                id="deliveryDetails"
                value={deliveryDetails}
                onChange={(e) => setDeliveryDetails(e.target.value)}
                placeholder="Enter delivery instructions or address"
                required
              />
            </div>

            <button type="submit" className="btn">
              Proceed to Payment
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
