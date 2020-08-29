import AddProductToCart from "./AddProductToCart"
import Vegan from "../../public/images/vegan.svg"
import React from "react"
import DeleteProduct from "./DeleteProduct"

function ProductSummary({
  name,
  mediaUrl,
  _id,
  price,
  description,
  brand,
  user,
}) {
  const isAdmin = user && user.role === "admin"
  const isRoot = user && user.role === "root"
  const isRootOrAdmin = isRoot || isAdmin

  return (
    <div className='product-container'>
      <div className='product-brand'>
        <div className='card-brand product-brand'>{brand}</div>
      </div>

      <div className='product-title'>
        <h2 className='title-secondary'>{name}</h2>
      </div>

      <div className='product-price'>
        <p>€{price.toFixed(2)}</p>
      </div>
      <div className='product-cart'>
        <AddProductToCart user={user} productId={_id} />
      </div>

      <div className='product-img'>
        <img src={mediaUrl} alt={name} />
      </div>

      <div className='product-description'>
        <p> {description}</p>
        <div className='product-group'>
          {/* Only admin or root are able to delete product */}
          {isRootOrAdmin && <DeleteProduct user={user} _id={_id} />}
          <Vegan className='logo-vegan' />
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
