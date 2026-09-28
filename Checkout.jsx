import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { authConfig } from "../api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    paymentMethod: "Cash on Delivery"
  });

  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const shipping = total >= 1000 ? 0 : 80;
  const tax = Number((total * 0.18).toFixed(2));
  const grandTotal = total + shipping + tax;

  const submit = async (e) => {
    e.preventDefault();

    if (!cart.length) return navigate("/cart");

    try {
      setPlacing(true);

      const payload = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country
        },
        paymentMethod: form.paymentMethod
      };

      const { data } = await api.post("/orders", payload, authConfig());

      clearCart();
      navigate("/orders", { state: { success: `Order ${data._id} placed successfully!` } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {error && <p className="error">{error}</p>}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <h2>Shipping Address</h2>

          <label>Address</label>
          <input required value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} />

          <label>City</label>
          <input required value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })} />

          <label>Postal Code</label>
          <input required value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />

          <label>Country</label>
          <input required value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })} />

          <label>Payment Method</label>
          <select
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
          >
            <option>Cash on Delivery</option>
          </select>

          <button className="btn full" disabled={placing}>
            {placing ? "Placing Order..." : `Place Order — ₹${grandTotal.toFixed(2)}`}
          </button>
        </form>

        <aside className="summary">
          <h2>Items</h2>
          {cart.map((item) => (
            <p key={item._id}>
              {item.name} × {item.quantity}
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </p>
          ))}
          <hr />
          <p>Shipping <span>₹{shipping.toFixed(2)}</span></p>
          <p>Tax <span>₹{tax.toFixed(2)}</span></p>
          <h3>Total <span>₹{grandTotal.toFixed(2)}</span></h3>
        </aside>
      </div>
    </div>
  );
}