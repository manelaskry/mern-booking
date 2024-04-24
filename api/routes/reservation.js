import express from "express";
const router = express.Router();

import { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservation } from "../controllers/reservation.js";
import { verifyToken } from "../utils/verifyToken.js";


router.post("/createres",verifyToken, createReservation);
//getall
router.get("/", verifyToken, getAllReservations);
//UPDATE
router.put("/:id", verifyToken, updateReservation);
//DELETE
router.delete("/:id", verifyToken, deleteReservation);
//GET
router.get("/:id", verifyToken, getReservationById);

export default router;