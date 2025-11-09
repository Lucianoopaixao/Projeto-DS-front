import { useState } from "react";
import "./Check.css";

export default function Check({ onBack, documentAccepted, setDocumentAccepted }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: "", times: [""], duration: "" });
  const [coins, setCoins] = useState(0);
  const [takenDoses, setTakenDoses] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSendDocument = () => {
    if (!selectedFile) {
      alert("Por favor, selecione um documento antes de enviar.");
      return;
    }
    alert("Documento aceito com sucesso!");
    setDocumentAccepted(true);
  };

  const handleAddTime = () => {
    setNewMedicine({ ...newMedicine, times: [...newMedicine.times, ""] });
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...newMedicine.times];
    updatedTimes[index] = value;
    setNewMedicine({ ...newMedicine, times: updatedTimes });
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.duration || newMedicine.times.some(t => !t)) {
      alert("Preencha todos os campos e horários antes de adicionar!");
      return;
    }
    const medToAdd = {
      ...newMedicine,
      duration: parseInt(newMedicine.duration), 
    };
    setMedicines([...medicines, medToAdd]);
    setNewMedicine({ name: "", times: [""], duration: "" });
  };

  const handleTakeDose = (medName, time) => {
    const key = `${medName}-${time}`;
    if (takenDoses[key]) return;

    const updatedTakenDoses = { ...takenDoses, [key]: true };
    setTakenDoses(updatedTakenDoses);
    setCoins(coins + 1);
    alert(`Dose de ${medName} (${time}) confirmada! +1 moeda 🪙`);

    const med = medicines.find(m => m.name === medName);
    const allTaken = med.times.every(t => updatedTakenDoses[`${medName}-${t}`]);

    if (allTaken) {
      setMedicines(medicines.map(m =>
        m.name === medName ? { ...m, duration: m.duration - 1 } : m
      ));

      const resetDoses = { ...updatedTakenDoses };
      med.times.forEach(t => delete resetDoses[`${medName}-${t}`]);
      setTakenDoses(resetDoses);
    }
  };

  if (!documentAccepted) {
    return (
      <div className="form-wrapper">
        <h1 className="form-title">Check-in de Tratamento</h1>
        <p>Envie o documento de comprovação para continuar:</p>
        <div className="upload-section">
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="file-input" />
          {selectedFile && <div className="selected-file"><p>Arquivo selecionado: {selectedFile.name}</p></div>}
          <button className="btn btn-primary" onClick={handleSendDocument}>Enviar Documento</button>
        </div>
        <div className="actions-footer">
          <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Cadastro de Medicamentos</h1>
      <p>Gerencie seus horários e ganhe moedas ao tomar corretamente!</p>
      <p><strong>Moedas:</strong> {coins} 🪙</p>

      {medicines.length > 0 && (
        <div className="medicines-list">
          <h3>Medicamentos Cadastrados:</h3>
          <ul>
            {medicines.map((med, index) => (
              <li key={index}>
                <strong>{med.name}</strong> — {med.duration} dias
                <ul>
                  {med.times.map((time, i) => {
                    const key = `${med.name}-${time}`;
                    return (
                      <li key={i}>
                        {time}{" "}
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleTakeDose(med.name, time)}
                          disabled={takenDoses[key]}
                        >
                          {takenDoses[key] ? "Tomado" : "Tomar"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-body">
        {medicines.length > 0 && <p><strong>Cadastre um novo medicamento</strong></p>}
        <input
          type="text"
          placeholder="Nome do medicamento"
          value={newMedicine.name}
          onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
          className="text-input"
        />
        {newMedicine.times.map((time, index) => (
          <input
            key={index}
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(index, e.target.value)}
            className="text-input"
          />
        ))}
        <button className="btn btn-secondary" onClick={handleAddTime}>+ Adicionar outro horário</button>
        <input
          type="text"
          placeholder="Duração (em dias)"
          value={newMedicine.duration}
          onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
          className="text-input"
        />
        <button className="btn btn-primary" onClick={handleAddMedicine}>Adicionar Medicamento</button>
      </div>

      <div className="actions-footer">
        <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}
