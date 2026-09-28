import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api, { authConfig } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    api.get("/orders/my", authConfig())
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || "Could not load orders"));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {location.state?.success && (
        <p className="success">{location.state.success}</p>
      )}

      {error && <p className="error">{error}</p>}

      {!orders.length ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <article className="order" key={order._id}>
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>

              <div className="order-status">
                <span>{order.isDelivered ? "Delivered" : "Processing"}</span>
                <strong>₹{order.totalPrice.toFixed(2)}</strong>
              </div>

              <p>{new Date(order.createdAt).toLocaleString()}</p>

              <div className="order-items">
                {order.orderItems.map((item) => (
                  <div key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}