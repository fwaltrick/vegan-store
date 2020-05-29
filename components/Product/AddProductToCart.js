import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { InputNumber, Input, Button, message } from "antd"
import {
  ShoppingCartOutlined,
  UserAddOutlined,
  HeartFilled,
} from "@ant-design/icons"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import cookie from "js-cookie"
import catchErrors from "../../utils/catchErrors"

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fail = (error) => {
    message.config({
      top: 65,
      duration: 3,
    })
    message.error(`Ooops! ${error}`)
  }

  const added = () => {
    message.config({
      top: 65,
      duration: 3,
    })
    message.success("Item added!")
  }

  async function handleAddProductToCart() {
    try {
      setLoading(true)
      added()
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const token = cookie.get("token")
      const headers = { headers: { Authorization: token } }
      await axios.put(url, payload, headers)
    } catch (error) {
      catchErrors(error, fail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='product-cart'>
      <Input.Group compact>
        <InputNumber
          min={1}
          onChange={(value) => setQuantity(value)}
          placeholder='1'
          style={{ width: "90px", fontSize: "0.8rem" }}
        />
        {user ? (
          <Button
            className='button-cart'
            disabled={loading}
            loading={loading}
            icon={<ShoppingCartOutlined style={{ alignSelf: "center" }} />}
            onClick={handleAddProductToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <Button
            className='button-purchase'
            icon={<UserAddOutlined style={{ alignSelf: "center" }} />}
            onClick={() => router.push("/signup")}
          >
            Sign In To Buy
          </Button>
        )}
      </Input.Group>
    </div>
  )
}

export default AddProductToCart
