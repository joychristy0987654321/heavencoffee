import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const coffees = [
    {
      name: "Cappuccino",
      price: "₹150",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      name: "Latte",
      price: "₹180",
      image:
        "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80",

    },
    {
      name: "Espresso",
      price: "₹120",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
    {
      name: "Americano",
      price: "₹140",
      image:
        "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    },
    {
      name: "Mocha",
      price: "₹200",
      image:
       "https://131337317.cdn6.editmysite.com/uploads/1/3/1/3/131337317/TMC32VQWQAA7X7TKAZVE4NI6.jpeg",


    },
    {
      name: "Caramel Macchiato",
      price: "₹190",
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2",
    },
    {
      name: "Cold Brew",
      price: "₹160",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    },
    {
      name: "Flat White",
      price: "₹170",
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213",
    },
    {
      name: "Irish Coffee",
      price: "₹220",
      image:
          "https://cdn.shopify.com/s/files/1/0274/5932/1958/files/63_600x600.png?v=1687443013",
    },
    {
      name: "Vanilla Latte",
      price: "₹190",
      image:
        "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "#6F4E37",
          color: "white",
        }}
      >
        <h1>☕ Welcome to Coffee Haven</h1>

        <h2>Fresh Coffee, Fresh Start</h2>

        <p>
          Enjoy premium coffee made from the finest beans.
        </p>

        <button
  onClick={() => {
    window.location.href = "/menu";
  }}
  style={{
    padding: "12px 30px",
    marginTop: "15px",
    background: "#fff",
    color: "#6F4E37",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  ☕ Order Now
</button>
        

      </div>

      {/* Featured Coffee */}
      <div style={{ padding: "20px" }}>
        <h2>🔥 Featured Coffees</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
          }}
        >
          {coffees.map((coffee, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
              }}
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h3>{coffee.name}</h3>

              <p>{coffee.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Section */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>🎉 Today's Offer</h2>

        <p>Buy 2 Coffees and Get 1 Free!</p>
      </div>

      {/* About */}
      <div style={{ padding: "20px" }}>
        <h2>About Us</h2>

        <p>
          We serve fresh coffee, cold coffee, espresso,
          cappuccino, latte and more with premium quality.
        </p>
      </div>
    </div>
  );
}

export default Home;

