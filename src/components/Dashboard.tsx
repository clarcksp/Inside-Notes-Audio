import React from 'react';
import type { UsuarioTecnico } from '../types';

interface DashboardProps {
  user: UsuarioTecnico;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-primary text-text-primary p-6 flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">Bem-vindo, {user.name}</h1>
        <button
          onClick={onLogout}
          className="bg-danger hover:bg-red-600 text-primary font-semibold py-2 px-4 rounded transition-colors"
          aria-label="Sair da conta"
        >
          Sair
        </button>
      </header>

      <main className="flex-grow bg-secondary rounded-lg p-6 shadow-lg">
        <p className="text-text-secondary">
          Esta é a área principal do aplicativo Inside Notes. Aqui você pode gerenciar suas notas e clientes.
        </p>
        {/* Conteúdo adicional do dashboard pode ser adicionado aqui */}
      </main>
    </div>
  );
};

export default Dashboard;
