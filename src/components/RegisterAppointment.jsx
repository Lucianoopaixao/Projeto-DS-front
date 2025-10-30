import React, { useState } from "react";

export default function RegisterAppointment({ onBack }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      // Aqui você pode adicionar a lógica para enviar a imagem
      console.log("Imagem selecionada:", selectedImage);
      // Exemplo: criar FormData e enviar para API
      alert("Comprovante enviado com sucesso!");
    } else {
      alert("Por favor, selecione uma imagem primeiro");
    }
  };

  return (
    <div className="register-appointment">
            <h1 style={{ fontSize: "1.5rem" }}>Registrar Consulta</h1>
      <p>Envie uma foto do seu comprovante de comparecimento:</p>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "1rem" }}
        />
        
        {selectedImage && (
          <div style={{ margin: "1rem 0" }}>
            <p>Arquivo selecionado: {selectedImage.name}</p>
          </div>
        )}

        <button 
          onClick={handleSubmit}
          style={{ 
            backgroundColor: "#445da9ff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Enviar Comprovante
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}