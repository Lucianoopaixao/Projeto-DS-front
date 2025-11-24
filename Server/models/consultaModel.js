import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registrarConsulta(data) {
  try {
    const nova = await prisma.registro_consulta.create({
      data: {
        ...data,
        data_consulta: new Date(data.data_consulta),
      },
    });
    return nova;
  } catch (erro) {
    console.error("Erro ao registrar consulta:", erro);
    throw erro;
  }
}


async function listarConsultas() {
  try {
    return await prisma.registro_consulta.findMany();
  } catch (erro) {
    console.error("Erro ao listar consultas:", erro);
    throw erro;
  }
}

export default {
  registrarConsulta,
  listarConsultas,
};
