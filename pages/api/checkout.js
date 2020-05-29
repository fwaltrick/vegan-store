import Stripe from "stripe"
import uuidv4 from "uuid/v4"
import jwt from "jsonwebtoken"
import Cart from "../../models/Cart"
import Order from "../../models/Order"
import calculateCartTotal from "../../utils/calculateCartTotal"

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { paymentData } = req.body

  try {
    // check and get user id from token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )
    // Get cart based on userId and populate it
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    })
    // Calculate again cart total from cart products
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products)
    // Get email from payment data and check if it's an existing customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    })
    const isExistingCustomer = prevCustomer.data.length > 0
    // If not, create new customer based on email
    let newCustomer
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      })
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id
    // Create charge with total, send mail with receipt
    const charge = await stripe.charges.create(
      {
        currency: "eur",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      },
    )
    // Add order to db
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save()
    // Clear cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } })
    res.status(200).send("Checkout successful")
  } catch (error) {
    console.error(error)
    res.status(500).send("Error processing charge")
  }
}
