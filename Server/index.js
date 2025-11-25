import express from "express";
import cors from "cors";

//IMPORTANDO ROTAS
import quizRoutes from "./routes/quizRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import checkInRoutes from "./routes/checkInRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true}));

//DEFININDO AS ROTAS
app.use("/api/quiz", quizRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/checkin", checkInRoutes);

const PORT = 3001;

//LIGANDO O SERVIDOR
const server = app.listen(PORT, () => {
    console.log(`Servidor RODANDO ${PORT}`);
    console.log(`Aguardando...`);
});

// Prote��o para n�o fechar sozinho se der erro na porta
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`ERRO: A porta ${PORT} ja esta sendo usada.`);
        console.error(`Digite 'npx kill-port ${PORT}' e tente de novo.`);
    } else {
        console.error("Erro no servidor:", e);
    }
});