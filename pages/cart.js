import React, { useState } from "react"
import { message, Spin } from "antd"
import CartItemList from "./../components/Cart/CartItemList"
import CartSummary from "./../components/Cart/CartSummary"
import { parseCookies } from "nookies"
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import catchErrors from "../utils/catchErrors"
import cookie from "js-cookie"

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const fail = (error) => {
    message.config({
      top: 65,
      duration: 4,
    })
    message.error(`Ooops! ${error}`)
  }

  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cart`
    const token = cookie.get("token")
    const payload = {
      params: { productId },
      headers: { Authorization: token },
    }
    const response = await axios.delete(url, payload)
    setCartProducts(response.data)
  }

  async function handleCheckout(paymentData) {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get("token")
      const payload = { paymentData }
      const headers = { headers: { Authorization: token } }
      await axios.post(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      catchErrors(error, fail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='background-shape background-shape--violet'>
      <div className='container'>
        <Spin spinning={loading}>
          <CartItemList
            success={success}
            handleRemoveFromCart={handleRemoveFromCart}
            products={cartProducts}
            user={user}
          />
          <CartSummary
            success={success}
            handleCheckout={handleCheckout}
            products={cartProducts}
          />
        </Spin>
      </div>
    </div>
  )
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { products: [] }
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token } }
  const response = await axios.get(url, payload)
  return { products: response.data }
}

export default Cart
