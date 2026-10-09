import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [customer, setCustomer] =
    useState({
      name: "",
      phone: "",
      address: ""
    });

  const [payment, setPayment] =
    useState("Cash on Delivery");

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  function handleChange(e) {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });

  }

  function placeOrder(e) {

    e.preventDefault();

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address
    ) {

      alert("Please fill all details");

      return;
    }

    const order = {

      id: Date.now(),

      customer,

      payment,

      items: cart,

      total,

      status: "Pending",

      createdAt:
        new Date().toLocaleString()

    };

    const orders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    orders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    localStorage.setItem(
      "order",
      JSON.stringify(order)
    );

    localStorage.removeItem("cart");

    alert("Order placed successfully! 🎉");

    navigate("/orders");

  }

  if (cart.length === 0) {

    return (
      <div className="empty-cart">

        <h2>
          Your cart is empty ☕
        </h2>

      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-title">

        <p>CHECKOUT</p>

        <h1>
          Complete Your Order
        </h1>

      </div>

      <div className="checkout-grid">

        <form
          className="checkout-form"
          onSubmit={placeOrder}
        >

          <h2>
            Customer Details
          </h2>

          <label>Name</label>

          <input
            name="name"
            placeholder="Your name"
            value={customer.name}
            onChange={handleChange}
          />

          <label>
            Phone Number
          </label>

          <input
            name="phone"
            placeholder="Phone number"
            value={customer.phone}
            onChange={handleChange}
          />

          <label>
            Delivery Address
          </label>

          <textarea
            name="address"
            placeholder="Your address"
            value={customer.address}
            onChange={handleChange}
          />

          <h2>
            Payment
          </h2>

          <div className="payment-options">

            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={
                  payment ===
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                value="UPI"
                checked={
                  payment === "UPI"
                }
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              UPI
            </label>

            <label>
              <input
                type="radio"
                value="Card"
                checked={
                  payment === "Card"
                }
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              Card
            </label>

          </div>

          <button className="place-order">
            Place Order ☕
          </button>

        </form>


        <div className="order-summary">

          <h2>
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ₹{total}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;