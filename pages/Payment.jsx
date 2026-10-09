
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  }, []);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const placeOrder = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/menu");
      return;
    }

    const newOrder = {
      id: "ORD" + Date.now(),
      customer: name,
      phone: phone,
      items: cartItems,
      total: total,
      paymentMethod: paymentMethod,
      paymentStatus: "Paid",
      status: "Preparing",
      createdAt: new Date().toISOString(),
    };

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...oldOrders])
    );

    localStorage.removeItem("cart");

    window.dispatchEvent(
      new Event("ordersUpdated")
    );

    alert(
      "✅ Payment Successful!\n\n" +
      "Order ID: " +
      newOrder.id
    );

    navigate("/orders");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f1ed",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#3E2723",
            marginBottom: "25px",
          }}
        >
          🧾 Checkout
        </h1>

        {/* Customer Details */}
        <h2 style={{ color: "#3E2723" }}>
          👤 Customer Details
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        {/* Order Summary */}
        <h2
          style={{
            color: "#3E2723",
            marginTop: "25px",
          }}
        >
          ☕ Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{item.name}</strong>

                <div style={{ color: "#777" }}>
                  Qty: {item.quantity || 1}
                </div>
              </div>

              <strong>
                ₹
                {Number(item.price || 0) *
                  Number(item.quantity || 1)}
              </strong>
            </div>
          ))
        )}

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "25px",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#3E2723",
          }}
        >
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* Payment Methods */}
        <h2
          style={{
            color: "#3E2723",
            marginTop: "30px",
          }}
        >
          💳 Select Payment Method
        </h2>

        <div style={{ display: "grid", gap: "12px" }}>
          <PaymentOption
            icon="📱"
            title="UPI"
            subtitle="GPay / PhonePe / Paytm"
            value="UPI"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />

          <PaymentOption
            icon="💳"
            title="Credit Card"
            subtitle="Pay using Credit Card"
            value="Credit Card"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />

          <PaymentOption
            icon="💳"
            title="Debit Card"
            subtitle="Pay using Debit Card"
            value="Debit Card"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />

          <PaymentOption
            icon="🏦"
            title="Net Banking"
            subtitle="All major banks"
            value="Net Banking"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />

          <PaymentOption
            icon="💰"
            title="Other"
            subtitle="Other supported payment methods"
            value="Other"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />
        </div>

        {/* Pay Button */}
        <button
          onClick={placeOrder}
          disabled={cartItems.length === 0}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "16px",
            border: "none",
            borderRadius: "12px",
            background:
              cartItems.length === 0
                ? "#aaa"
                : "#3E2723",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor:
              cartItems.length === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          💳 Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

function PaymentOption({
  icon,
  title,
  subtitle,
  value,
  selected,
  setSelected,
}) {
  const isSelected = selected === value;

  return (
    <div
      onClick={() => setSelected(value)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "16px",
        border: isSelected
          ? "2px solid #3E2723"
          : "1px solid #ddd",
        borderRadius: "12px",
        cursor: "pointer",
        background: isSelected
          ? "#f5eee9"
          : "white",
      }}
    >
      <div style={{ fontSize: "28px" }}>
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <strong
          style={{
            color: "#3E2723",
            fontSize: "16px",
          }}
        >
          {title}
        </strong>

        <div
          style={{
            color: "#777",
            fontSize: "13px",
            marginTop: "3px",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "2px solid #3E2723",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSelected && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#3E2723",
            }}
          />
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  boxSizing: "border-box",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "15px",
};

export default Checkout;

