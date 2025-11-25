import express from "express";

import { registrarConsulta } from "../controllers/consultaController.js";
import { listar } from "../controllers/consultaController.js";


const router = express.Router();

router.post("/registrar-consulta", registrarConsulta);

router.get("/", listar);

export default router;
