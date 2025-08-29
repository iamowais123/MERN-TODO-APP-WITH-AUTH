import { generateToken } from "../config/token.js";
import users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/token.js";

export const register = async (req, res) => {
  console.log('hiii');
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "All inputs are required", success: false, data: null });
  }

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already exists", success: false, data: null });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await users.insertOne({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "user created succesfully", success: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const login = async (req, res) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "details are required", success: false, data: null });
  }

  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "user does not exists", success: false, data: false });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res
        .status(400)
        .json({ message: "incorrect password", success: false, data: null });
    }

    const token = generateToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "succesfully logged in",
      success: true,
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong", success: false, data: null });
  }
};

export const logout = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(404)
      .json({ message: "unauthorised", success: false, data: null });
  }

  res.clearCookie("token");

  return res
    .status(200)
    .json({ message: "logout succesfully", success: true, data: null });
};

export const currentUser = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ message: "user not logged in", success: false, data: null });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const { id } = decoded;

    const user = await users.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false, data: null });
    }

    return res
      .status(200)
      .json({ message: "request succesfull", success: true, data: user });
  } catch (error) {
    
    return res.status(500).json({ message: "invalid token" ,success : false,data : null});
  }
};
