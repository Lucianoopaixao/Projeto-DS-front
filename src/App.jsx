import "./App.css";
import Quiz from "./components/Quiz";
import FollowTreatment from "./components/FollowTreatment";
import RegisterAppointment from "./components/RegisterAppointment";
import { useState } from "react";
import Check from "./components/Check";

export default function App() {
  const [tela, setTela] = useState("Introdução");
  const [documentAccepted, setDocumentAccepted] = useState(false);

  /*Tela explicativa */
  if (tela === "Introdução") {
    return (
      <div>
        <h1>Saúde em Jogo</h1>
        <p>
          Bem-vindo(a) ao seu portal de cuidado e informação sobre ISTs.
          Acreditamos que cuidar da sua saúde sexual é um ato de protagonismo e
          responsabilidade. Por isso, criamos este espaço seguro e confidencial
          para que você encontre exatamente o que precisa sobre prevenção,
          diagnóstico e tratamento de ISTs, no seu tempo e da sua forma, para
          entender sintomas, avaliar riscos ou receber uma recomendação
          personalizada sobre testagem, comece pelo Quiz. Se você já está em
          tratamento ou fez uma consulta recentemente, seu acesso direto para o
          cuidado é o Acompanhamento do tratamento.
        </p>
        <button onClick={() => setTela("Início")}>Continuar</button>
      </div>
    );
  }

  /*Tela de inicio */
  if (tela === "Início") {
    return (
      <div>
        <h1>Saúde em Jogo</h1>
        <button onClick={() => setTela("inicioquiz")}>Quiz sobre ISTs</button>
        <button onClick={() => setTela("acompanhar")}>Acompanhar tratamento</button>
      </div>
    );
  }

  /*Tela de inicio do quiz */
  if (tela === "inicioquiz") {
    return (
      <div>
        <h1>Saúde em Jogo</h1>
        <button onClick={() => setTela("quiz")}>Iniciar Quiz</button>
        <button onClick={() => setTela("Início")}>Voltar</button>
      </div>
    );
  }

  /*quiz em si*/
  if (tela === "quiz") {
    return <Quiz voltarinicio={() => setTela("Início")} />;
  }

  /*Tela de acompanhamento*/
  if (tela === "acompanhar") {
    return (
      <FollowTreatment
        onBack={() => setTela("Início")}
        onFirstAction={() => setTela("registrar-consulta")}
        onSecondAction={() => setTela("check")}
      />
    );
  }

  /*Tela de registro de consulta*/
  if (tela === "registrar-consulta") {
    return <RegisterAppointment onBack={() => setTela("acompanhar")} />;
  }

  /*Tela de check-in*/
  if (tela === "check") {
    return (
      <Check
        onBack={() => setTela("acompanhar")}
        documentAccepted={documentAccepted}
        setDocumentAccepted={setDocumentAccepted}
      />
    );
  }
}
