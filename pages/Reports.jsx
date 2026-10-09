
import React, { useEffect, useMemo, useState } from "react";

function Reports() {
  const [orders, setOrders] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // =========================
  // LOAD ORDERS
  // =========================
  const loadOrders = () => {
    try {
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      setOrders(Array.isArray(savedOrders) ? savedOrders : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Orders loading error:", error);
      setOrders([]);
    }
  };

  // =========================
  // REAL-TIME UPDATE
  // =========================
  useEffect(() => {
    loadOrders();

    const updateReports = () => {
      loadOrders();
    };

    window.addEventListener("storage", updateReports);
    window.addEventListener("ordersUpdated", updateReports);

    const timer = setInterval(() => {
      loadOrders();
    }, 3000);

    return () => {
      window.removeEventListener("storage", updateReports);
      window.removeEventListener(
        "ordersUpdated",
        updateReports
      );
      clearInterval(timer);
    };
  }, []);

  // =========================
  // DATE HELPERS
  // =========================
  const getOrderDate = (order) => {
    const value =
      order.createdAt ||
      order.date ||
      order.orderDate ||
      order.created_at;

    if (value) {
      const date = new Date(value);

      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    return null;
  };

  const getAmount = (order) => {
    return Number(
      order.total ||
        order.amount ||
        order.price ||
        order.grandTotal ||
        0
    );
  };

  const isToday = (date) => {
    if (!date) return false;

    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    if (!date) return false;

    const today = new Date();

    const startOfWeek = new Date(today);

    const day = today.getDay();

    const difference = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
      today.getDate() - difference
    );

    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(
      startOfWeek.getDate() + 7
    );

    return (
      date >= startOfWeek &&
      date < endOfWeek
    );
  };

  const isThisMonth = (date) => {
    if (!date) return false;

    const today = new Date();

    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // =========================
  // SALES CALCULATION
  // =========================
  const todaySales = useMemo(() => {
    return orders
      .filter((order) =>
        isToday(getOrderDate(order))
      )
      .reduce(
        (total, order) =>
          total + getAmount(order),
        0
      );
  }, [orders]);

  const weeklySales = useMemo(() => {
    return orders
      .filter((order) =>
        isThisWeek(getOrderDate(order))
      )
      .reduce(
        (total, order) =>
          total + getAmount(order),
        0
      );
  }, [orders]);

  const monthlySales = useMemo(() => {
    return orders
      .filter((order) =>
        isThisMonth(getOrderDate(order))
      )
      .reduce(
        (total, order) =>
          total + getAmount(order),
        0
      );
  }, [orders]);

  // =========================
  // TOTAL ORDERS
  // =========================
  const totalOrders = orders.length;

  // =========================
  // TOTAL CUSTOMERS
  // =========================
  const totalCustomers = useMemo(() => {
    const customerNames = orders
      .map(
        (order) =>
          order.customer ||
          order.customerName ||
          order.email ||
          order.phone
      )
      .filter(Boolean);

    return new Set(customerNames).size;
  }, [orders]);

  // =========================
  // PRODUCT SALES
  // =========================
  const productSales = useMemo(() => {
    const sales = {};

    orders.forEach((order) => {
      let items = [];

      if (Array.isArray(order.items)) {
        items = order.items;
      } else if (Array.isArray(order.products)) {
        items = order.products;
      } else if (order.coffee || order.product || order.name) {
        items = [order];
      }

      items.forEach((item) => {
        const name =
          item.name ||
          item.coffee ||
          item.product ||
          "Coffee";

        const quantity = Number(
          item.quantity || item.qty || 1
        );

        if (!sales[name]) {
          sales[name] = 0;
        }

        sales[name] += quantity;
      });
    });

    return Object.entries(sales)
      .map(([name, quantity]) => ({
        name,
        quantity,
      }))
      .sort(
        (a, b) =>
          b.quantity - a.quantity
      );
  }, [orders]);

  const bestSellingCoffee =
    productSales.length > 0
      ? productSales[0]
      : null;

  const topProducts =
    productSales.slice(0, 5);

  // =========================
  // STATUS
  // =========================
  const completedOrders = orders.filter(
    (order) => {
      const status = String(
        order.status || ""
      ).toLowerCase();

      return (
        status === "delivered" ||
        status === "completed" ||
        status === "success"
      );
    }
  ).length;

  // =========================
  // FORMAT MONEY
  // =========================
  const money = (amount) => {
    return `₹${Number(amount).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <div className="reports-page">

      {/* ================= HEADER ================= */}

      <div className="reports-header">

        <div>
          <div className="title-row">
            <span className="coffee-logo">
              ☕
            </span>

            <div>
              <h1>Sales Reports</h1>

              <p>
                Coffee shop sales and
                performance overview
              </p>
            </div>
          </div>
        </div>

        <div className="live-box">
          <span className="live-dot"></span>

          <div>
            <strong>LIVE</strong>

            <small>
              Updated{" "}
              {lastUpdated.toLocaleTimeString(
                "en-IN"
              )}
            </small>
          </div>

          <button
            onClick={loadOrders}
            title="Refresh"
          >
            🔄
          </button>
        </div>

      </div>

      {/* ================= SALES CARDS ================= */}

      <div className="sales-grid">

        {/* TODAY */}

        <div className="sales-card today">

          <div className="card-top">
            <div className="card-icon">
              💰
            </div>

            <span className="trend">
              📈 Live
            </span>
          </div>

          <p>Today's Sales</p>

          <h2>
            {money(todaySales)}
          </h2>

          <small>
            📈 Today's revenue
          </small>

        </div>

        {/* WEEK */}

        <div className="sales-card week">

          <div className="card-top">
            <div className="card-icon">
              📅
            </div>

            <span className="trend">
              📊 Week
            </span>
          </div>

          <p>Weekly Sales</p>

          <h2>
            {money(weeklySales)}
          </h2>

          <small>
            📊 This week's revenue
          </small>

        </div>

        {/* MONTH */}

        <div className="sales-card month">

          <div className="card-top">
            <div className="card-icon">
              🗓️
            </div>

            <span className="trend">
              📈 Month
            </span>
          </div>

          <p>Monthly Sales</p>

          <h2>
            {money(monthlySales)}
          </h2>

          <small>
            📈 This month's revenue
          </small>

        </div>

        {/* ORDERS */}

        <div className="sales-card orders">

          <div className="card-top">
            <div className="card-icon">
              📦
            </div>

            <span className="trend">
              Live
            </span>
          </div>

          <p>Total Orders</p>

          <h2>
            {totalOrders}
          </h2>

          <small>
            📦 Orders received
          </small>

        </div>

        {/* CUSTOMERS */}

        <div className="sales-card customers">

          <div className="card-top">
            <div className="card-icon">
              👥
            </div>

            <span className="trend">
              Live
            </span>
          </div>

          <p>Total Customers</p>

          <h2>
            {totalCustomers}
          </h2>

          <small>
            👥 Unique customers
          </small>

        </div>

        {/* BEST SELLER */}

        <div className="sales-card best">

          <div className="card-top">
            <div className="card-icon">
              🏆
            </div>

            <span className="trend">
              #1
            </span>
          </div>

          <p>Best Selling Coffee</p>

          <h2 className="best-name">
            {bestSellingCoffee
              ? bestSellingCoffee.name
              : "No Sales Yet"}
          </h2>

          <small>
            🏆 Top performer
          </small>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="summary">

        <div className="summary-item">
          <span>📦</span>

          <div>
            <strong>
              {completedOrders}
            </strong>

            <small>
              Completed Orders
            </small>
          </div>
        </div>

        <div className="summary-item">
          <span>💰</span>

          <div>
            <strong>
              {money(monthlySales)}
            </strong>

            <small>
              This Month
            </small>
          </div>
        </div>

        <div className="summary-item">
          <span>☕</span>

          <div>
            <strong>
              {productSales.length}
            </strong>

            <small>
              Coffee Types Sold
            </small>
          </div>
        </div>

      </div>

      {/* ================= TOP PRODUCTS ================= */}

      <div className="products-section">

        <div className="section-heading">

          <div>
            <h2>
              ☕ Top Selling Products
            </h2>

            <p>
              Best performing coffees
              based on quantity sold
            </p>
          </div>

          <div className="live-label">
            🟢 Real-time
          </div>

        </div>

        {topProducts.length === 0 ? (

          <div className="no-sales">
            <div>☕</div>

            <h3>
              No sales yet
            </h3>

            <p>
              Products will appear here
              when customers place orders.
            </p>
          </div>

        ) : (

          <div className="product-list">

            {topProducts.map(
              (product, index) => {

                const percentage =
                  bestSellingCoffee &&
                  bestSellingCoffee.quantity > 0
                    ? Math.round(
                        (product.quantity /
                          bestSellingCoffee.quantity) *
                          100
                      )
                    : 0;

                return (
                  <div
                    className="product-row"
                    key={product.name}
                  >

                    <div className="rank">
                      {index === 0
                        ? "🏆"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                    </div>

                    <div className="product-icon">
                      ☕
                    </div>

                    <div className="product-info">

                      <div className="product-name">
                        {product.name}
                      </div>

                      <div className="progress-bg">
                        <div
                          className="progress"
                          style={{
                            width:
                              `${percentage}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                    <div className="quantity">
                      <strong>
                        {product.quantity}
                      </strong>

                      <small>
                        sold
                      </small>
                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="report-footer">

        <span>
          ☕ Coffee Haven Reports
        </span>

        <span>
          🟢 Real-time data
        </span>

        <span>
          Orders: {totalOrders}
        </span>

      </div>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .reports-page {
          min-height: 100vh;
          padding: 30px;
          background:
            linear-gradient(
              135deg,
              #f8f1eb,
              #fffaf6
            );
          color: #3b261b;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        /* HEADER */

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .coffee-logo {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #5a3826;
          border-radius: 18px;
          font-size: 30px;
          box-shadow:
            0 8px 20px
            rgba(75, 46, 31, .2);
        }

        .reports-header h1 {
          margin: 0;
          font-size: 30px;
          color: #4a2c1d;
        }

        .reports-header p {
          margin: 6px 0 0;
          color: #8d7869;
        }

        .live-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 15px;
          background: white;
          border: 1px solid #eaded4;
          border-radius: 14px;
          box-shadow:
            0 5px 15px
            rgba(80, 50, 30, .06);
        }

        .live-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #2db36c;
          box-shadow:
            0 0 0 5px
            rgba(45,179,108,.12);
        }

        .live-box strong {
          display: block;
          color: #218b53;
          font-size: 12px;
        }

        .live-box small {
          color: #9b887c;
          font-size: 10px;
        }

        .live-box button {
          border: none;
          background: #f5eee8;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 17px;
        }

        .live-box button:hover {
          transform: rotate(180deg);
        }

        /* SALES CARDS */

        .sales-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 18px;
        }

        .sales-card {
          position: relative;
          overflow: hidden;
          padding: 22px;
          min-height: 190px;
          border-radius: 20px;
          background: white;
          border: 1px solid #eaded4;
          box-shadow:
            0 8px 25px
            rgba(74, 46, 30, .07);
          transition: .25s;
        }

        .sales-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 15px 35px
            rgba(74, 46, 30, .13);
        }

        .sales-card::after {
          content: "";
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          right: -45px;
          bottom: -45px;
          background: #f7eee7;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5e9df;
          border-radius: 14px;
          font-size: 24px;
        }

        .trend {
          padding: 6px 10px;
          border-radius: 20px;
          background: #edf8f1;
          color: #278653;
          font-size: 10px;
          font-weight: bold;
        }

        .sales-card p {
          margin:
            18px 0 4px;
          color: #8d7869;
          font-size: 13px;
        }

        .sales-card h2 {
          margin: 0;
          font-size: 29px;
          color: #4b2d1d;
        }

        .sales-card small {
          display: block;
          margin-top: 9px;
          color: #9d8b7f;
        }

        .best-name {
          font-size: 23px !important;
          max-width: 90%;
        }

        /* SUMMARY */

        .summary {
          margin-top: 20px;
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 15px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          background: white;
          border: 1px solid #eaded4;
          border-radius: 16px;
        }

        .summary-item > span {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4e8de;
          border-radius: 12px;
          font-size: 21px;
        }

        .summary-item strong {
          display: block;
          font-size: 20px;
          color: #4b2d1d;
        }

        .summary-item small {
          color: #988477;
        }

        /* PRODUCTS */

        .products-section {
          margin-top: 22px;
          padding: 25px;
          background: white;
          border: 1px solid #eaded4;
          border-radius: 20px;
          box-shadow:
            0 8px 25px
            rgba(74, 46, 30, .06);
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-heading h2 {
          margin: 0;
          color: #4b2d1d;
        }

        .section-heading p {
          margin: 6px 0 0;
          color: #9a887c;
          font-size: 13px;
        }

        .live-label {
          padding: 8px 12px;
          background: #edf8f1;
          color: #238450;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .product-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: #fffaf6;
          border: 1px solid #eee2d8;
          border-radius: 14px;
          transition: .2s;
        }

        .product-row:hover {
          transform: translateX(4px);
          background: #fff7f0;
        }

        .rank {
          width: 35px;
          text-align: center;
          font-weight: bold;
          color: #8a6a56;
        }

        .product-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0dfd1;
          border-radius: 12px;
          font-size: 22px;
        }

        .product-info {
          flex: 1;
        }

        .product-name {
          font-weight: bold;
          margin-bottom: 8px;
          color: #4c3020;
        }

        .progress-bg {
          height: 7px;
          background: #eee5df;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: #8b5e3c;
          border-radius: 20px;
          transition: width .5s;
        }

        .quantity {
          width: 70px;
          text-align: right;
        }

        .quantity strong {
          display: block;
          font-size: 20px;
          color: #4b2d1d;
        }

        .quantity small {
          color: #9b887c;
        }

        .no-sales {
          text-align: center;
          padding: 45px 20px;
          color: #8d7869;
        }

        .no-sales div {
          font-size: 45px;
        }

        .no-sales h3 {
          color: #4b2d1d;
          margin-bottom: 5px;
        }

        /* FOOTER */

        .report-footer {
          margin-top: 20px;
          padding: 15px 18px;
          display: flex;
          justify-content: space-between;
          background: #4b2d1d;
          color: white;
          border-radius: 14px;
          font-size: 12px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {

          .sales-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .summary {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

        @media (max-width: 650px) {

          .reports-page {
            padding: 15px;
          }

          .reports-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .sales-grid,
          .summary {
            grid-template-columns: 1fr;
          }

          .section-heading {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .report-footer {
            flex-direction: column;
            gap: 8px;
          }

        }

      `}</style>

    </div>
  );
}

export default Reports;

