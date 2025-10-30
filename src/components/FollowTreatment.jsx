import React from "react";

export default function FollowTreatment({ onBack, onFirstAction, onSecondAction }) {
  return (
    <div className="acompanhar-tratamento">
      <h1>Acompanhamento do tratamento</h1>
      <p> Cadastre e faça check-in de seus medicamentos e registre suas consultas para ganhar moedas!</p>

      <div>
        <button onClick={onSecondAction}>Check-in</button>
        <button onClick={onFirstAction}>Registre sua consulta</button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}