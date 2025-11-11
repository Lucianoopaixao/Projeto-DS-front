import "./FollowTreatment.css";

export default function FollowTreatment({ onBack, onFirstAction, onSecondAction }) {
  return (
    <div className="inner-wrapper">
      <h1>Acompanhamento do tratamento</h1>
      <p className="ft-text">
        Cadastre e faça check-in de seus medicamentos e registre suas consultas para ganhar moedas!
      </p>

      <div className="button-row">
        <button className="btn btn-primary" onClick={onSecondAction}>Fazer Check-in</button>
        <button className="btn btn-primary" onClick={onFirstAction}>Registrar consulta</button>
      </div>

      <div className="ft-back">
        <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}
