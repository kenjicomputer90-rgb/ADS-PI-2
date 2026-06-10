import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Locacoes } from './pages/locacoes';
import { Processos } from './pages/processos'; 
import { Logistica } from './pages/logistica';
import { Produtos } from './pages/produtos';
import { Clientes } from './pages/clientes';
import { Funcionarios } from './pages/funcionarios';
import { Financeiro } from './pages/financeiro'; // 1. IMPORTAR O NOVO COMPONENTE

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Locacoes />} />
          <Route path="processos" element={<Processos />} />
          <Route path="logistica" element={<Logistica />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="funcionarios" element={<Funcionarios />} />
          
          {/* 2. ADICIONAR A ROTA DO MÓDULO FINANCEIRO */}
          <Route path="financeiro" element={<Financeiro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;