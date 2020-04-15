import { Button, Modal } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import AddProductToCart from "./AddProductToCart"
import Vegan from "../../public/vegan.svg"
import React, { useState } from "react"
import DeleteProduct from "./DeleteProduct"

function ProductSummary({
  name,
  mediaUrl,
  _id,
  price,
  sku,
  description,
  brand,
}) {
  return (
    <div className='product-container'>
      <div className='product-brand'>
        <div className='card-brand product-brand'>{brand}</div>
      </div>

      <div className='product-title'>
        <h2 className='title-secondary'>{name}</h2>
      </div>

      <div className='product-price'>
        <p>€{price}</p>
      </div>
      <div className='product-cart'>
        <AddProductToCart productId={_id} />
      </div>

      <div className='product-img'>
        <img src={mediaUrl} alt={name} />
      </div>

      <div className='product-description'>
        <p> {description}</p>
        <div className='product-group'>
          <DeleteProduct _id={_id} />
          <Vegan className='logo-vegan' />
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
