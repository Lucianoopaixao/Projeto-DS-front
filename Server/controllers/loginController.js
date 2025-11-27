//axios pras requisicoes
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//url da api da prefeitura

const API_URL = process.env.API_CONECTA_BASE_URL;

//funcao do login em cin

export const login = async (req, res) => {
  const { username, password } = req.body;

  //try
  try {
    const authResponse = await axios.post(`${API_URL}/api/authenticate`, {
      username,
      password,
      rememberMe: true,
    });

    //depois da tentativa, em teoria, retorna o token

    const externalToken = authResponse.data.id_token;

    //usando o token pra buscar infos do user
    const selfResponse = await axios.get(`${API_URL}/api/self`, {
      headers: { Authorization: `Bearer ${externalToken}` },
    });

    //infos do user

    const { login, name, email } = selfResponse.data;

    //BANCO DE DADOS PRISMA LOCAL

    const localUser = await prisma.user.upsert({
      where: { externalId: login },
      update: {
        name: name, //atualizacao do nome
        email: email,
      },
      create: {
        externalId: login,
        name: name,
        email: email,
      },
    });

    //resposta pro front

    return res.status(200).json({
      token: externalToken, //token api
      userId: localUser.id, //id
      message: "Login bem-sucedido!",
    });
  } catch (error) {
    //se der erro..
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.detail || "Falha na realização do login";

    console.error("Erro durante login: ", errorMessage);
    return res.status(status).json({ message: errorMessage });
  }
};
