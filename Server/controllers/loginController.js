import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { URLSearchParams } from "url";

const AUTHO_URL = process.env.AUTHO_BASE_URL;
const API_URL = process.env.API_CONECTA_BASE_URL;
const clientId = "app-recife"; // cliente fixo app recife

export const login = async (req, res) => {
  const { username, password } = req.body; // pegando os dados do front

  // Mascarar senha para não aparecer no log
  const maskedPassword = password ? password.replace(/./g, "*") : ""; 

  console.log(
    `Tentativa de login com credenciais username=${username} password=${maskedPassword}`
  );

  try {
    const params = new URLSearchParams({
      grant_type: "password",
      client_id: clientId,
      username,
      password,
    });

    console.log(
      "Codigo da tentativa de login:",
      params.toString().slice(0, 200)
    );

    const tokenUrl = `${AUTHO_URL}/protocol/openid-connect/token`; // pegando o token
    
    // Tenta pegar o token no servidor externo
    const authResponse = await axios.post(tokenUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000, 
    });

    const externalToken = authResponse.data.access_token; 
    if (!externalToken) {
      console.error("Nenhum token retornado:", authResponse.data);
      return res.status(500).json({ message: "Token não retornado" });
    }

    // Obtendo as informacoes do usuário
    const selfResponse = await axios.get(`${API_URL}/api/self`, {
      headers: { Authorization: `Bearer ${externalToken}` },
    });

    const self = selfResponse.data;
    const externalId = self.document;
    const name = self.name;
    const email = self.email;
    const document = self.document;

    if (!externalId) {
      console.error("ERRO: Nenhum identificador único encontrado no self:", self);
      return res.status(500).json({ message: "Não foi possível identificar o usuário" });
    }

    // Salva ou atualiza no banco local (Prisma)
    const localUser = await prisma.user.upsert({
      where: { externalId },
      update: { name, email, document },
      create: { externalId, name, email, document },
    });

    // Deu tudo certo!
    return res.status(200).json({ token: externalToken, message: "Login bem-sucedido" }); 

  } catch (error) {
    
    // AQUI ESTÁ O CÓDIGO NOVO PARA DESCOBRIR O ERRO

    console.log("ERRO DETALHADO DA API EXTERNA:");
    
    if (error.response) {
        // O servidor externo respondeu "Não" (ex: senha errada)
        console.log("Status:", error.response.status);
        console.log("Motivo:", error.response.data);
    } else {
        // O servidor nem respondeu
        console.log("Erro sem resposta (timeout ou link errado):", error.message);
    }
   

    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error_description ||
      error.response?.data?.detail ||
      error.message ||
      "Falha na realização do login";

    return res.status(status).json({ message: errorMessage });
  }
};