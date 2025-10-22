import React from 'react';
import ReactDOM from 'react-dom/client';
import './firebase'; // <-- ADICIONE ESTA LINHA AQUI NO TOPO
import App from './App.jsx';
import './index.css';

// O main.jsx agora só precisa renderizar o componente App.
// Toda a lógica de rotas e layout ficará dentro do App.jsx.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);