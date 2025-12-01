import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Login.css"; 

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // --- PONTO CRUCIAL DA CONEX√O ---
      // 1. Porta 3001 (Conforme seu servidor)
      // 2. Rota /login (Conforme seu index.js)
      // 3. Envia 'username' e 'password' (Conforme seu controller espera)
      const response = await axios.post("http://localhost:3001/login", {
        username: cpf, 
        password: password 
      });

      // Se o servidor aceitar:
      localStorage.setItem("token", response.data.token); // Salva o token
      navigate("/home"); // Vai para a tela do jogo

    } catch (err) {
      // Se der erro:
      console.error("Erro no login:", err);
      if (err.response) {
        setError(err.response.data.message || "Credenciais inv·lidas.");
      } else {
        setError("Erro de conex„o. O servidor est· rodando?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sa√∫de em Jogo</h2>
    

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Entrando..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;