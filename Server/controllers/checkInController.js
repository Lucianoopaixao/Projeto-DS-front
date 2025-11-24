import checkInModel from "../models/checkInModel.js"; 

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
    const { nome, duracao, horarios } = req.body;

  
    if (!nome || !horarios || horarios.length === 0) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // 1. PREPARAR O OBJETO PARA O PRISMA
    // O controller arruma os dados antes de mandar pro Model
    const dadosParaSalvar = {
      usuario_id: 1, 
      nome_medicamento: nome,
      duracao_semanas: parseInt(duracao),
      moedaspcadastro: 5,
      
      // Transforma o array de strings ["08:00"] no formato do Prisma
      horarios: {
        create: horarios.map((horaString) => ({
          dia_semana: "TODOS",
          horario: stringParaData(horaString),
          dose: "1 dose"
        }))
      }
    };

    // 2. CHAMAR O MODEL
    const novoCheckIn = await checkInModel.criarCheckIn(dadosParaSalvar);

    return res.status(201).json(novoCheckIn);

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: "Erro ao salvar medicamento" });
  }
}

async function listarMedicamentos(req, res) {
  try {
    // Chama o Model para buscar a lista
    const lista = await checkInModel.listarCheckIns();
    return res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar" });
  }
}

export default { criarMedicamento, listarMedicamentos };