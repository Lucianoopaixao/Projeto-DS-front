import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Função auxiliar para converter string "HH:MM" para objeto Date (exigência do Prisma @db.Time)
function stringParaData(horarioString) {
  const [horas, minutos] = horarioString.split(':');
  const data = new Date();
  data.setHours(parseInt(horas));
  data.setMinutes(parseInt(minutos));
  data.setSeconds(0);
  return data;
}

async function criarMedicamento(req, res) {
  try {
    // O front envia: { nome: "Dipirona", duracao: "2", horarios: ["08:00", "20:00"] }
    const { nome, duracao, horarios } = req.body;

    if (!nome || !horarios || horarios.length === 0) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const novoCheckIn = await prisma.check_in.create({
      data: {
        usuario_id: 1, // Hardcoded por enquanto
        nome_medicamento: nome,
        duracao_semanas: parseInt(duracao),
        moedaspcadastro: 5,
        
        // Graças à alteração que fizemos no schema, isso agora funciona:
        horarios: {
          create: horarios.map((horaString) => ({
            dia_semana: "TODOS", // Deve bater com o ENUM do banco
            horario: stringParaData(horaString), // Converte string para Date
            dose: "1 dose"
          }))
        }
      },
      include: {
        horarios: true // Retorna já com os horários criados
      }
    });

    return res.status(201).json(novoCheckIn);

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: "Erro ao salvar medicamento" });
  }
}

async function listarMedicamentos(req, res) {
  try {
    const lista = await prisma.check_in.findMany({
      include: {
        horarios: true // Traz os horários juntos
      },
      orderBy: {
        id: 'desc'
      }
    });
    return res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar" });
  }
}

export default { criarMedicamento, listarMedicamentos };