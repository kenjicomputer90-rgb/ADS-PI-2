import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Locacoes } from './pages/locacoes';
import { Processos } from './pages/processos'; // Import do novo componente
import { Logistica } from './pages/logistica';
import { Produtos } from './pages/produtos';
import { Clientes } from './pages/clientes';
import { Funcionarios } from './pages/funcionarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Locacoes />} />
          
          {/* Módulo de Inteligência de Processos */}
          <Route path="processos" element={<Processos />} />
          
          <Route path="logistica" element={<Logistica />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="funcionarios" element={<Funcionarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;