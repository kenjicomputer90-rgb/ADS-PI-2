import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Produtos } from './pages/produtos';
import { Clientes } from './pages/clientes';
import { Funcionarios } from './pages/funcionarios'; // Importa a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rota do Estoque de Produtos */}
          <Route index element={<Produtos />} />
          
          {/* Rota do Módulo de Clientes */}
          <Route path="clientes" element={<Clientes />} />

          {/* NOVA ROTA DE FUNCIONÁRIOS REGISTRADA AQUI */}
          <Route path="funcionarios" element={<Funcionarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;