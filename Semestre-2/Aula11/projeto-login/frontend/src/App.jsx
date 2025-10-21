import { useState } from 'react';

// Componente principal
function App() {
  // useState cria variáveis de estado para controlar dados e UI
  const [username, setUsername] = useState('');   // armazena o usuário digitado
  const [password, setPassword] = useState('');   // armazena a senha digitada
  const [message, setMessage] = useState('');     // guarda mensagens de feedback (sucesso/erro)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // controla se o usuário está logado

  // Função chamada quando o formulário de login for enviado
  const handleLogin = async (e) => {
    e.preventDefault(); // impede o reload da página
    setMessage('');     // limpa mensagens antigas

    try {
      // Faz a requisição para a API de login (backend)
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST', // método HTTP POST
        headers: {
          'Content-Type': 'application/json', // avisa que está mandando JSON
        },
        // Envia os dados do usuário em JSON (username + password)
        body: JSON.stringify({ username, password }),
      });

      // Converte a resposta do servidor em JSON
      const data = await response.json();

      if (response.ok) {
        // Se a resposta foi OK (login válido):
        localStorage.setItem('token', data.token); // salva o token no navegador
        setMessage('Login bem-sucedido!');         // mensagem de sucesso
        setIsLoggedIn(true);                       // altera estado para logado
      } else {
        // Se o servidor retornou erro (ex: senha errada)
        setMessage(data.message);
      }
    } catch (error) {
      // Se não conseguiu nem falar com o servidor (ex: servidor desligado)
      console.error('Erro na requisição:', error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  // Função chamada ao clicar em "Sair"
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token do navegador
    setIsLoggedIn(false);             // muda estado para deslogado
    setMessage('Sessão encerrada.');  // feedback ao usuário
    setUsername('');                  // limpa campo usuário
    setPassword('');                  // limpa campo senha
  }

  // Se o usuário já estiver logado, renderiza a tela de boas-vindas
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo, {username}!</h1>
          <p className="mb-4">Você está logado.</p>
          <button
            onClick={handleLogout} // chama a função de logout
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Se o usuário NÃO estiver logado, mostra o formulário de login
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Acesso ao Sistema</h1>

        {/* Formulário de login */}
        <form onSubmit={handleLogin}>
          {/* Campo de usuário */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username} // valor vem do estado
              onChange={(e) => setUsername(e.target.value)} // atualiza o estado ao digitar
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password} // valor vem do estado
              onChange={(e) => setPassword(e.target.value)} // atualiza o estado ao digitar
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="senha123"
              required
            />
          </div>

          {/* Exibe mensagens de sucesso ou erro */}
          {message && (
            <p className={`text-center mb-4 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          {/* Botão de login */}
          <div className="flex items-center justify-between">
            <button
              type="submit" // dispara o onSubmit do form
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;