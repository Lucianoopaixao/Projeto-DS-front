import consultaModel from "../models/consultaModel.js";

async function cadastrar(req, res) {
  try {
    const nova = await consultaModel.registrarConsulta(req.body);
    res.status(201).json(nova);
  } catch (erro) {
    res.status(500).json({ erro: "Falha ao registrar consulta" });
  }
}

async function listar(req, res) {
  try {
    const consultas = await consultaModel.listarConsultas();
    res.status(200).json(consultas);
  } catch (erro) {
    res.status(500).json({ erro: "Falha ao listar consultas" });
  }
}

export { cadastrar as registrarConsulta, listar };

