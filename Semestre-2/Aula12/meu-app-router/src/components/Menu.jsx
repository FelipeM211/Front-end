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