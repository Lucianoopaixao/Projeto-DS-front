import { useState } from "react";
import Question from "./Question";

/*exportando e moldando o quizz*/
//////////////ATENCAO, BOTEI AS PERGUNTAS NUM BANCO DE DADOS. TEM QUE MUDAR O JEITO QUE ESTA PARA O FRONT FAZER A REQUISIÇÃO

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
    {
      pergunta:
        "Qual das alternativas abaixo NÃO é uma forma de transmissão da HIV:",
      alternativas: [
        "Um beijo ou abraço com uma pessoa contaminada",
        "Compartilhamento de agulhas",
        "Relação sexual desprotegida",
        "Na gestação, parto ou amamentação de uma pessoa contaminada",
      ],
      resposta: "Na gestação, parto ou amamentação de uma pessoa contaminada",
      explicacaocerta:
        "Para acontecer a transmissão, o fluido corporal contaminado (sangue, esperma, secreção vaginal e leite materno) de uma pessoa tem que penetrar no organismo da outra. NÃO há risco de transmissão em um BEIJO OU ABRAÇO COM UMA PESSOA CONTAMINADA se não houver essa troca de fluidos.",
      explicacaoerrada:
        "A resposta correta é UM BEIJO OU ABRAÇO COM UMA PESSOA CONTAMINADA. Para acontecer a transmissão, o fluido corporal contaminado (sangue, esperma, secreção vaginal e leite materno) de uma pessoa tem que penetrar no organismo da outra. NÃO há risco de transmissão em UM BEIJO OU ABRAÇO COM UMA PESSOA CONTAMINADA se não houver essa troca de fluidos.",
    },
    {
      pergunta: "Sobre o diagnóstico de ISTs, marque a alternativa CORRETA:",
      alternativas: [
        "Não há necessidade de fazer testes com regularidade, mesmo tendo passado por uma situação de risco.",
        "Não existe cura para as ISTs.",
        "Algumas ISTs podem ser curadas.",
        "Todos os testes de ISTs são pagos.",
      ],
      resposta: "Algumas ISTs podem ser curadas.",
      explicacaocerta:
        "Testes regulares após passar por uma situação de risco (como uma relação sexual desprotegida) são essenciais para se ter um diagnóstico precoce, o qual permite um tratamento eficaz. ALGUMAS ISTS PODEM SER CURADAS se tratadas IMEDIATAMENTE e CORRETAMENTE, seguindo orientações médicas. Alguns exemplos de infecções curáveis são: sífilis, gonorreia, clamídia e tricomoníase. Além disso, os testes podem ser realizados GRATUITAMENTE pelo SUS.",
      explicacaoerrada:
        "A resposta correta é ALGUMAS ISTS PODEM SER CURADAS. Se o paciente iniciar o tratamento IMEDIATAMENTE e SEGUIR TODAS AS ORIENTAÇÕES MÉDICAS, infecções como sífilis, gonorreia, clamídia e tricomoníase podem ser curadas. Testes regulares após passar por uma situação de risco (como uma relação sexual desprotegida) são essenciais para se ter um diagnóstico precoce, o qual permite um tratamento eficaz, e esses testes podem ser realizados GRATUITAMENTE pelo SUS.",
    },
    {
      pergunta:
        "Uma característica perigosa de muitas ISTs, como a Clamídia e a Gonorreia em estágios iniciais, é que elas podem ser:",
      alternativas: [
        "Transmitidas apenas por fluidos sanguíneos",
        "Incuráveis mesmo com tratamento antibiótico",
        "Prevenidas com a vacina contra o HPV",
        "Assintomáticas na maioria das pessoas, especialmente em mulheres",
      ],
      resposta:
        "Assintomáticas na maioria das pessoas, especialmente em mulheres",
      explicacaocerta:
        "O fato de muitas ISTs NÃO APRESENTAREM SINTOMAS CLAROS INICIALMENTE leva à falta de diagnóstico e tratamento, permitindo que a infecção avance e seja transmitida.",
      explicacaoerrada:
        "A resposta correta é ASSINTOMÁTICAS NA MAIORIA DAS PESSOAS, ESPECIALMENTE MULHERES. O fato de muitas ISTs não apresentarem sintomas claros inicialmente leva à falta de diagnóstico e tratamento, permitindo que a infecção avance e seja transmitida.",
    },
    {
      pergunta:
        "Qual sintoma é comumente associado à Gonorreia e à Clamídia, especialmente em homens?",
      alternativas: [
        "Bolhas ou feridas dolorosas no genital.",
        "Manchas avermelhadas indolores no corpo.",
        "Corrimento uretral (peniano) e dor ao urinar (disúria).",
        "Verrugas na região genital.",
      ],
      resposta: "Corrimento uretral (peniano) e dor ao urinar (disúria).",
      explicacaocerta:
        "Tanto a Gonorreia quanto a Clamídia causam inflamação da uretra (uretrite), resultando em secreção (corrimento) e dor ao urinar em muitos casos.",
      explicacaoerrada:
        "A resposta correta é CORRIMENTO URETRAL (PENIANO) E DOR AO URINAR (DISÚRIA). Tanto a Gonorreia quanto a Clamídia causam inflamação da uretra (uretrite), resultando em secreção (corrimento) e dor ao urinar em muitos casos.",
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
        <h1>Fim do Quiz!</h1>
        <p>Suas moedas: {pontuacao}</p>
        <p>100% concluído!</p>
        <p>Total de Questões: {questions.length}</p>
        <p>Questões corretas: {pontuacao}</p>
        <p>Questões erradas: {questions.length - pontuacao}</p>
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
