import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    total
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="empty">
        <h1>Your cart is empty</h1>
        <Link className="btn" to="/">Start Shopping</Link>
      </div>
    );
  }

  const shipping = total >= 1000 ? 0 : 80;
  const tax = Number((total * 0.18).toFixed(2));
  const grandTotal = total + shipping + tax;

  const checkout = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <section>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <Link to={`/product/${item._id}`}><h3>{item.name}</h3></Link>
                <p>₹{item.price.toLocaleString("en-IN")}</p>

                <input
                  type="number"
                  min="1"
                  max={item.countInStock}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                />

                <button
                  className="danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="summary">
          <h2>Order Summary</h2>
          <p>Items <span>₹{total.toFixed(2)}</span></p>
          <p>Shipping <span>₹{shipping.toFixed(2)}</span></p>
          <p>Tax (18%) <span>₹{tax.toFixed(2)}</span></p>
          <hr />
          <h3>Total <span>₹{grandTotal.toFixed(2)}</span></h3>
          <button className="btn full" onClick={checkout}>Proceed to Checkout</button>
        </aside>
      </div>
    </div>
  );
}