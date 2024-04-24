import express from "express";
const router = express.Router();

import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";


router.post("/register", register);
router.post("/login", login);


router.post("/logout", (req, res) => {
    
    //res.clearCookie("access_token");
    //res.status(200).json({ message: "You have been logged out" });

    res.cookie('token','').json(true);
});

export default router;