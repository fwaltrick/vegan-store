import React from "react"
import axios from "axios"
import ProductsList from "../components/Products/ProductsList"
import baseUrl from "../utils/baseUrl"

function Products({ products }) {
  return <ProductsList products={products} />
}

Products.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  const response = await axios.get(url)
  return { products: response.data }
}

export default Products
