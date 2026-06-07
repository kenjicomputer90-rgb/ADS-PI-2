import { Link, Outlet, useLocation } from 'react-router-dom';
import { Shirt, Users, Briefcase, Calendar, Package, Layers, DollarSign } from 'lucide-react'; // 1. Adicionado DollarSign aqui

export function Layout() {
  const location = useLocation();

  const linkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
    ${location.pathname === path 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}\n  `;

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold tracking-wider text-white uppercase">TrajeLoc</h2>
            <p className="text-xs text-zinc-500 mt-1">Painel de Controle v1.0</p>
          </div>

          <nav className="space-y-2">
            <Link to="/" className={linkClass('/')}>
              <Calendar size={20} />
              Controle de Locações
            </Link>

            <Link to="/processos" className={linkClass('/processos')}>
              <Layers size={20} />
              Processos & Fluxos
            </Link>

            <Link to="/logistica" className={linkClass('/logistica')}>
              <Package size={20} />
              Controle Logístico
            </Link>

            <Link to="/produtos" className={linkClass('/produtos')}>
              <Shirt size={20} />
              Estoque de Trajes
            </Link>
            
            <Link to="/clientes" className={linkClass('/clientes')}>
              <Users size={20} />
              Clientes
            </Link>

            <Link to="/funcionarios" className={linkClass('/funcionarios')}>
              <Briefcase size={20} />
              Funcionários
            </Link>

            {/* ========================================================= */}
            {/* 🟢 NOVO LINK: MÓDULO FINANCEIRO                          */}
            {/* ========================================================= */}
            <Link to="/financeiro" className={linkClass('/financeiro')}>
              <DollarSign size={20} />
              Gestão Financeira
            </Link>
          </nav>
        </div>

        <div className="text-xs text-zinc-600 px-2 border-t border-zinc-800 pt-4">
          Conectado em: localhost:3000
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}