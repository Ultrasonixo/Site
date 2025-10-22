// src/pages/MinhaConta.jsx (Corrigido)
import React, { useState } from 'react';
// Importa o CSS do Dashboard (que contém os estilos .content-box, .input-group, etc.)
import '../components/Design/DashboardPage.css';

const MinhaConta = () => {
  // Simula dados do usuário (você pegaria do Firebase Auth/Firestore)
  const [nome, setNome] = useState('alexandre de morais');
  const [email, setEmail] = useState('admin12@gmail.com');
  const [telefone, setTelefone] = useState('(00) 00000-0000');
  const [cpf, setCpf] = useState('000.000.000-00');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [infoError, setInfoError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setInfoError(''); // Limpa erros
    console.log("Salvando informações:", { nome, email, telefone, cpf });
    // TODO: Adicionar lógica para salvar no Firestore/Firebase Auth
    // Exemplo: updateUserProfile(auth.currentUser, { displayName: nome }).then(...).catch(...);
    alert('Informações salvas (simulação)!'); // Feedback temporário
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    setSenhaError(''); // Limpa erros

    if (novaSenha !== confirmaSenha) {
      setSenhaError("As novas senhas não coincidem!");
      return;
    }
    if (novaSenha.length < 6) {
        setSenhaError("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }
    console.log("Alterando senha...");
    // TODO: Adicionar lógica para reautenticar e alterar senha no Firebase Auth
    // Exemplo: reauthenticateWithCredential, updatePassword
    alert('Senha alterada (simulação)!'); // Feedback temporário
    // Limpar campos de senha após sucesso (opcional)
    // setSenhaAtual(''); setNovaSenha(''); setConfirmaSenha('');
  };

  return (
    <div className="minha-conta-page"> {/* Wrapper opcional */}
      <div className="dashboard-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Minha Conta</h2>
        <p>Gerencie suas informações pessoais</p>
      </div>

      {/* Box Informações Pessoais */}
      <div className="content-box">
        <h3>Informações Pessoais</h3>
        <form onSubmit={handleInfoSubmit} className="info-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} disabled /> {/* Email geralmente não é editável */}
          </div>
           <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(00) 00000-0000"/>
          </div>
           <div className="input-group">
            <label htmlFor="cpf">CPF/CNPJ</label>
            <input type="text" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00"/>
          </div>
           {infoError && <p className="error-message" style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>{infoError}</p>}
          <div style={{ gridColumn: '1 / -1', textAlign: 'right', marginTop: '1rem' }}>
              {/* CORRIGIDO: Usa btn-accent para Laranja */}
              <button type="submit" className="btn btn-accent">Salvar Alterações</button>
          </div>
        </form>
      </div>

       {/* Box Alterar Senha */}
      <div className="content-box">
        <h3>Alterar Senha</h3>
        <form onSubmit={handleSenhaSubmit} className="password-form" style={{ display: 'grid', gap: '1rem' }}>
           <div className="input-group">
            <label htmlFor="senhaAtual">Senha Atual</label>
            <input type="password" id="senhaAtual" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} required />
          </div>
           <div className="input-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input type="password" id="novaSenha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
          </div>
           <div className="input-group">
            <label htmlFor="confirmaSenha">Confirmar Nova Senha</label>
            <input type="password" id="confirmaSenha" value={confirmaSenha} onChange={e => setConfirmaSenha(e.target.value)} required />
          </div>
           {senhaError && <p className="error-message" style={{ marginTop: '0.5rem' }}>{senhaError}</p>}
           <div style={{ textAlign: 'right', marginTop: '1rem' }}>
              {/* CORRIGIDO: Usa btn-accent para Laranja */}
              <button type="submit" className="btn btn-accent">Alterar Senha</button>
           </div>
        </form>
      </div>
    </div>
  );
};
export default MinhaConta;