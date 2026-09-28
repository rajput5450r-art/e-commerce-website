import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="rating">★ {product.rating} ({product.numReviews})</p>
        <p className="price">₹{product.price.toLocaleString("en-IN")}</p>

        <button
          className="btn"
          disabled={product.countInStock === 0}
          onClick={() => addToCart(product)}
        >
          {product.countInStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}