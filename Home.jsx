import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products", {
        params: { keyword, category }
      });
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.get("/products/categories").then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const submitSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">MERN STACK E-COMMERCE</p>
          <h1>Shop smarter. Live better.</h1>
          <p>Discover electronics, fashion, gaming and home products in one place.</p>
        </div>
      </section>

      <section className="toolbar">
        <form onSubmit={submitSearch} className="search">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
          />
          <button className="btn">Search</button>
        </form>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </section>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <section className="grid">
          {products.length ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      )}
    </div>
  );
}