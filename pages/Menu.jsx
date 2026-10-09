import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const [coffees] = useState([
    {
      id: 1,
      name: "Cappuccino",
      category: "Hot Coffee",
      price: 150,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 2,
      name: "Latte",
      category: "Hot Coffee",
      price: 180,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      id: 3,
      name: "Espresso",
      category: "Hot Coffee",
      price: 120,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
    {
      id: 4,
      name: "Cold Coffee",
      category: "Cold Coffee",
      price: 170,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    },
    {
      id: 5,
      name: "Americano",
      category: "Hot Coffee",
      price: 140,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    },
    {
      id: 6,
      name: "Mocha",
      category: "Hot Coffee",
      price: 200,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7",
    },
    {
      id: 7,
      name: "Caramel Macchiato",
      category: "Hot Coffee",
      price: 190,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2",
    },
    {
      id: 8,
      name: "Cold Brew",
      category: "Cold Coffee",
      price: 160,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    },
    {
      id: 9,
      name: "Flat White",
      category: "Hot Coffee",
      price: 170,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213",
    },
    {
      id: 10,
      name: "Vanilla Latte",
      category: "Hot Coffee",
      price: 190,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7",
    },
  ]);

  // Add To Cart
  const addToCart = (coffee) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = oldCart.find(
      (item) => item.id === coffee.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = oldCart.map((item) =>
        item.id === coffee.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...coffee,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${coffee.name} added to cart 🛒`);
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#faf7f2",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>☕ Coffee Menu</h1>

        <button
          onClick={() => navigate("/cart")}
          style={{
            padding: "12px 20px",
            background: "#6F4E37",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🛒 View Cart
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "25px",
        }}
      >
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            style={{
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={coffee.image}
              alt={coffee.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2>{coffee.name}</h2>

            <p>{coffee.category}</p>

            <p>⭐ {coffee.rating}</p>

            <h3>₹{coffee.price}</h3>

            <button
              onClick={() => addToCart(coffee)}
              style={{
                padding: "12px 20px",
                background: "#6F4E37",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add To Cart 🛒
            </button>

            <button
              style={{
                marginLeft: "10px",
                padding: "12px 20px",
                background: "white",
                color: "#6F4E37",
                border: "1px solid #6F4E37",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ❤️ Favourite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;