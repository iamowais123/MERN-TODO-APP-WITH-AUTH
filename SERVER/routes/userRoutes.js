import express from "express";

import { secretKey } from "../config/token.js";
import { currentUser, login, logout, register } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/current", currentUser);

export default router;
