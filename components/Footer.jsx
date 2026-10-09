
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, #1b0d08, #3E2723, #160907)",
        color: "white",
        marginTop: "50px",
      }}
    >
      {/* Main Footer */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "55px 25px 35px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr",
          gap: "40px",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "20px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              marginBottom: "15px",
              color: "#f5c16c",
            }}
          >
            ☕ Coffee Haven
          </h2>

          <p
            style={{
              color: "#ddd",
              lineHeight: "1.8",
              maxWidth: "300px",
            }}
          >
            Fresh coffee made with premium quality
            beans. Every cup is crafted with love
            and passion. ❤️
          </p>

          <div
            style={{
              marginTop: "25px",
              fontSize: "25px",
              letterSpacing: "10px",
            }}
          >
            ☕ 🌿 🤎
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={headingStyle}>
            🔗 Quick Links
          </h3>

          <Link style={linkStyle} to="/">
            🏠 Home
          </Link>

          <Link style={linkStyle} to="/menu">
            ☕ Menu
          </Link>

          <Link style={linkStyle} to="/cart">
            🛒 Cart
          </Link>

          <Link style={linkStyle} to="/favourite">
            ❤️ Favourite
          </Link>

          <Link style={linkStyle} to="/about">
            ℹ️ About Us
          </Link>
        </div>

        {/* Contact */}
        <div>
          <h3 style={headingStyle}>
            📞 Contact Us
          </h3>

          <a
            href="tel:+919876543210"
            style={contactStyle}
          >
            📱 +91 9876543210
          </a>

          <a
            href="mailto:coffeehaven@gmail.com"
            style={contactStyle}
          >
            📧 coffeehaven@gmail.com
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Chennai%2C%20Tamil%20Nadu"
            target="_blank"
            rel="noreferrer"
            style={contactStyle}
          >
            📍 Chennai, Tamil Nadu
          </a>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 style={headingStyle}>
            🕐 Opening Hours
          </h3>

          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              border:
                "1px solid rgba(245,193,108,0.35)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            <p style={{ margin: "0 0 8px" }}>
              <strong>Monday - Friday</strong>
            </p>

            <p
              style={{
                color: "#ccc",
                marginBottom: "18px",
              }}
            >
              🕐 8:00 AM - 10:00 PM
            </p>

            <hr
              style={{
                border: "none",
                borderTop:
                  "1px solid rgba(255,255,255,0.15)",
              }}
            />

            <p style={{ margin: "18px 0 8px" }}>
              <strong>Saturday - Sunday</strong>
            </p>

            <p
              style={{
                color: "#ccc",
                margin: 0,
              }}
            >
              🕐 9:00 AM - 11:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.15)",
          maxWidth: "1200px",
          margin: "auto",
          padding: "22px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#ccc",
          }}
        >
          ☕ © 2026 <strong>Coffee Haven</strong>.
          All Rights Reserved.
        </p>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            style={socialStyle}
          >
            🔵 Facebook
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            style={socialStyle}
          >
            📸 Instagram
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            style={socialStyle}
          >
            🟢 WhatsApp
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            style={socialStyle}
          >
            🔴 YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

const headingStyle = {
  color: "#f5c16c",
  fontSize: "20px",
  marginBottom: "20px",
};

const linkStyle = {
  display: "block",
  color: "#ddd",
  textDecoration: "none",
  marginBottom: "14px",
  fontSize: "15px",
  transition: "0.3s",
};

const contactStyle = {
  display: "block",
  color: "#ddd",
  textDecoration: "none",
  marginBottom: "16px",
  lineHeight: "1.5",
};

const socialStyle = {
  color: "#ddd",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "14px",
  padding: "8px 10px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.05)",
};

export default Footer;

