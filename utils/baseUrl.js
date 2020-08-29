const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://vegan-beauty-shop.herokuapp.com"
    : "http://localhost:3000"

export default baseUrl
