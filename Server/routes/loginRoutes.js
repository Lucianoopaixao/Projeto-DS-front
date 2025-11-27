//rota do login
//inicilizando as coisas do servidor express
import express from "express";
import { login } from "../controllers/loginController.js";
const router = express.Router();

//POST
router.post("/", login);

export default router;
