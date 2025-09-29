/*exportando*/

export default function Question({ questoes, alternativas, resposta }) {
  return (
    <div className="pergunta">
      <h2>{questoes}</h2>
      <div>
        {alternativas.map((alternativa, a) => (
          <button key={a} onClick={() => resposta(alternativa)}>
            {alternativa}
          </button>
        ))}
      </div>
    </div>
  );
}
