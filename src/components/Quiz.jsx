import { useState } from "react";
import Question from "./Question";

/*exportando e moldando o quizz*/

export default function Quiz({ voltarinicio }) {
  const questions = [
    {
      pergunta: "Qual dessas ISTs não possui vacina?",
      alternativas: ["Gonorreia", "HPV", "Hepatite B", "Hepatite A"],
      resposta: "Gonorreia",
    },
    {
      pergunta: "Qual dessas práticas não garante a prevenção contra ISTs",
      alternativas: [
        "Usar camisinha em relações íntimas",
        "Não compartilhar seringas",
        "Não compartilhar objetos pessoais",
        "Utilizar métodos comportamentais em relações íntimas",
      ],
      resposta: "Utilizar métodos comportamentais em relações íntimas",
    },
  ];

  const [indicep, setIndicep] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [fimdoquiz, setFimdoquiz] = useState(false);

  /*respondendo*/

  const resposta = (alternativa) => {
    if (alternativa === questions[indicep].resposta) {
      setPontuacao(pontuacao + 1);
    }

    /*proxima questao*/

    const nextq = indicep + 1;
    if (nextq < questions.length) {
      setIndicep(nextq);
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
    <Question
      questoes={questions[indicep].pergunta}
      alternativas={questions[indicep].alternativas}
      resposta={resposta}
    />
  );
}
