import { useEffect, useState } from "react";

function Admin() {
  const defaultProducts = [
    {
      id: 1,
      name: "Cappuccino",
      category: "Hot Coffee",
      price: 150,
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 2,
      name: "Latte",
      category: "Milk Coffee",
      price: 180,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      id: 3,
      name: "Espresso",
      category: "Hot Coffee",
      price: 120,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
    {
      id: 4,
      name: "Americano",
      category: "Hot Coffee",
      price: 140,
      stock: 22,
      image:
        "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    },
    {
      id: 5,
      name: "Mocha",
      category: "Special Coffee",
      price: 200,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7",
    },
    {
      id: 6,
      name: "Caramel Macchiato",
      category: "Special Coffee",
      price: 190,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2",
    },
    {
      id: 7,
      name: "Cold Brew",
      category: "Cold Coffee",
      price: 160,
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    },
    {
      id: 8,
      name: "Flat White",
      category: "Milk Coffee",
      price: 170,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213",
    },
    {
      id: 9,
      name: "Irish Coffee",
      category: "Special Coffee",
      price: 220,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    },
    {
      id: 10,
      name: "Vanilla Latte",
      category: "Milk Coffee",
      price: 190,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7",
    },
  ];

  /* =========================
     PRODUCT STATE
  ========================= */

  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : defaultProducts;
  });

  /* =========================
     ORDER STATE
  ========================= */

  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  /* =========================
     FORM STATE
  ========================= */

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);

  const [showOrders, setShowOrders] =
    useState(false);

  /* =========================
     SAVE PRODUCTS
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  /* =========================
     SAVE ORDERS
  ========================= */

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      setOrders(savedOrders);
    };

    loadOrders();

    window.addEventListener(
      "storage",
      loadOrders
    );

    window.addEventListener(
      "ordersUpdated",
      loadOrders
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadOrders
      );

      window.removeEventListener(
        "ordersUpdated",
        loadOrders
      );
    };
  }, []);

  /* =========================
     CLEAR FORM
  ========================= */

  const clearForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImage("");
    setEditId(null);
  };

  /* =========================
     ADD COFFEE
  ========================= */

  const addCoffee = () => {
    if (
      !name.trim() ||
      !category.trim() ||
      !price ||
      !stock ||
      !image.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const newCoffee = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      stock: Number(stock),
      image: image.trim(),
    };

    setProducts((prev) => [
      ...prev,
      newCoffee,
    ]);

    alert(
      `${newCoffee.name} added successfully ☕`
    );

    clearForm();
  };

  /* =========================
     EDIT COFFEE
  ========================= */

  const editCoffee = (item) => {
    setEditId(item.id);

    setName(item.name);
    setCategory(item.category);
    setPrice(item.price);
    setStock(item.stock);
    setImage(item.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     UPDATE COFFEE
  ========================= */

  const updateCoffee = () => {
    if (
      !name.trim() ||
      !category.trim() ||
      !price ||
      !stock ||
      !image.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === editId
          ? {
              ...item,
              name: name.trim(),
              category: category.trim(),
              price: Number(price),
              stock: Number(stock),
              image: image.trim(),
            }
          : item
      )
    );

    alert(
      `${name} updated successfully ✏️`
    );

    clearForm();
  };

  /* =========================
     DELETE COFFEE
  ========================= */

  const deleteCoffee = (id) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmDelete) return;

    setProducts((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    if (editId === id) {
      clearForm();
    }

    alert(
      `${product.name} deleted successfully 🗑️`
    );
  };

  /* =========================
     TOTALS
  ========================= */

  const totalStock = products.reduce(
    (sum, item) =>
      sum + Number(item.stock || 0),
    0
  );

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      Number(
        order.total ||
          order.amount ||
          0
      ),
    0
  );

  /* =========================
     JSX
  ========================= */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f3ef",
        padding: "35px",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#3e2723",
              fontSize: "34px",
            }}
          >
            ☕ Coffee Haven
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
            }}
          >
            Admin Dashboard
          </p>
        </div>

        <button
          onClick={() =>
            setShowOrders(!showOrders)
          }
          style={viewOrdersButton}
        >
          📦{" "}
          {showOrders
            ? "Hide Orders"
            : "View Orders"}
        </button>
      </div>

      {/* SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <SummaryCard
          icon="☕"
          title="Total Products"
          value={products.length}
        />

        <SummaryCard
          icon="📦"
          title="Total Stock"
          value={totalStock}
        />

        <SummaryCard
          icon="🛒"
          title="Total Orders"
          value={totalOrders}
        />

        <SummaryCard
          icon="💰"
          title="Revenue"
          value={`₹${totalRevenue}`}
        />

      </div>

      {/* ADD / EDIT FORM */}

      <div
        style={{
          background: "white",
          padding: "28px",
          borderRadius: "18px",
          marginBottom: "30px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.07)",
        }}
      >

        <h2
          style={{
            color: "#3e2723",
            marginTop: 0,
          }}
        >
          {editId
            ? "✏️ Edit Coffee"
            : "➕ Add Coffee"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(5, 1fr)",
            gap: "15px",
          }}
        >

          <input
            placeholder="Coffee Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            style={inputStyle}
          />

        </div>

        {/* IMAGE PREVIEW */}

        {image && (
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                color: "#777",
                marginBottom: "8px",
              }}
            >
              Image Preview
            </p>

            <img
              src={image}
              alt="Preview"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "12px",
                border:
                  "2px solid #eaded3",
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "20px" }}>

          {editId ? (
            <>
              <button
                onClick={updateCoffee}
                style={updateButton}
              >
                ✓ Update Coffee
              </button>

              <button
                onClick={clearForm}
                style={cancelButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addCoffee}
              style={addButton}
            >
              + Add Coffee
            </button>
          )}

        </div>
      </div>

      {/* PRODUCT TABLE */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.07)",
          overflowX: "auto",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#3e2723",
            }}
          >
            ☕ Coffee Products
          </h2>

          <span
            style={{
              background: "#f5eee8",
              color: "#6f4e37",
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {products.length} Products
          </span>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "950px",
          }}
        >

          <thead>
            <tr
              style={{
                background: "#f5f0eb",
              }}
            >
              <th style={thStyle}>
                ID
              </th>

              <th style={thStyle}>
                Image
              </th>

              <th
                style={{
                  ...thStyle,
                  textAlign: "left",
                }}
              >
                Product
              </th>

              <th
                style={{
                  ...thStyle,
                  textAlign: "left",
                }}
              >
                Category
              </th>

              <th style={thStyle}>
                Price
              </th>

              <th style={thStyle}>
                Stock
              </th>

              <th style={thStyle}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {products.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom:
                    "1px solid #eee",
                }}
              >

                <td style={tdStyle}>
                  #{String(item.id).slice(-4)}
                </td>

                <td style={tdStyle}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "58px",
                      height: "58px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </td>

                <td
                  style={{
                    ...tdStyle,
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "#3e2723",
                  }}
                >
                  ☕ {item.name}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    textAlign: "left",
                  }}
                >
                  {item.category}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.price}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        item.stock <= 10
                          ? "#ffe9e9"
                          : "#e8f7ed",
                      color:
                        item.stock <= 10
                          ? "#d32f2f"
                          : "#218838",
                      padding:
                        "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stock <= 10
                      ? "🔴"
                      : "🟢"}{" "}
                    {item.stock}
                  </span>
                </td>

                <td style={tdStyle}>

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      editCoffee(item)
                    }
                    style={editButton}
                  >
                    ✏️ Edit
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      deleteCoffee(item.id)
                    }
                    style={deleteButton}
                  >
                    🗑️ Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* ORDERS */}

      {showOrders && (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            marginTop: "30px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.07)",
            overflowX: "auto",
          }}
        >

          <h2
            style={{
              color: "#3e2723",
              marginTop: 0,
            }}
          >
            📦 Customer Orders
          </h2>

          {orders.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "45px",
                color: "#888",
                background: "#faf7f4",
                borderRadius: "12px",
              }}
            >
              📦 No orders yet
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "750px",
              }}
            >

              <thead>
                <tr
                  style={{
                    background: "#f5f0eb",
                  }}
                >
                  <th style={thStyle}>
                    Order ID
                  </th>

                  <th style={thStyle}>
                    Customer
                  </th>

                  <th style={thStyle}>
                    Product
                  </th>

                  <th style={thStyle}>
                    Amount
                  </th>

                  <th style={thStyle}>
                    Payment
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {orders.map(
                  (order, index) => (
                    <tr
                      key={
                        order.id ||
                        index
                      }
                      style={{
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >

                      <td style={tdStyle}>
                        <b>
                          {order.id ||
                            `ORD${String(
                              index + 1
                            ).padStart(
                              3,
                              "0"
                            )}`}
                        </b>
                      </td>

                      <td style={tdStyle}>
                        👤{" "}
                        {order.customer ||
                          order.name ||
                          "Customer"}
                      </td>

                      <td style={tdStyle}>
                        ☕{" "}
                        {order.coffee ||
                          order.product ||
                          "Coffee"}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          fontWeight:
                            "bold",
                        }}
                      >
                        ₹
                        {order.total ||
                          order.amount ||
                          0}
                      </td>

                      <td style={tdStyle}>
                        {order.paymentMethod ||
                          order.payment ||
                          "Online"}
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            background:
                              "#fff4d9",
                            color:
                              "#a86b00",
                            padding:
                              "6px 12px",
                            borderRadius:
                              "20px",
                            fontWeight:
                              "bold",
                          }}
                        >
                          {order.status ||
                            "Pending"}
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>
          )}

        </div>
      )}

    </div>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  icon,
  title,
  value,
}) {
  return (
    <div style={summaryCard}>
      <div style={summaryIcon}>
        {icon}
      </div>

      <div>
        <p
          style={{
            margin: 0,
            color: "#888",
            fontSize: "14px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "5px 0 0",
            color: "#3e2723",
          }}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const summaryCard = {
  background: "white",
  padding: "22px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow:
    "0 5px 18px rgba(0,0,0,0.06)",
};

const summaryIcon = {
  width: "52px",
  height: "52px",
  borderRadius: "12px",
  background: "#f5eee8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  border: "1px solid #ddd",
  borderRadius: "9px",
  outline: "none",
  fontSize: "14px",
};

const addButton = {
  background: "#6f4e37",
  color: "white",
  border: "none",
  padding: "13px 24px",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "bold",
};

const updateButton = {
  background: "#4e7d52",
  color: "white",
  border: "none",
  padding: "13px 24px",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cancelButton = {
  background: "#eee",
  color: "#555",
  border: "none",
  padding: "13px 24px",
  borderRadius: "9px",
  cursor: "pointer",
  marginLeft: "10px",
};

const viewOrdersButton = {
  background:
    "linear-gradient(135deg,#5d3825,#8b5738)",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const editButton = {
  background: "#fff3dc",
  color: "#8a5a00",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "7px",
};

const deleteButton = {
  background: "#ffe8e8",
  color: "#d32f2f",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const thStyle = {
  padding: "15px 12px",
  color: "#5d4037",
  fontSize: "14px",
  textAlign: "center",
};

const tdStyle = {
  padding: "15px 12px",
  fontSize: "14px",
  textAlign: "center",
};

export default Admin;