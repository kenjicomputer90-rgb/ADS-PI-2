import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Produtos } from './pages/produtos';
import { Clientes } from './pages/clientes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* O Layout engloba todas as rotas internas */}
        <Route path="/" element={<Layout />}>
          {/* Rota Raiz (http://localhost:5173) mostra o Estoque */}
          <Route index element={<Produtos />} />
          
          {/* Rota Clientes (http://localhost:5173/clientes) mostra os Clientes */}
          <Route path="clientes" element={<Clientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;