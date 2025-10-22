// src/pages/RegistroPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importações do Firebase para criar utilizador
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Importar o CSS (vamos criar este ficheiro a seguir)
import '../components/Design/RegistroPage.css'; // Usaremos um CSS novo, mas semelhante ao Login

const RegistroPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); // Obtém a instância de autenticação do Firebase

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Cria o utilizador com email e senha no Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Sucesso! Redireciona para o dashboard (ou página inicial)
      navigate('/dashboard'); // Ou talvez navigate('/') se não tiver dashboard ainda
    } catch (err) {
      // Trata erros comuns do Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
      console.error(err);
    }
  };

  return (
    <div className="register-page-background">
      <div className="register-card">
        <h2>Criar Conta</h2>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="register-btn">Criar Conta</button>
        </form>

        <div className="login-link">
          <p>Já tem uma conta? <a href="/login">Entrar</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;