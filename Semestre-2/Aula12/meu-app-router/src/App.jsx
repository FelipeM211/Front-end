import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';  // Importando o componente Menu
import Home from './pages/Home';  // Página Home
import Sobre from './pages/Sobre';  // Página Sobre
import Contato from './pages/Contato';  // Página Contato

function App() {
  return (
    <Router>  {/* Define que a navegação será feita utilizando o React Router */}
    {/* O componente <Router> (neste caso, BrowserRouter) envolve a aplicação e 
    gerencia a navegação entre as páginas. Ele habilita a navegação de forma que, 
    ao clicar em um link, a URL é atualizada sem recarregar a página inteira, o 
    que é um dos principais benefícios de usar o React Router em uma SPA. */}
      <div className="min-h-screen bg-gray-50">
        
        {/* O Menu será sempre visível em todas as páginas */}
        <Menu />
        
        {/* Área onde as páginas específicas serão renderizadas */}
        <div className="max-w-4xl mx-auto">
          {/* Define as rotas para as diferentes páginas */}
          <Routes>
          {/* O componente <Routes> é responsável por envolver todas as rotas da 
          aplicação. Dentro dele, você define cada <Route> para mapear um caminho 
          da URL a um componente específico. */}
            {/* Rota para a página Home */}
            <Route path="/" element={<Home />} />
            {/* Cada <Route> define um mapeamento entre o caminho (path) 
            e o componente (element) que será renderizado quando esse caminho for acessado. */}
            {/* Rota para a página Sobre */}
            <Route path="/sobre" element={<Sobre />} />
            {/* Rota para a página Contato */}
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
{/* 
Fluxo de navegação:

Quando o usuário clica em um link no componente Menu (que usa o Link do react-router-dom), 
a URL da barra de navegação é atualizada.

O Router detecta a mudança na URL e verifica se o novo caminho corresponde a 
algum dos caminhos definidos nas rotas.

Se uma rota corresponder, o componente associado àquela rota será renderizado na área 
especificada no código (dentro do <div className="max-w-4xl mx-auto">). 
*/}

export default App;