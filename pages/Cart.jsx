
import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f3ef",
        padding: "35px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#3E2723" }}>
        🛒 My Coffee Cart
      </h1>

      <p style={{ color: "#777" }}>
        Your favourite coffee is waiting for you ☕
      </p>

      {cartItems.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "60px 20px",
            borderRadius: "22px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <div style={{ fontSize: "65px" }}>🛒</div>

          <h2 style={{ color: "#3E2723" }}>
            Your cart is empty
          </h2>

          <p style={{ color: "#777" }}>
            Add some delicious coffee to your cart!
          </p>

          <button
            onClick={() => (window.location.href = "/menu")}
            style={{
              marginTop: "15px",
              padding: "13px 25px",
              border: "none",
              borderRadius: "12px",
              background: "#6F4E37",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ☕ Browse Coffee
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {/* Cart Items */}

          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  padding: "18px",
                  borderRadius: "20px",
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      margin: "0 0 7px",
                      color: "#3E2723",
                    }}
                  >
                    ☕ {item.name}
                  </h2>

                  <p style={{ color: "#8D6E63" }}>
                    ₹{item.price} / cup
                  </p>

                  {/* Quantity */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "9px",
                        border: "none",
                        background: "#eee4dc",
                        color: "#5D4037",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "9px",
                        border: "none",
                        background: "#6F4E37",
                        color: "#fff",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <h3 style={{ color: "#3E2723" }}>
                    ₹{item.price * item.quantity}
                  </h3>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      border: "none",
                      background: "#fee2e2",
                      color: "#dc2626",
                      padding: "8px 12px",
                      borderRadius: "9px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "22px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              height: "fit-content",
            }}
          >
            <h2 style={{ color: "#3E2723" }}>
              🧾 Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "18px 0",
              }}
            >
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <hr />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: "#6F4E37", fontSize: "22px" }}>
                ₹{total}
              </strong>
            </div>

            <button
              onClick={() => (window.location.href = "/checkout")}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "13px",
                background: "#6F4E37",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

