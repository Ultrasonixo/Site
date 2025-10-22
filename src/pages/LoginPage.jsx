import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importações do Firebase (essenciais para a autenticação)
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

// Importar o CSS para estilizar a página
import './Design/LoginPage.css';

// Ícone do Google (SVG como componente React para facilitar)
const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.59L5.84 9.43C6.71 6.87 9.14 5.38 12 5.38z" fill="#EA4335"/>
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  
  // A inicialização do Firebase deve acontecer no seu App.jsx ou num ficheiro de config
  // Esta é uma referência para o serviço de autenticação
  const auth = getAuth();

  // Função para fazer login com E-mail e Senha
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sucesso! Redireciona para a área do cliente/dashboard
      navigate('/dashboard'); 
    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
      console.error(err);
    }
  };

  // Função para fazer login com o Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    try {
      await signInWithPopup(auth, provider);
      // Sucesso! Redireciona para a área do cliente/dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login com o Google.');
      console.error(err);
    }
  };

  return (
    <div className="login-page-background">
      <div className="login-card">
        <h2>Entrar</h2>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <GoogleIcon />
          <span>Entrar com o Google</span>
        </button>

        <div className="divider">
          <span>ou</span>
        </div>

        <form onSubmit={handleEmailLogin}>
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
          
          {error && <p className="error-message">{error}</p>}

          <a href="#" className="forgot-password">Esqueceu a senha?</a>
          
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        
        <div className="signup-link">
          <p>Não tem uma conta? <a href="/registrar">Criar conta</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
