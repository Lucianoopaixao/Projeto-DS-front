import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function criarCheckIn(dadosCheckIn) {
 
  const novoCheckIn = await prisma.check_in.create({
    data: dadosCheckIn,
    include: {
      horarios: true
    }
  });
  return novoCheckIn;
}


async function listarCheckIns() {
  const lista = await prisma.check_in.findMany({
    include: {
      horarios: true 
    },
    orderBy: {
      id: 'desc'
    }
  });
  return lista;
}

export default {
  criarCheckIn,
  listarCheckIns
};