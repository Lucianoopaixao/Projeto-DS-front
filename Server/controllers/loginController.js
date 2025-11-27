import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { URLSearchParams } from "url";

const AUTHO_URL = process.env.AUTHO_BASE_URL;
const API_URL = process.env.API_CONECTA_BASE_URL;
const clientId = "app-recife"; //cliente fixo app recife

export const login = async (req, res) => {
  const { username, password } = req.body; //pegando os dados do front

  // NUNCA logar senha em produção; aqui é só debug temporário:
  const maskedPassword = password ? password.replace(/./g, "*") : ""; //transformar senha em secre

  console.log(
    `Tentativa de login com credenciais username=${username} password=${maskedPassword}` //mensagem de tentativa de login
  );

  try {
    const params = new URLSearchParams({
      //corpo da requisicao
      grant_type: "password",
      client_id: clientId,
      username,
      password,
    });

    console.log(
      "Codigo da tentativa de login:",
      params.toString().slice(0, 200)
    );

    const tokenUrl = `${AUTHO_URL}/protocol/openid-connect/token`; //pegando o tolken
    const authResponse = await axios.post(tokenUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000, //requisicao do token com tempo limite
    });

    const externalToken = authResponse.data.access_token; //token recebido!
    if (!externalToken) {
      console.error("Nenhum token retornado:", authResponse.data); //n retornou nenum token
      return res.status(500).json({ message: "Token não retornado" });
    }

    //Obtendo as informacoes atraves do toki
    const selfResponse = await axios.get(`${API_URL}/api/self`, {
      headers: { Authorization: `Bearer ${externalToken}` },
    });

    //Banco de dados prisma
    const self = selfResponse.data;

    const externalId = self.document;
    const name = self.name;
    const email = self.email;

    if (!externalId) {
      console.error(
        "ERRO: Nenhum identificador único encontrado no self:",
        self
      );
      return res
        .status(500)
        .json({ message: "Não foi possível identificar o usuário" });
    }

    const localUser = await prisma.user.upsert({
      where: { externalId },
      update: { name, email },
      create: { externalId, name, email },
    });

    return res
      .status(200)
      .json({ token: externalToken, message: "Login bem-sucedido" }); //deu tudo certo
  } catch (error) {
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error_description ||
      error.response?.data?.detail ||
      error.message ||
      "Falha na realização do login"; //deu tudo errado

    return res.status(status).json({ message: errorMessage });
  }
};
