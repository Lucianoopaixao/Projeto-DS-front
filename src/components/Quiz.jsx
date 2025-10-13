import { useState } from "react";
import Question from "./Question";

/*exportando e moldando o quizz*/

export default function Quiz({ voltarinicio }) {
  const questions = [
    {
      pergunta: "Qual o método mais eficaz para prevenir a maioria das IST?",
      alternativas: [
        "Pílula contrativa",
        "Coito interrompido",
        "Preservativo",
        "Ducha vaginal",
      ],
      resposta: "Preservativo",
      explicacaocerta:
        "O PRESERVATIVO é realmente o método mais eficaz para prevenir a maioria das ISTs, pois cria uma barreira de proteção que impede o contato com fluidos corporais durante a relação.",
      explicacaoerrada:
        "A resposta correta é PRESERVATIVO, pois eles oferecem a melhor proteção contra a maioria das ISTs.",
    },
    {
      pergunta:
        "Quando não tratadas, as IST podem levar a graves complicações. Qual NÃO é um exemplo de complicação?",
      alternativas: ["Infertilidade", "Câncer", "Morte", "Gripe"],
      resposta: "Gripe",
      explicacaocerta:
        "Algumas IST podem não apresentar sinais e sintomas, e se não forem diagnosticadas e tratadas, podem levar a graves complicações, como INFERTILIDADE, CÂNCER E ATÉ MORTE. Por isso, é importante fazer exames laboratoriais para verificar se houve contato com alguma pessoa que tenha IST, após ter relação sexual desprotegida - sem camisinha masculina ou feminina.",
      explicacaoerrada:
        "A resposta correta é GRIPE. Algumas IST podem não apresentar sinais e sintomas, e se não forem diagnosticadas e tratadas, podem levar a graves complicações, como infertilidade, câncer ou até morte. Por isso, é importante fazer exames laboratoriais para verificar se houve contato com alguma pessoa que tenha IST, após ter relação sexual desprotegida - sem camisinha.",
    },
    {
      pergunta: "Qual é uma das principais manifestações clínicas das IST?",
      alternativas: ["Dor de cabeça", "Dor muscular", "Fadiga", "Corrimentos"],
      resposta: "Corrimentos",
      explicacaocerta:
        "Cada IST apresenta sinais, sintomas e características distintos. São três as principais manifestações clínicas das IST: CORRIMENTOS, FERIDAS E VERRUGAS ANOGENITAIS.",
      explicacaoerrada:
        "A resposta correta é CORRIMENTOS. Cada IST apresenta sinais, sintomas e características distintos. São três as principais manifestações clínicas das IST: corrimentos, feridas e verrugas anogenitais.",
    },
    {
      pergunta: "Qual vacina ajuda a prevenir uma IST?",
      alternativas: [
        "Vacina contra gripe",
        "Vacina contra HPV",
        "Vacina contra sarampo",
        "Vacina contra tétano",
      ],
      resposta: "Vacina contra HPV",
      explicacaocerta:
        "A VACINA CONTRA HPV, realmente ajuda a prevenir uma das ISTs mais comuns, oferecendo proteção contra o vírus e reduzindo o risco de desenvolver doenças graves relacionadas a ele.",
      explicacaoerrada:
        "A resposta correta é VACINA CONTRA HPV, porque ela ajuda a prevenir uma das ISTs mais comuns e que pode causar câncer no colo do útero e em outras regiões do corpo.",
    },
  ];

  const [indicep, setIndicep] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [fimdoquiz, setFimdoquiz] = useState(false);
  const [mostrarexplicacao, setMostrarexplicacao] = useState(false);
  const [acertou, setAcertou] = useState(false);

  /*respondendo*/

  const resposta = (alternativa) => {
    if (alternativa === questions[indicep].resposta) {
      setPontuacao(pontuacao + 1);
      setAcertou(true);
    } else {
      setAcertou(false);
    }
    setMostrarexplicacao(true);
  };
  /*proxima questao*/
  const proximapergunta = () => {
    const nextq = indicep + 1;
    if (nextq < questions.length) {
      setIndicep(nextq);
      setMostrarexplicacao(false);
    } else {
      setFimdoquiz(true);
    }
  };

  /*resultsss*/

  if (fimdoquiz) {
    return (
      <div className="result">
        <h1>End of teste ISTs quizz</h1>
        <p>
          You scored {pontuacao} of {questions.length}
        </p>
        <button onClick={voltarinicio}>Voltar ao início</button>
      </div>
    );
  }

  return (
    <div>
      <p>Moedas: {pontuacao} </p>

      {!mostrarexplicacao ? (
        <Question
          questoes={questions[indicep].pergunta}
          alternativas={questions[indicep].alternativas}
          resposta={resposta}
        />
      ) : (
        <div>
          <h2>
            {acertou ? "Parabéns, você acertou!" : "Que pena, você errou."}
          </h2>
          <p>
            {acertou
              ? questions[indicep].explicacaocerta
              : questions[indicep].explicacaoerrada}
          </p>
          <button onClick={proximapergunta}>Próxima pergunta</button>
        </div>
      )}
    </div>
  );
}
