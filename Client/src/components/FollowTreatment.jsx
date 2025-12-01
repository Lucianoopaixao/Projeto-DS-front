import "./FollowTreatment.css";

export default function FollowTreatment({ onBack, onFirstAction, onSecondAction }) {
  return (
    <div className="inner-wrapper">
      <h1>Acompanhar tratamento</h1>
      <p className="ft-text">
        Cadastre e faça check-in de seus medicamentos e registre suas consultas para ganhar moedas!
      </p>

      <div className="button-row">
        <button className="btn-primary" onClick={onSecondAction}>Fazer Check-in</button>
        <button className="btn-primary" onClick={onFirstAction}>Registrar consulta</button>
      </div>
      <hr className="divisor-fino"/>

      <div className="ft-back">
        <button className="btn-secondary" onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}
