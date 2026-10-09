
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cappuccino",
      price: 150,
      stock: 25,
      category: "Hot Coffee",
    },
    {
      id: 2,
      name: "Latte",
      price: 180,
      stock: 18,
      category: "Milk Coffee",
    },
    {
      id: 3,
      name: "Espresso",
      price: 120,
      stock: 4,
      category: "Hot Coffee",
    },
    {
      id: 4,
      name: "Cold Brew",
      price: 160,
      stock: 0,
      category: "Cold Coffee",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Arun",
      coffee: "Cappuccino",
      amount: 150,
      status: "Delivered",
    },
    {
      id: "ORD002",
      customer: "Priya",
      coffee: "Latte",
      amount: 180,
      status: "Preparing",
    },
    {
      id: "ORD003",
      customer: "Rahul",
      coffee: "Espresso",
      amount: 120,
      status: "Pending",
    },
    {
      id: "ORD004",
      customer: "Divya",
      coffee: "Mocha",
      amount: 200,
      status: "Delivered",
    },
    {
      id: "ORD005",
      customer: "Karthik",
      coffee: "Cold Brew",
      amount: 160,
      status: "Delivered",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // LOAD DATA
  const loadDashboard = () => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("products")
      );

      const savedOrders = JSON.parse(
        localStorage.getItem("orders")
      );

      if (Array.isArray(savedProducts)) {
        setProducts(savedProducts);
      }

      if (Array.isArray(savedOrders)) {
        setOrders(savedOrders);
      }
    } catch (error) {
      console.log("Dashboard data error:", error);
    }
  };

  // LIVE UPDATE
  useEffect(() => {
    loadDashboard();

    const update = () => {
      loadDashboard();
    };

    window.addEventListener("storage", update);
    window.addEventListener("productsUpdated", update);
    window.addEventListener("ordersUpdated", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("productsUpdated", update);
      window.removeEventListener("ordersUpdated", update);
    };
  }, []);

  // STATISTICS
  const totalProducts = products.length;

  const totalOrders = orders.length;

  const customers = [
    ...new Set(
      orders
        .map((order) => order.customer)
        .filter(Boolean)
    ),
  ];

  const totalCustomers = customers.length;

  const deliveredOrders = orders.filter(
    (order) =>
      String(order.status).toLowerCase() === "delivered"
  );

  const pendingOrders = orders.filter(
    (order) =>
      String(order.status).toLowerCase() === "pending"
  );

  const preparingOrders = orders.filter(
    (order) =>
      String(order.status).toLowerCase() === "preparing"
  );

  const readyOrders = orders.filter(
    (order) =>
      String(order.status).toLowerCase() === "ready"
  );

  const revenue = deliveredOrders.reduce(
    (total, order) =>
      total +
      Number(order.amount || order.total || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock) > 0 &&
      Number(product.stock) <= 5
  );

  const outOfStockProducts = products.filter(
    (product) =>
      Number(product.stock) === 0
  );

  // FILTER ORDERS
  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            String(order.status).toLowerCase() ===
            activeFilter.toLowerCase()
        );

  // STATUS CLASS
  const statusClass = (status) => {
    const value = String(status).toLowerCase();

    if (value === "delivered") return "delivered";
    if (value === "preparing") return "preparing";
    if (value === "ready") return "ready";

    return "pending";
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="top-header">
        <div>
          <h1>☕ Coffee Shop Dashboard</h1>

          <p>
            Welcome back! Here's your coffee shop overview.
          </p>
        </div>

        <div className="live">
          <span></span>
          LIVE
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="cards">

        <button
          className="card"
          onClick={() => setActiveFilter("All")}
        >
          <div className="icon coffee">☕</div>

          <div>
            <h2>{totalProducts}</h2>
            <h3>Total Products</h3>
            <p>☕ Coffee available</p>
          </div>
        </button>

        <button
          className="card"
          onClick={() => setActiveFilter("All")}
        >
          <div className="icon box">📦</div>

          <div>
            <h2>{totalOrders}</h2>
            <h3>Total Orders</h3>
            <p>📦 Orders received</p>
          </div>
        </button>

        <button
          className="card"
          onClick={() => setActiveFilter("All")}
        >
          <div className="icon people">👥</div>

          <div>
            <h2>{totalCustomers}</h2>
            <h3>Total Customers</h3>
            <p>👥 Active customers</p>
          </div>
        </button>

        <button
          className="card"
          onClick={() => setActiveFilter("Delivered")}
        >
          <div className="icon money">💰</div>

          <div>
            <h2>₹{revenue}</h2>
            <h3>Total Revenue</h3>
            <p>📈 Delivered orders</p>
          </div>
        </button>

        <button
          className="card"
          onClick={() => setActiveFilter("Pending")}
        >
          <div className="icon wait">⏳</div>

          <div>
            <h2>{pendingOrders.length}</h2>
            <h3>Pending Orders</h3>
            <p>⏳ Waiting for processing</p>
          </div>
        </button>

        <button
          className="card"
          onClick={() => setActiveFilter("Delivered")}
        >
          <div className="icon done">✅</div>

          <div>
            <h2>{deliveredOrders.length}</h2>
            <h3>Delivered Orders</h3>
            <p>✅ Successfully delivered</p>
          </div>
        </button>

      </div>

      {/* LIVE ORDER SUMMARY */}
      <div className="summary">

        <div
          className="summary-item"
          onClick={() => setActiveFilter("Pending")}
        >
          <span>⏳</span>

          <div>
            <b>{pendingOrders.length}</b>
            <small>Pending</small>
          </div>
        </div>

        <div
          className="summary-item"
          onClick={() => setActiveFilter("Preparing")}
        >
          <span>👨‍🍳</span>

          <div>
            <b>{preparingOrders.length}</b>
            <small>Preparing</small>
          </div>
        </div>

        <div
          className="summary-item"
          onClick={() => setActiveFilter("Ready")}
        >
          <span>🔔</span>

          <div>
            <b>{readyOrders.length}</b>
            <small>Ready</small>
          </div>
        </div>

        <div
          className="summary-item"
          onClick={() => setActiveFilter("Delivered")}
        >
          <span>✅</span>

          <div>
            <b>{deliveredOrders.length}</b>
            <small>Delivered</small>
          </div>
        </div>

      </div>

      {/* LIVE ORDERS */}
      <div className="section">

        <div className="section-head">

          <div>
            <h2>📦 Live Orders</h2>
            <p>Click an order to view details</p>
          </div>

          <div className="filters">

            {[
              "All",
              "Pending",
              "Preparing",
              "Ready",
              "Delivered",
            ].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}

          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Coffee</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="empty"
                  >
                    📦 No {activeFilter} orders
                  </td>
                </tr>

              ) : (

                filteredOrders.map((order, index) => (

                  <tr
                    key={order.id || index}
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                    className="click-row"
                  >

                    <td>
                      <strong>
                        {order.id ||
                          `ORD00${index + 1}`}
                      </strong>
                    </td>

                    <td>
                      <div className="customer">

                        <div className="avatar">
                          {String(
                            order.customer || "C"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        {order.customer ||
                          "Customer"}

                      </div>
                    </td>

                    <td>
                      ☕{" "}
                      {order.coffee ||
                        order.product ||
                        order.name ||
                        "Coffee"}
                    </td>

                    <td>
                      <strong>
                        ₹
                        {Number(
                          order.amount ||
                            order.total ||
                            0
                        )}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`status ${statusClass(
                          order.status
                        )}`}
                      >
                        {order.status ||
                          "Pending"}
                      </span>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* STOCK */}
      <div className="section">

        <div className="section-head">

          <div>
            <h2>☕ Live Coffee Stock</h2>
            <p>
              Click a coffee to view product details
            </p>
          </div>

        </div>

        <div className="stock-grid">

          {products.map((product) => {

            const stock = Number(
              product.stock || 0
            );

            let stockClass = "good";
            let stockText = "In Stock";

            if (stock === 0) {
              stockClass = "out";
              stockText = "Out of Stock";
            } else if (stock <= 5) {
              stockClass = "low";
              stockText = "Low Stock";
            }

            return (
              <button
                key={product.id}
                className="stock-card"
                onClick={() =>
                  setSelectedProduct(product)
                }
              >

                <div className="coffee-img">
                  ☕
                </div>

                <div className="stock-info">

                  <h3>{product.name}</h3>

                  <p>
                    {product.category ||
                      "Coffee"}
                  </p>

                  <div className="stock-bottom">

                    <strong>
                      {stock} cups
                    </strong>

                    <span
                      className={`stock-status ${stockClass}`}
                    >
                      ● {stockText}
                    </span>

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* ALERTS */}
      <div className="section">

        <div className="section-head">

          <div>
            <h2>🔔 Live Alerts</h2>
            <p>
              Important coffee shop updates
            </p>
          </div>

        </div>

        <div className="alerts">

          {outOfStockProducts.map(
            (product) => (
              <button
                className="alert danger"
                key={product.id}
                onClick={() =>
                  setSelectedProduct(product)
                }
              >
                🔴

                <span>
                  <b>{product.name}</b>

                  <small>
                    Product is out of stock
                  </small>
                </span>

              </button>
            )
          )}

          {lowStockProducts.map(
            (product) => (
              <button
                className="alert warning"
                key={product.id}
                onClick={() =>
                  setSelectedProduct(product)
                }
              >
                🟡

                <span>
                  <b>{product.name}</b>

                  <small>
                    Only {product.stock} cups remaining
                  </small>
                </span>

              </button>
            )
          )}

          {pendingOrders.length > 0 && (
            <button
              className="alert info"
              onClick={() =>
                setActiveFilter("Pending")
              }
            >
              🔔

              <span>
                <b>
                  {pendingOrders.length} pending orders
                </b>

                <small>
                  Click to view pending orders
                </small>
              </span>

            </button>
          )}

          {outOfStockProducts.length === 0 &&
            lowStockProducts.length === 0 &&
            pendingOrders.length === 0 && (
              <div className="no-alert">
                🟢 Everything is running smoothly
              </div>
            )}

        </div>

      </div>

      {/* ORDER MODAL */}
      {selectedOrder && (

        <div
          className="modal-bg"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close"
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              ✕
            </button>

            <h2>📦 Order Details</h2>

            <div className="details">

              <p>
                <b>Order ID:</b>{" "}
                {selectedOrder.id}
              </p>

              <p>
                <b>Customer:</b>{" "}
                {selectedOrder.customer}
              </p>

              <p>
                <b>Coffee:</b>{" "}
                ☕{" "}
                {selectedOrder.coffee ||
                  selectedOrder.product ||
                  selectedOrder.name}
              </p>

              <p>
                <b>Amount:</b> ₹
                {selectedOrder.amount ||
                  selectedOrder.total ||
                  0}
              </p>

              <p>
                <b>Status:</b>{" "}

                <span
                  className={`status ${statusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>

              </p>

            </div>

          </div>

        </div>

      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (

        <div
          className="modal-bg"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            <h2>☕ Product Details</h2>

            <div className="product-detail-icon">
              ☕
            </div>

            <div className="details">

              <p>
                <b>Name:</b>{" "}
                {selectedProduct.name}
              </p>

              <p>
                <b>Category:</b>{" "}
                {selectedProduct.category ||
                  "Coffee"}
              </p>

              <p>
                <b>Price:</b> ₹
                {selectedProduct.price}
              </p>

              <p>
                <b>Stock:</b>{" "}
                {selectedProduct.stock} cups
              </p>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <div className="footer">
        <span>☕ Coffee Haven Admin</span>
        <span>🟢 Dashboard Live</span>
      </div>

      {/* CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .dashboard {
          min-height: 100vh;
          padding: 30px;
          background: #f8f3ed;
          color: #3d281b;
          font-family: Arial, sans-serif;
        }

        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .top-header h1 {
          margin: 0;
          font-size: 30px;
          color: #4b2e1f;
        }

        .top-header p {
          margin: 8px 0 0;
          color: #8c786a;
        }

        .live {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 30px;
          background: #e7f7ed;
          color: #238447;
          font-weight: bold;
        }

        .live span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #28a957;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .card {
          width: 100%;
          border: 1px solid #eaded3;
          background: white;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 17px;
          text-align: left;
          cursor: pointer;
          color: #3d281b;
          box-shadow:
            0 7px 20px rgba(72, 43, 26, .07);
          transition: .2s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 12px 28px rgba(72, 43, 26, .13);
        }

        .icon {
          width: 58px;
          height: 58px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
        }

        .coffee {
          background: #f2e2d4;
        }

        .box {
          background: #e5edf7;
        }

        .people {
          background: #eee4f7;
        }

        .money {
          background: #e3f3e8;
        }

        .wait {
          background: #fff0d5;
        }

        .done {
          background: #e3f4e9;
        }

        .card h2 {
          margin: 0;
          font-size: 27px;
        }

        .card h3 {
          margin: 4px 0;
          font-size: 15px;
        }

        .card p {
          margin: 0;
          color: #978477;
          font-size: 12px;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }

        .summary-item {
          background: white;
          border: 1px solid #eaded3;
          padding: 17px;
          border-radius: 15px;
          display: flex;
          gap: 13px;
          align-items: center;
          cursor: pointer;
          transition: .2s;
        }

        .summary-item:hover {
          background: #fffaf6;
          transform: translateY(-2px);
        }

        .summary-item span {
          font-size: 25px;
        }

        .summary-item b {
          display: block;
          font-size: 21px;
        }

        .summary-item small {
          color: #988477;
        }

        .section {
          background: white;
          border: 1px solid #eaded3;
          border-radius: 19px;
          padding: 23px;
          margin-bottom: 22px;
          box-shadow:
            0 7px 20px rgba(72, 43, 26, .06);
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
        }

        .section-head h2 {
          margin: 0;
          color: #4b2e1f;
        }

        .section-head p {
          margin: 6px 0 0;
          color: #9a8779;
          font-size: 13px;
        }

        .filters {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .filter {
          border: 1px solid #dfd1c5;
          background: white;
          padding: 8px 12px;
          border-radius: 20px;
          cursor: pointer;
          color: #694e3c;
        }

        .filter:hover,
        .filter.active {
          background: #5b3826;
          color: white;
          border-color: #5b3826;
        }

        .table-wrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
        }

        th {
          text-align: left;
          padding: 14px;
          background: #faf6f1;
          color: #725a49;
          font-size: 13px;
        }

        td {
          padding: 15px 14px;
          border-bottom: 1px solid #f0e8e1;
          font-size: 14px;
        }

        .click-row {
          cursor: pointer;
        }

        .click-row:hover {
          background: #fffaf5;
        }

        .customer {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ead8c8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #5b3826;
        }

        .status {
          display: inline-block;
          padding: 6px 11px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .status.delivered {
          background: #e3f5e9;
          color: #208044;
        }

        .status.preparing {
          background: #fff0d3;
          color: #a86b00;
        }

        .status.ready {
          background: #e4edf9;
          color: #28619a;
        }

        .status.pending {
          background: #fde5e5;
          color: #c0392b;
        }

        .stock-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .stock-card {
          border: 1px solid #eaded3;
          background: #fffdfb;
          border-radius: 15px;
          padding: 16px;
          display: flex;
          gap: 14px;
          text-align: left;
          cursor: pointer;
          color: #3d281b;
          transition: .2s;
        }

        .stock-card:hover {
          border-color: #b89b85;
          transform: translateY(-2px);
        }

        .coffee-img {
          width: 54px;
          height: 54px;
          border-radius: 13px;
          background: #f2e2d4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }

        /* FIXED */
        .stock-info {
          flex: 1;
        }

        .stock-info h3 {
          margin: 0;
        }

        .stock-info p {
          margin: 4px 0 10px;
          color: #9a8779;
          font-size: 12px;
        }

        .stock-bottom {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .stock-status {
          font-size: 11px;
          font-weight: bold;
        }

        .stock-status.good {
          color: #258649;
        }

        .stock-status.low {
          color: #b27600;
        }

        .stock-status.out {
          color: #c0392b;
        }

        .alerts {
          display: grid;
          gap: 10px;
        }

        .alert {
          border: none;
          padding: 15px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          cursor: pointer;
        }

        .alert span {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .alert small {
          color: #76665b;
        }

        .alert.danger {
          background: #fff0f0;
        }

        .alert.warning {
          background: #fff7e7;
        }

        .alert.info {
          background: #edf5ff;
        }

        .alert:hover {
          filter: brightness(.97);
        }

        .no-alert {
          padding: 18px;
          background: #eaf8ef;
          color: #287a45;
          border-radius: 12px;
        }

        .empty {
          text-align: center;
          padding: 35px;
          color: #9a8779;
        }

        .modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(38, 24, 16, .55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          width: min(440px, 100%);
          background: white;
          border-radius: 20px;
          padding: 28px;
          position: relative;
          box-shadow:
            0 20px 60px rgba(0,0,0,.25);
        }

        .modal h2 {
          margin-top: 0;
          color: #4b2e1f;
        }

        .close {
          position: absolute;
          right: 16px;
          top: 16px;
          border: none;
          background: #f4eee8;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }

        .details {
          line-height: 1.8;
          color: #604a3a;
        }

        .product-detail-icon {
          width: 75px;
          height: 75px;
          border-radius: 18px;
          background: #f2e2d4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin-bottom: 15px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          color: #99877a;
          font-size: 13px;
          padding: 5px;
        }

        @media (max-width: 950px) {

          .cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .summary {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 650px) {

          .dashboard {
            padding: 17px;
          }

          .top-header {
            align-items: flex-start;
          }

          .top-header h1 {
            font-size: 22px;
          }

          .cards,
          .summary,
          .stock-grid {
            grid-template-columns: 1fr;
          }

          .section-head {
            align-items: flex-start;
            flex-direction: column;
          }

        }

      `}</style>

    </div>
  );
}

export default Dashboard;

