import React, { useState, useEffect } from "react"
import StripeCheckout from "react-stripe-checkout"
import { Button, Divider } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import calculateCartTotal from "../../utils/calculateCartTotal"

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = useState(false)
  const [cartAmount, setCartAmount] = useState(0)
  const [stripeAmount, setStripeAmount] = useState(0)

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])

  return (
    <>
      <Divider className='divider' />
      <div className='cart-subtotal'>
        <div>
          <p>
            Sub Total: <strong>€ {cartAmount}</strong>
          </p>
        </div>

        <StripeCheckout
          name='Vegan Beauty Shop'
          amount={stripeAmount}
          image={
            "https://res.cloudinary.com/dvn52rfzx/image/upload/v1589553667/VeganStore/logo-stripe_eagyhz.jpg"
          }
          currency='EUR'
          stripeKey='pk_test_DVLOSHbuJbwybNIpk2EHWcf700jmFlf7ya'
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent='onClick'
        >
          <Button className='button-cart' disabled={isCartEmpty || success}>
            <ShoppingCartOutlined style={{ alignSelf: "center" }} />
            Checkout
          </Button>
        </StripeCheckout>
      </div>
    </>
  )
}

export default CartSummary
