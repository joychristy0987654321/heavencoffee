function ProductCard({ coffee }) {
  return (
    <div>
      <img src={coffee.image} alt={coffee.name} width="200" />
      <h3>{coffee.name}</h3>
      <p>₹{coffee.price}</p>
      <button>Add To Cart</button>
    </div>
  );
}

export default ProductCard;