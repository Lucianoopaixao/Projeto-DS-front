import { useState } from "react";
import "./RegisterAppointment.css";

export default function RegisterAppointment({ onBack }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      console.log("Imagem selecionada:", selectedImage);
      alert("Comprovante enviado com sucesso!");
    } else {
      alert("Por favor, selecione uma imagem primeiro");
    }
  };

  return (
    <div className="inner-wrapper">
      <h1 className="form-title">Registrar Consulta</h1>
      <p>Envie uma foto do seu comprovante de comparecimento:</p>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />

        {selectedImage && (
          <div className="selected-file">
            <p>Arquivo selecionado: {selectedImage.name}</p>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Enviar Comprovante
        </button>
      </div>

      <div className="actions-footer">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Voltar
        </button>
      </div>
    </div>
  );
}
