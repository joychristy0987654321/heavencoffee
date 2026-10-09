import React from "react";
import "./Orders.css";

function Orders() {
  const orders = [
    {
      id: "#ORD-1024",
      name: "Cappuccino",
      quantity: "2 × Cappuccino",
      price: "₹240",
      date: "Today, 10:30 AM",
      status: "Preparing",
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "#ORD-1023",
      name: "Cold Coffee",
      quantity: "1 × Cold Coffee",
      price: "₹150",
      date: "Yesterday, 6:45 PM",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "#ORD-1022",
      name: "Espresso",
      quantity: "1 × Espresso",
      price: "₹120",
      date: "Sep 28, 4:20 PM",
      status: "Cancelled",
      image:
        "https://images.unsplash.com/photo-1510707577719-ae7c14805e32?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="orders-page">

      {/* ================= HERO ================= */}
      <section className="orders-hero">

        <div className="hero-content">
          <div className="hero-title-row">
            <h1>Orders</h1>
            <span className="box-icon">📦</span>
          </div>

          <p>Track and manage your coffee orders</p>

          <div className="hero-buttons">
            <button className="track-main">
              🚚 Track Order
            </button>

            <button className="cancel-main">
              ✕ Cancel Order
            </button>
          </div>
        </div>

        <div className="orders-count">
          <div className="count-icon">☕</div>
          <div>
            <strong>3 Orders</strong>
            <span>Total Orders</span>
          </div>
        </div>

      </section>

      {/* ================= ORDERS ================= */}
      <section className="orders-container">

        {orders.map((order) => (
          <div className="order-card" key={order.id}>

            {/* Coffee Image */}
            <img
              src={order.image}
              alt={order.name}
              className="coffee-image"
            />

            {/* Order Information */}
            <div className="order-info">

              <span className="order-id">
                {order.id}
              </span>

              <h2>{order.name}</h2>

              <p className="quantity">
                ☕ {order.quantity}
              </p>

              <div className="order-details">

                <div>
                  <span>📅</span>
                  <div>
                    <strong>{order.date}</strong>
                    <small>Order Date</small>
                  </div>
                </div>

                <div>
                  <span>₹</span>
                  <div>
                    <strong>{order.price}</strong>
                    <small>Total Amount</small>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="order-right">

              <span
                className={`status ${
                  order.status.toLowerCase()
                }`}
              >
                ● {order.status}
              </span>

              {/* Progress */}
              <div className="progress">

                <div className="progress-item active">
                  <div>✓</div>
                  <span>Ordered</span>
                </div>

                <div
                  className={`progress-line ${
                    order.status === "Cancelled"
                      ? "cancel-line"
                      : ""
                  }`}
                ></div>

                <div
                  className={`progress-item ${
                    order.status !== "Cancelled"
                      ? "active"
                      : "cancelled-step"
                  }`}
                >
                  <div>
                    {order.status === "Cancelled" ? "✓" : "☕"}
                  </div>
                  <span>Preparing</span>
                </div>

                <div className="progress-line"></div>

                <div
                  className={`progress-item ${
                    order.status === "Delivered"
                      ? "active"
                      : "last-step"
                  }`}
                >
                  <div>
                    {order.status === "Delivered"
                      ? "🚚"
                      : order.status === "Cancelled"
                      ? "×"
                      : "🚚"}
                  </div>
                  <span>Delivered</span>
                </div>

              </div>

              {/* Buttons */}
              <div className="order-actions">

                {order.status === "Preparing" && (
                  <>
                    <button className="track-btn">
                      🚚 Track Order
                    </button>

                    <button className="cancel-btn">
                      ✕ Cancel Order
                    </button>
                  </>
                )}

                {order.status === "Delivered" && (
                  <button className="again-btn">
                    ☕ Order Again
                  </button>
                )}

                {order.status === "Cancelled" && (
                  <button className="again-btn">
                    ↻ Reorder
                  </button>
                )}

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="coffee-footer">

        <div className="footer-container">

          {/* About */}
          <div className="footer-about">
            <h2>☕ Coffee Haven</h2>

            <p>
              Fresh coffee made with premium quality beans.
              Every cup is crafted with love and passion. ❤️
            </p>

            <div className="coffee-icons">
              ☕ 🌿 🤎
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>🔗 Quick Links</h3>

            <a href="/">🏠 Home</a>
            <a href="/menu">☕ Menu</a>
            <a href="/cart">🛒 Cart</a>
            <a href="/favourite">❤️ Favourite</a>
            <a href="/about">ℹ️ About Us</a>
            <a href="/contact">📞 Contact Us</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>📞 Contact Us</h3>

            <p>📱 +91 9876543210</p>
            <p>📧 coffeehaven@gmail.com</p>
            <p>📍 Chennai, Tamil Nadu</p>
          </div>

          {/* Opening */}
          <div className="footer-column">
            <h3>🕐 Opening Hours</h3>

            <p>
              <strong>Monday - Friday</strong>
            </p>

            <p>🕐 8:00 AM - 10:00 PM</p>

            <p>
              <strong>Saturday - Sunday</strong>
            </p>

            <p>🕐 9:00 AM - 11:00 PM</p>
          </div>

        </div>

        <div className="footer-bottom">

          <span>
            ☕ © 2026 Coffee Haven. All Rights Reserved.
          </span>

          <div className="social-icons">
            <span>🔵 Facebook</span>
            <span>📸 Instagram</span>
            <span>🟢 WhatsApp</span>
            <span>🔴 YouTube</span>
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Orders;