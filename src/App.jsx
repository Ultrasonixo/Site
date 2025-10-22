import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importe seu CSS global
import './index.css';

// Importe suas páginas e componentes de layout
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlanosPage from './pages/PlanosPage';
import LoginPage from './pages/LoginPage';

// Páginas temporárias para os links de login/registro
const LoginPage = () => (
  <div className="container" style={{ padding: '5rem 1rem', minHeight: '50vh', textAlign: 'center' }}>
    <h1>Página de Login</h1>
    <p>Em construção.</p>
  </div>
);
const RegistroPage = () => (
  <div className="container" style={{ padding: '5rem 1rem', minHeight: '50vh', textAlign: 'center' }}>
    <h1>Página de Registro</h1>
    <p>Em construção.</p>
  </div>
);

function App() {
  return (
    // O BrowserRouter agora vive aqui, envolvendo toda a lógica do App.
    <BrowserRouter>
      {/* Esta div é o container principal do layout do site */}
      <div className="app-layout">
        <Header />
        <main>
          <Routes>
            {/* Definição de todas as suas rotas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/planos" element={<PlanosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegistroPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;