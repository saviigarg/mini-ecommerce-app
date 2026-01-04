import React, { useState, useEffect } from "react";
import { products } from "./data/products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./styles.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === product.id);
      if (item) {
        if (item.qty < product.stock) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + change } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  // Filter + Sort
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="app-container">
      <h1>Mini E-Commerce</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Price Sort */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by Price</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      {/* Clear Filters */}
      <button onClick={clearFilters}>Clear Filters</button>

      {/* No results */}
      {filteredProducts.length === 0 && <p>No products found</p>}

      {/* Product List */}
      <ProductList products={filteredProducts} addToCart={addToCart} />

      <hr />

      {/* Cart */}
      <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />
    </div>
  );
}
