import { useState } from "react"
import { useRouter } from "next/router"
import { Pagination } from "antd"

function ProductPagination({ totalDocs, size }) {
  const [current, setCurrent] = useState(1)
  const router = useRouter()
  return (
    <div className='pagination-container'>
      <Pagination
        current={current}
        pageSize={size}
        total={totalDocs}
        onChange={(page) => {
          setCurrent(page)
          page === 1
            ? router.push("/products")
            : router.push(`/products?page=${page}`)
        }}
      />
    </div>
  )
}

export default ProductPagination
