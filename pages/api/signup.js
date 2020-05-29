import User from "../../models/User"
import Cart from "../../models/Cart"
import connectDb from "../../utils/connectDb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import isLength from "validator/lib/isLength"
import isEmail from "validator/lib/isEmail"

connectDb()

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    //Validate name/email/password
    if (!isLength(name, { min: 3 })) {
      return res
        .status(422)
        .send("Your name must be at least 3 characters long")
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Your password must be at least 6 characters long")
    } else if (!isEmail(email)) {
      return res.status(422).send("Invalid email")
    }
    // Check if user exists
    const user = await User.findOne({ email })

    if (user) {
      return res.status(422).send(`User already exists with the email ${email}`)
    }
    // If not, hash password
    const hash = await bcrypt.hash(password, 10)
    // Create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save()
    // Create cart
    await new Cart({ user: newUser._id }).save()
    // Create token for new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    // Send back token
    res.status(201).json(token)
  } catch (error) {
    res.status(500).send("Error signing up user. Please try again later.")
  }
}
