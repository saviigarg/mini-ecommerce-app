import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <p className="category">{product.category}</p>
      <p style={{ color: product.stock > 0 ? "#28a745" : "#dc3545" }}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
      <button disabled={product.stock === 0} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
