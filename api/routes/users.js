import express from "express";
const router = express.Router();

import { verifyToken } from "../utils/verifyToken.js";



router.get("/checkauth", verifyToken, (req,res,next)=>{
    res.send("hello user, you are logged in")
});



export default router;
