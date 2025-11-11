import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

//crinando a aplicação express
const app = express();
app.use(cors());
app.use(express.json());

//pegando a rota
app.use("/api/quiz", quizRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando em ${PORT}`));
