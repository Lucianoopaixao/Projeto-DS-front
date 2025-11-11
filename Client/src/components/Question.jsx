import React from "react";
import "./Quiz.css";

export default function Question({ pergunta, alternativas, onResposta }) {
  return (
    <div className="question-wrapper">
      <h2>{pergunta}</h2>
      <div className="alternativas">
        {alternativas.map((alternativa, index) => (
          <button key={index} onClick={() => onResposta(alternativa)}>
            {alternativa}
          </button>
        ))}
      </div>
    </div>
  );
}
