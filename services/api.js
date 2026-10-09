const API_URL = "https://dummyjson.com/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};