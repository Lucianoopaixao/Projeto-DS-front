import { useState, useEffect } from "react";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz({ voltarInicio }) {
  //states (atualizar tela)
  const [questions, setQuestions] = useState([]);
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [fim, setFim] = useState(false);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [carregando, setCarregando] = useState(true);

  //pegando do back
  useEffect(() => {
    fetch("http://localhost:3001/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : [data];

        //transformando as questos  o formato
        const adaptadas = lista.map((q) => ({
          pergunta: q.pergunta,
          alternativas: [
            q.alternativa_a,
            q.alternativa_b,
            q.alternativa_c,
            q.alternativa_d,
          ],
          resposta: q.resposta,
          explicacaocerta: q.explicacaocerta,
          explicacaoerrada: q.explicacaoerrada,
        }));
        setQuestions(adaptadas);
        setCarregando(false);
      })
      .catch((err) => {
        //erro
        console.error("Não buscou o quiz : ", err);
        setCarregando(false);
      });
  }, []);

  //pegarreposta, qd o usuario escolhe uma resposta, checando se acertou e mostrando explicação
  const pegarReposta = (alternativa) => {
    if (alternativa === questions[indice].resposta) {
      setPontuacao((p) => p + 1);
      setAcertou(true);
    } else {
      setAcertou(false);
    }
    setMostrarExplicacao(true);
  };

  //pasando pra prox pergunta
  const proximaPergunta = () => {
    const next = indice + 1;
    if (next < questions.length) {
      setIndice(next);
      setMostrarExplicacao(false);
    } else {
      setFim(true);
    }
  };
  //estados do carregamento
  if (carregando) {
    return (
      <div className="inner-wrapper">
        <h2>Carregando Perguntas...</h2>
      </div>
    );
  }

  //caso tenha acabado
  if (fim) {
    return (
      <div className="inner-wrapper">
        <h1>Fim do Quiz!</h1>
        <p>Suas moedas: {pontuacao} 🪙</p>
        <p>Corretas: {pontuacao}</p>
        <p>Erradas: {questions.length - pontuacao}</p>
        <button className="btn-fim-quiz" onClick={voltarInicio}>
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    //mostrando as moedas
    <div className="inner-wrapper">
      <h1>Quiz sobre ISTs</h1>
      <div>Moedas : {pontuacao} 🪙</div>

      {!mostrarExplicacao ? ( // se mostrar explicacao tiver falso, mostra pergunta
        //se tiver verdadeiro, vai pra tela da explicação
        <Question
          pergunta={questions[indice].pergunta}
          alternativas={questions[indice].alternativas}
          onResposta={pegarReposta}
        />
      ) : (
        <div>
          <h2>
            {acertou ? "Parabéns, você acertou!" : "Que pena, você errou."}
          </h2>
          <div className="explicacao">
            {acertou
              ? questions[indice].explicacaocerta
              : questions[indice].explicacaoerrada}
          </div>
          <button className="btn-quiz" onClick={proximaPergunta}>
            Próxima pergunta
          </button>
        </div>
      )}
    </div>
  );
}
