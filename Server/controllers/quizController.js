import quizModel from "../models/quizModel.js";
//receber requisição e puxar do model
async function pegarperguntas(req, res) {
  try {
    //pegamos as questos do banco de dados
    const results = await quizModel.retornarquestoes();

    //enviando
    res.json(results);
  } catch (error) {
    console.error("Não foi possível pegar as questos do model", errormsg);
    return res.status(500).json(errormsg);
  }
}

export default {
  pegarperguntas,
};
