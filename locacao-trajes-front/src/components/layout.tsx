import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Users, Shirt, UserCheck, DollarSign, LayoutDashboard } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/produtos', label: 'Produtos (Trajes)', icon: Shirt },
    { path: '/funcionarios', label: 'Funcionários', icon: UserCheck },
    { path: '/financeiro', label: 'Financeiro', icon: DollarSign },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-5 text-xl font-bold tracking-wider border-b border-indigo-800">
          👗 LocaTraje ADS
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-700 text-white font-medium' : 'text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-indigo-800 text-xs text-indigo-300 text-center">
          Painel Administrativo v1.0
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}