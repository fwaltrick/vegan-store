import Product from "../../models/Product"
import connectDb from "../../utils/connectDb"
import Products from "../products"

connectDb()

export default async (req, res) => {
  const { page, size } = req.query
  const pageNum = Number(page)
  const pageSize = Number(size)
  let products = []
  const totalDocs = await Product.countDocuments()
  // const totalPages = Math.ceil(Number(totalDocs) / pageSize)
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize)
  } else {
    const skips = pageSize * (pageNum - 1)
    products = await Product.find().skip(skips).limit(pageSize)
  }
  // const products = await Product.find().limit(pageSize)
  res.status(200).json({ products, totalDocs, pageSize })
}
