import React from "react";

export default function Cart({ cart, updateQty, removeItem }) {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  if (cart.length === 0) return <p>Cart is empty</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.title}</strong>
            <p>₹{item.price}</p>
          </div>
          <div>
            <button onClick={() => updateQty(item.id, -1)}>-</button>
            <span>{item.qty}</span>
            <button
              onClick={() => item.qty < item.stock && updateQty(item.id, 1)}
            >
              +
            </button>
            <button
              style={{ backgroundColor: "#dc3545" }}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <h4>Total Items: {totalItems}</h4>
      <h4>Total Price: ₹{totalPrice}</h4>
    </div>
  );
}
