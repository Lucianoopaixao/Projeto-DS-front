import "./App.css";
import { useState } from "react";
import Quiz from "./components/Quiz";
import FollowTreatment from "./components/FollowTreatment";
import RegisterAppointment from "./components/RegisterAppointment";
import Check from "./components/Check";

export default function App() {
  const [tela, setTela] = useState("Introdução");
  const [documentAccepted, setDocumentAccepted] = useState(false);

  const renderWrapper = (children) => (
    <div className="inner-wrapper">{children}</div>
  );

  // Tela de introdução
  if (tela === "Introdução") {
    return <div className="intro" onClick={() => setTela("Início")}></div>;
  }

  // Tela inicial
  if (tela === "Início") {
    return renderWrapper(
      <>
        <h1 className="main-title">Saúde em Jogo</h1>
        <div className="button-row main-buttons">
          <button onClick={() => setTela("confirmar-quiz")}>Quiz sobre ISTs</button>
          <button onClick={() => setTela("acompanhar")}>Acompanhar tratamento</button>
        </div>
      </>
    );
  }

  // Tela de confirmação antes do quiz
  if (tela === "confirmar-quiz") {
    return renderWrapper(
      <>
        <h1>Quiz sobre ISTs</h1>
        <p>Você está prestes a iniciar o Quiz sobre ISTs. Deseja continuar?</p>
        <div className="button-row">
          <button onClick={() => setTela("quiz")}>Iniciar</button>
          <button onClick={() => setTela("Início")}>Voltar</button>
        </div>
      </>
    );
  }

  // Quiz
  if (tela === "quiz") {
    return <Quiz voltarInicio={() => setTela("Início")} />;
  }

  // Acompanhamento
  if (tela === "acompanhar") {
    return (
      <FollowTreatment
        onBack={() => setTela("Início")}
        onFirstAction={() => setTela("registrar-consulta")}
        onSecondAction={() => setTela("check")}
      />
    );
  }

  // Registro de consulta
  if (tela === "registrar-consulta") {
    return <RegisterAppointment onBack={() => setTela("acompanhar")} />;
  }

  // Check-in
  if (tela === "check") {
    return (
      <Check
        onBack={() => setTela("acompanhar")}
        documentAccepted={documentAccepted}
        setDocumentAccepted={setDocumentAccepted}
      />
    );
  }

  return null;
}
