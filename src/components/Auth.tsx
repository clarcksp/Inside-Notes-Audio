import React, { useState } from 'react';
import type { UsuarioTecnico } from '../types';

interface AuthProps {
  onLogin: (user: UsuarioTecnico) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const STANDARD_EMAIL = 'admin@inside.dev.br';
  const STANDARD_PASSWORD = '1234';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      // Check against standard credentials
      if (email === STANDARD_EMAIL && password === STANDARD_PASSWORD) {
        onLogin({
          id: '1',
          email,
          name: 'Administrador Inside',
        });
      } else {
        setError('Credenciais inválidas. Verifique email e senha.');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md"
        aria-label="Formulário de login"
      >
        <h1 className="text-3xl font-bold text-accent mb-6 text-center">Inside Notes</h1>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 bg-danger text-text-primary rounded"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <label htmlFor="email" className="block mb-2 font-semibold text-text-primary">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="admin@inside.dev.br"
          className="w-full p-3 mb-4 rounded border border-border bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          aria-required="true"
        />

        <label htmlFor="password" className="block mb-2 font-semibold text-text-primary">
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="w-full p-3 mb-6 rounded border border-border bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          aria-required="true"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-primary font-bold py-3 rounded transition-colors disabled:opacity-50"
          aria-busy={loading}
        >
          {loading ? 'Autenticando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
