import express from "express";
import quizController from "../controllers/quizController.js";

//inicializando express
const router = express.Router();

router.get("/", quizController.pegarperguntas);

export default router;
