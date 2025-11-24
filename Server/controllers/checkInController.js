import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function criarMedicamento(req, res) {
  try {
    const { nome, duracao, horarios } = req.body;

    // Criando respeitando a SUA estrutura
    const novoCheckIn = await prisma.check_in.create({
      data: {
        nome_medicamento: nome,
        duracao_semanas: parseInt(duracao), // Salvamos o número aqui
        moedaspcadastro: 5, // LÓGICA: Vamos dar 5 moedas de prêmio por cadastrar?
        usuario_id: 1,      // Usuário temporário
        
        horarios: {
          create: horarios.map((hora) => ({
            horario: hora,
            dose: "1 dose", // Valor padrão (já que o front não tem campo dose ainda)
            dia_semana: "TODOS" // Valor padrão do Enum
          }))
        }
      },
      include: {
        horarios: true
      }
    });

    return res.status(201).json(novoCheckIn);

  } catch (error) {
    console.error("Erro ao criar check-in:", error);
    return res.status(500).json({ error: "Erro ao salvar medicamento" });
  }
}

export default { criarMedicamento };