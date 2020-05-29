import React from "react"
import { useRouter } from "next/router"
import axios from "axios"
import ProductsList from "../components/Products/ProductsList"
import ProductsPagination from "../components/Products/ProductPagination"
import baseUrl from "../utils/baseUrl"

function Products({ products, totalDocs, pageSize }) {
  return (
    <div className="products-background">
      <ProductsList products={products} />
      <ProductsPagination totalDocs={totalDocs} size={pageSize} />
    </div>
  )
}

Products.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1"
  const size = 12
  const url = `${baseUrl}/api/products`
  const payload = { params: { page, size } }
  const response = await axios.get(url, payload)
  return response.data
}

export default Products
