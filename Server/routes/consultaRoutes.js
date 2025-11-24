import express from "express";
import { registrarConsulta } from "../controllers/consultaController.js";

const router = express.Router();

router.post("/registrar-consulta", registrarConsulta);

export default router;
