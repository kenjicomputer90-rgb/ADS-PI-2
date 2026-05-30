import { Link, Outlet, useLocation } from 'react-router-dom';
import { Shirt, Users } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  // Função simples para destacar o menu da página atual
  const linkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
    ${location.pathname === path 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}
  `;

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* SIDEBAR FIXA */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          {/* Logo / Nome do Sistema */}
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold tracking-wider text-white uppercase">TrajeLoc</h2>
            <p className="text-xs text-zinc-500 mt-1">Painel de Controle v1.0</p>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-2">
            <Link to="/" className={linkClass('/')}>
              <Shirt size={20} />
              Estoque de Trajes
            </Link>
            
            <Link to="/clientes" className={linkClass('/clientes')}>
              <Users size={20} />
              Clientes
            </Link>
          </nav>
        </div>

        <div className="text-xs text-zinc-600 px-2 border-t border-zinc-800 pt-4">
          Conectado em: localhost:3000
        </div>
      </aside>

      {/* CONTEÚDO DINÂMICO DA PÁGINA */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}