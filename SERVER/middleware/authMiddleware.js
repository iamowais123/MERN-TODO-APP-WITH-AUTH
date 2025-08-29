import { secretKey } from "../config/token.js";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "user not logged in" });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    const { id } = decoded;

    const user = await users.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "invalid token" });
  }
};

export default checkAuth;
