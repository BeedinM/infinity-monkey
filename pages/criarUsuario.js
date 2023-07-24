import { useState } from 'react';

export default function CriarUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomeUsuario, email, senha }),
      });

      if (response.status === 201) {
        console.log('Usuário criado com sucesso!');
      
      } else {
        console.error('Erro ao criar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome de Usuário:
        <input
          type="text"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </label>
      <button type="submit">Criar Usuário</button>
    </form>
  );
}