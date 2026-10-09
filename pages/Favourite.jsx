import { useState } from "react";

function Favourite() {
  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: "Cappuccino",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 2,
      name: "Latte",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
  ]);

  const removeFavourite = (id) => {
    setFavourites(
      favourites.filter((item) => item.id !== id)
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>❤️ Favourite Coffees</h1>

      {favourites.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            width="200"
          />

          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>

          <button>Add To Cart</button>

          <button
            onClick={() => removeFavourite(item.id)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favourite;