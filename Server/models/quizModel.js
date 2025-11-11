import { PrismaClient } from "@prisma/client";

//no model, teremos a conexao direta (usando o prisma) com o banco de dados.
//prisma
const prisma = new PrismaClient();

//buscando questoes no bando de dados saudeemjogo e retornando
// vou retornar as perguntas

async function retornarquestoes() {
  try {
    const results = await prisma.questoes.findMany();
    return results;
  } catch (error) {
    console.error("Não conseguiu achar questões", error);
  }
}

export default {
  retornarquestoes,
};
