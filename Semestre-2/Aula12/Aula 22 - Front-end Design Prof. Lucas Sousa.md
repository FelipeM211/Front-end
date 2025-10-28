# React Router - Navegação Simples com Vite

## Objetivo da Aula

Aprender a criar navegação entre páginas em React usando React Router de forma simples e prática.

## Passo 1: Criar o Projeto

Primeiro, crie um novo projeto React usando o Vite. Abra seu terminal e execute o seguinte comando:

```bash
npm create vite@latest meu-app-router
cd meu-app-router
npm install
```

Instale o React Router:

```bash
npm install react-router-dom
```

Agora configure o Tailwind CSS. Abra seu terminal na raiz do projeto e instale as dependências:

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure os Arquivos do Tailwind. Edite `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

No `src/index.css` (ou `App.css`):

```css
@import "tailwindcss";
```

## Passo 2: Criar as Páginas

### `Home.jsx`

```jsx
// src/pages/Home.jsx
function Home() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Página Inicial
      </h1>
      <p className="text-lg text-gray-600">
        Bem-vindo ao meu primeiro app com React Router!
      </p>
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">O que você encontra aqui:</h2>
        <ul className="text-left space-y-2">
          <li>✅ Navegação simples</li>
          <li>✅ Múltiplas páginas</li>
          <li>✅ React Router</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
```

### `Sobre.jsx`

```jsx
// src/pages/Sobre.jsx
function Sobre() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Sobre Nós
      </h1>
      <div className="max-w-2xl">
        <p className="text-lg text-gray-700 mb-4">
          Este é um projeto simples para demonstrar o uso do React Router.
        </p>
        <p className="text-gray-600 mb-6">
          Aqui você pode aprender como navegar entre diferentes páginas
          sem recarregar o navegador.
        </p>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Tecnologias Usadas:
          </h2>
          <ul className="space-y-2 text-green-700">
            <li>• React 18</li>
            <li>• Vite</li>
            <li>• React Router</li>
            <li>• Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
```

### `Contato.jsx`

```jsx
// src/pages/Contato.jsx
import { useState } from 'react';

function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado, ${nome}! Mensagem enviada.`);
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Contato
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nome:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Seu nome"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Mensagem:
          </label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Sua mensagem..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}

export default Contato;
```

## Passo 3: Criar o Menu de Navegação

```jsx
// src/components/Menu.jsx
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  // Obtém o caminho atual da URL, permitindo verificar qual link está ativo
  const location = useLocation();
  {/* O hook useLocation do react-router-dom é usado para obter informações 
  sobre o caminho da URL atual. Isso permite que você determine se o link 
  no menu está ativo ou não, comparando o caminho atual com o to do link. */}

  // Função para verificar se o link está ativo com base no caminho atual
  const isActive = (path) => location.pathname === path;
  {/* isActive: A função isActive recebe um caminho (path) e compara com o 
  location.pathname atual. Se for igual, significa que o link está ativo, 
  e um estilo de destaque será aplicado. */}

  return (
    <nav className="bg-gray-800 p-4">
      {/* Contêiner principal do menu, com um layout flexível */}
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        {/* Logo do aplicativo */}
        <div className="text-white text-xl font-bold">
          MeuApp
        </div>

        {/* Links de navegação do menu */}
        {/* Link do react-router-dom é utilizado em vez de 'a' para navegação 
        entre páginas dentro de uma SPA (Single Page Application). Isso garante 
        uma navegação mais rápida sem recarregar a página. */}
        <div className="flex space-x-6">
          {/* Link para a página Home */}
          <Link
            to="/" // Define o destino do link como a página inicial
            className={`px-3 py-2 rounded transition-colors ${
              // Verifica se o link está ativo e aplica estilos diferentes
              isActive('/') 
                ? 'bg-blue-600 text-white' // Cor de fundo azul se o link estiver ativo
                : 'text-gray-300 hover:text-white hover:bg-gray-700' // Estilo normal para o link
            }`}
          >
            Home
          </Link>
          
          {/* Link para a página Sobre */}
          <Link
            to="/sobre" // Define o destino do link como a página Sobre
            className={`px-3 py-2 rounded transition-colors ${
              // Verifica se o link está ativo e aplica estilos diferentes
              isActive('/sobre') 
                ? 'bg-green-600 text-white' // Cor de fundo verde se o link estiver ativo
                : 'text-gray-300 hover:text-white hover:bg-gray-700' // Estilo normal para o link
            }`}
          >
            Sobre
          </Link>
          
          {/* Link para a página Contato */}
          <Link
            to="/contato" // Define o destino do link como a página Contato
            className={`px-3 py-2 rounded transition-colors ${
              // Verifica se o link está ativo e aplica estilos diferentes
              isActive('/contato') 
                ? 'bg-purple-600 text-white' // Cor de fundo roxa se o link estiver ativo
                : 'text-gray-300 hover:text-white hover:bg-gray-700' // Estilo normal para o link
            }`}
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Menu;

```

## Passo 4: Configurar o `App.jsx`

```jsx
// src/App.jsx
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
```
