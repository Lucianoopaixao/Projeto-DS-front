import { useState } from "react";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz({ voltarInicio }) {
  const questions = [
    {
      pergunta: "Qual o método mais eficaz para prevenir a maioria das ISTs?",
      alternativas: ["Pílula contrativa","Coito interrompido","Preservativo","Ducha vaginal"],
      resposta: "Preservativo",
      explicacaocerta: "O PRESERVATIVO é realmente o método mais eficaz para prevenir a maioria das ISTs, pois cria uma barreira de proteção que impede o contato com fluidos corporais durante a relação.",
      explicacaoerrada: "A resposta correta é PRESERVATIVO, pois eles oferecem a melhor proteção contra a maioria das ISTs."
    },
    {
      pergunta: "Quando não tratadas, as ISTs podem levar a graves complicações. Qual NÃO é um exemplo de complicação?",
      alternativas: ["Infertilidade","Câncer","Morte","Gripe"],
      resposta: "Gripe",
      explicacaocerta: "Algumas ISTs podem não apresentar sinais e sintomas, e se não forem diagnosticadas e tratadas, podem levar a graves complicações, como INFERTILIDADE, CÂNCER E ATÉ MORTE.",
      explicacaoerrada: "A resposta correta é GRIPE. Algumas ISTs podem não apresentar sinais e sintomas, e se não forem diagnosticadas e tratadas, podem levar a graves complicações, como infertilidade, câncer ou até morte."
    },
    {
      pergunta: "Qual é uma das principais manifestações clínicas das ISTs?",
      alternativas: ["Dor de cabeça","Dor muscular","Fadiga","Corrimentos"],
      resposta: "Corrimentos",
      explicacaocerta: "Cada IST apresenta sinais, sintomas e características distintos. São três as principais manifestações clínicas das ISTs: CORRIMENTOS, FERIDAS E VERRUGAS ANOGENITAIS.",
      explicacaoerrada: "A resposta correta é CORRIMENTOS. Cada IST apresenta sinais, sintomas e características distintos. São três as principais manifestações clínicas das ISTs: corrimentos, feridas e verrugas anogenitais."
    },
    {
      pergunta: "Qual vacina ajuda a prevenir uma IST?",
      alternativas: ["Vacina contra gripe","Vacina contra HPV","Vacina contra sarampo","Vacina contra tétano"],
      resposta: "Vacina contra HPV",
      explicacaocerta: "A VACINA CONTRA HPV realmente ajuda a prevenir uma das ISTs mais comuns, oferecendo proteção contra o vírus e reduzindo o risco de desenvolver doenças graves relacionadas a ele.",
      explicacaoerrada: "A resposta correta é VACINA CONTRA HPV, porque ela ajuda a prevenir uma das ISTs mais comuns e que pode causar câncer no colo do útero e em outras regiões do corpo."
    }
  ];

  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [fim, setFim] = useState(false);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [acertou, setAcertou] = useState(false);

  const handleResposta = (alternativa) => {
    if (alternativa === questions[indice].resposta) {
      setPontuacao(pontuacao + 1);
      setAcertou(true);
    } else {
      setAcertou(false);
    }
    setMostrarExplicacao(true);
  };

  const proximaPergunta = () => {
    const next = indice + 1;
    if (next < questions.length) {
      setIndice(next);
      setMostrarExplicacao(false);
    } else {
      setFim(true);
    }
  };

  if (fim) {
    return (
      <div className="inner-wrapper">
        <h1>Fim do Quiz!</h1>
        <p>Suas moedas: {pontuacao} 🪙</p>
        <p>Total de questões: {questions.length}</p>
        <p>Corretas: {pontuacao}</p>
        <p>Erradas: {questions.length - pontuacao}</p>
        <button className="btn-secondary" onClick={voltarInicio}>Voltar ao início</button>
      </div>
    );
  }

  return (
    <div className="inner-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Quiz de ISTs</h1>
        <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Moedas: {pontuacao} 🪙</div>
      </div>

      {!mostrarExplicacao ? (
        <Question
          pergunta={questions[indice].pergunta}
          alternativas={questions[indice].alternativas}
          onResposta={handleResposta}
        />
      ) : (
        <div>
          <h2>{acertou ? "Parabéns, você acertou!" : "Que pena, você errou."}</h2>
          <div className="explicacao">
            {acertou ? questions[indice].explicacaocerta : questions[indice].explicacaoerrada}
          </div>
          <button className="btn-primary" onClick={proximaPergunta}>Próxima pergunta</button>
        </div>
      )}
    </div>
  );
}
