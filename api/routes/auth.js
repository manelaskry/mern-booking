import express from "express";
const router = express.Router();

import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";


router.post("/register", register);
router.post("/login", login);


router.post("/logout", verifyToken, (req, res) => {
    // Supprimer le cookie contenant le token d'authentification
    res.clearCookie("access_token");

    // Répondre avec un message de déconnexion réussie
    res.status(200).json({ message: "You have been logged out" });
});

export default router;