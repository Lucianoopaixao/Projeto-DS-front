import "./Inicio.css";
import quizImg from "../assets/Medicine-cuate.svg";
import tratamentoImg from "../assets/Medicine-amico.svg";

export default function Inicio({ irParaQuiz, irParaAcompanhar }) {
  return (
    <div className="inicio-wrapper">
      <h1 className="inicio-title">Saúde em Jogo</h1>

      <div className="inicio-images-row">
        <img src={quizImg} className="inicio-img" alt="quiz" />
        <img src={tratamentoImg} className="inicio-img" alt="tratamento" />
      </div>

      <div className="inicio-buttons-row">
        <button onClick={irParaQuiz}>Quiz sobre ISTs</button>
        <button onClick={irParaAcompanhar}>Acompanhar tratamento</button>
      </div>
    </div>
  );
}
