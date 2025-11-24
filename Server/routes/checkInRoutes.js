import express from "express";
import checkInController from "../controllers/checkInController.js";

const router = express.Router();

// Rota para SALVAR (POST)
router.post("/", checkInController.criarMedicamento);

// Rota para LISTAR (GET) - Para ver se salvou mesmo
router.get("/", checkInController.listarMedicamentos);

export default router;