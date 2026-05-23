import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Clientes from './pages/clientes';

// Componentes temporários para páginas secundárias (para você alterar depois)
const Dashboard = () => <div className="text-2xl font-bold">📊 Visão Geral do Sistema (Métricas e Aluguéis Ativos)</div>;
const Produtos = () => <div className="text-2xl font-bold">👗 Catálogo de Roupas de Festa (Vestidos, Ternos, Acessórios)</div>;
const Funcionarios = () => <div className="text-2xl font-bold">💼 Controle de Funcionários e Administradores</div>;
const Financeiro = () => <div className="text-2xl font-bold">💰 Fluxo de Caixa, Receitas de Locação e Multas</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="financeiro" element={<Financeiro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}