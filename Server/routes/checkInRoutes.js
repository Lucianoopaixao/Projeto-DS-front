import express from "express";
import checkInController from "../controllers/checkInController.js";

const router = express.Router();

router.post("/", checkInController.criarMedicamento);

export default router;