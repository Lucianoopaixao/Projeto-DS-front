import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import FollowTreatment from "./components/FollowTreatment";
import RegisterAppointment from "./components/RegisterAppointment";
import Check from "./components/Check";
import Inicio from "./components/Inicio";

// Ele verifica se existe o token antes de deixar entrar

const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");

  // Se n�o tiver token, chuta o usu�rio para a tela de Login ("/")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se tiver token, renderiza o conte�do (a Home)
  return children;
};

function SistemaDoJogo() {
  const [tela, setTela] = useState("Introdu��o");
  const [documentAccepted, setDocumentAccepted] = useState(false);

  // Fun��o para DESLOGAR 
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.reload();         
  };

  const renderWrapper = (children) => (
    <div className="inner-wrapper">
      {children}
    </div>
  );

  if (tela === "Introdu��o") {
    return (
      <div className="intro" onClick={() => setTela("In�cio")}>
      </div>
    );
  }

  if (tela === "In�cio") {
    return (
      <Inicio
        irParaQuiz={() => setTela("confirmar-quiz")}
        irParaAcompanhar={() => setTela("acompanhar")}
      />
    );
  }

  if (tela === "confirmar-quiz") {
    return renderWrapper(
      <>
        <h1>Quiz sobre ISTs</h1>
        <p>Você está prestes a iniciar o Quiz sobre ISTs. Deseja continuar?</p>
        <div className="button-row">
          <button onClick={() => setTela("quiz")}>Iniciar</button>
          <button onClick={() => setTela("In�cio")}>Voltar</button>
        </div>
      </>
    );
  }

  if (tela === "quiz") {
    return <Quiz voltarInicio={() => setTela("In�cio")} />;
  }
//acompanhar tratamento
  if (tela === "acompanhar") {
    return (
      <FollowTreatment
        onBack={() => setTela("In�cio")}
        onFirstAction={() => setTela("registrar-consulta")}
        onSecondAction={() => setTela("check")}
      />
    );
  }
//registrar consulta
  if (tela === "registrar-consulta") {
    return <RegisterAppointment onBack={() => setTela("acompanhar")} />;
  }
//parte do check-in
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

//tela de login
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota P�blica: Login */}
        <Route path="/" element={<Login />} />

        {/* Rota P�blica: Cadastro (se existir) */}
        <Route path="/cadastro" element={<div>Cadastro</div>} />

        {/* Rota PROTEGIDA: Home */}
        <Route 
          path="/home" 
          element={
            <RotaProtegida>
              <SistemaDoJogo />
            </RotaProtegida>
          } 
        />
      </Routes>
    </Router>
  );
}