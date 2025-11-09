import "./FollowTreatment.css";

export default function FollowTreatment({
  onBack,
  onFirstAction,
  onSecondAction,
}) {
  return (
    <div className="acompanhar-tratamento">
      <h1>Acompanhamento do tratamento</h1>
      <p className="pcadastro">
        Cadastre e faça check-in de seus medicamentos e registre suas consultas
        para ganhar moedas!
      </p>

      <div>
        <button onClick={onSecondAction}>Fazer Check-in</button>
        <button onClick={onFirstAction}>Registrar consulta</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}
