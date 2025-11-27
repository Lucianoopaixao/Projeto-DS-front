//rota do login
//inicilizando as coisas do servidor express
import express from "express";
import loginController from "../controllers/loginController.js";
const router = express.Router();

//POST
router.post("/", loginController.login);

export default router;
