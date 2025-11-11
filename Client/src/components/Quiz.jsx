import { useState } from "react";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz({ voltarInicio }) {
  const [questions, setQuestions] = useState([]);
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [fim, setFim] = useState(false);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [carregando, setCarregando] = useState(true);

  //pegarreposta, qd o usuario escolhe uma resposta
  const pegarreposta= (alternativa)=> {
    if(alternativa===questions[indice].resposta){
      setPontuacao((p)=> p + 1);
      setAcertou(true);
    }
    else{
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

  if (fim) {
    return (
      <div className="inner-wrapper">
        <h1>Fim do Quiz!</h1>
        <p>Suas moedas: {pontuacao} 🪙</p>
        <p>Corretas: {pontuacao}</p>
        <p>Erradas: {questions.length - pontuacao}</p>
        <button className="btn-secondary" onClick={voltarInicio}>
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="inner-wrapper">
      <h1>Quiz sobre ISTs</h1>
      <div>Moedas : {pontuacao} 🪙</div>
    </div>

    {!mostrarExplicacao ? (
      <Question 
        pergunta={questions[indice].pergunta}
        alternativas={questions[indice].alternativas}
        onResposta={pegarreposta}
        />
    ) : (
      <div>
        <h2>{acertou? "Parabéns, você acertou!" : "Que pena, você errou."}</h2>
        <div className="explicacao">
          {acertou
          ? questions[indice].explicacaocerta
          : questions[indice].explicacaoerrada}
        </div>
        <button className="btn-primary" onClick={proximaPergunta}>Próxima pergunta</button>
      </div>
    )

    )}
  );
}
