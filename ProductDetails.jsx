import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => setError(err.response?.data?.message || "Product not found"));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="details">
      <Link to="/" className="back">← Back to products</Link>

      <div className="details-grid">
        <img className="details-img" src={product.image} alt={product.name} />

        <div>
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="rating">★ {product.rating} ({product.numReviews} reviews)</p>
          <p className="details-price">₹{product.price.toLocaleString("en-IN")}</p>
          <p>{product.description}</p>

          <div className="stock">
            {product.countInStock > 0
              ? `${product.countInStock} items available`
              : "Out of stock"}
          </div>

          {product.countInStock > 0 && (
            <div className="buy-row">
              <input
                type="number"
                min="1"
                max={product.countInStock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                className="btn"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}