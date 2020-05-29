import User from "../../models/User"
import connectDb from "../../utils/connectDb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDb()

export default async (req, res) => {
  const { email, password } = req.body
  try {
    // check if user exists
    const user = await User.findOne({ email }).select("+password")
    // if not, return error
    if (!user) {
      return res
        .status(404)
        .send("We couldn't find your account with that email")
    }
    // check if user's passwords matches db
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })
      // send token to client
      res.status(200).json(token)
    } else {
      res.status(401).send("Access denied. Passwords do not match")
    }
  } catch (error) {
    res.status(500).send("Error logging in user")
  }
}
