# 👨‍💻 Projeto: Login Simples com React, Node e Tailwind

## Estrutura de Pastas

```bash
    /projeto-login
    |-- /backend
    |-- /frontend
```

---

## 🚀 1. **Backend (Node.js)**

Aqui você cria a API de autenticação.

### **Passo 1: Configuração Inicial e Dependências**

Abra o terminal na pasta `backend` e execute:

```bash
      npm init -y
      npm install express cors jsonwebtoken
      touch server.js
```

### **Passo 2: Código do Servidor (`server.js`)**

Crie um servidor simples com um endpoint de login.

```js
    // Importa dependências necessárias
const express = require('express');   // framework para criar API
const cors = require('cors');         // libera acesso de outros domínios (ex: o React)
const jwt = require('jsonwebtoken');  // biblioteca para gerar tokens JWT

// Cria aplicação Express
const app = express();
const PORT = 3001; // porta onde o servidor vai rodar
const SECRET_KEY = 'sua_chave_secreta_super_forte'; // chave usada para assinar tokens (NUNCA deixar pública em produção)

// Middlewares
app.use(cors());          // habilita CORS (para o front conseguir acessar a API)
app.use(express.json());  // permite que o servidor entenda requisições com JSON no body

// Endpoint de login (rota POST em /login)
app.post('/login', (req, res) => {
  // Extrai usuário e senha enviados no corpo da requisição
  const { username, password } = req.body;

  // Verificação simples de credenciais (mock, sem banco de dados)
  if (username === 'admin' && password === 'senha123') {
    // Se usuário e senha estiverem corretos:
    // Gera um token JWT contendo o "username" como payload
    const token = jwt.sign(
      { username: username }, // dados que vão no token (payload)
      SECRET_KEY,             // chave secreta para assinar
      { expiresIn: '1h' }     // tempo de expiração do token (1 hora)
    );

    // Retorna o token para o cliente em formato JSON
    return res.json({ token });
  }

  // Se usuário/senha forem inválidos, retorna erro 401 (não autorizado)
  return res.status(401).json({ message: 'Credenciais inválidas.' });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
```

### **Passo 3: Como Rodar**

Abra o terminal na pasta `backend` e execute:

```bash
    node server.js
 ```

---

## 💅 2. Frontend (React + Vite)

Agora, vamos à interface de usuário.

### **Passo 1: Inicialização e Dependências**

Abra o terminal na pasta `frontend` e execute:

```bash
    npm create vite@latest projeto-front --template react
    cd projeto-front
    npm install
    npm install tailwindcss @tailwindcss/vite
```

### **Passo 2: Configure o Vite plugin:**

   Adicione o `@tailwindcss/viteplugin` à sua configuração do Vite.

   ```js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'

    // https://vite.dev/config/
    export default defineConfig({
    plugins: [react(),
         tailwindcss(),
    ],
   })
   ```

### **Passo 3: Adicione as diretivas do Tailwind ao seu CSS:**

   Abra o arquivo `src/index.css` (ou `src/App.css` se preferir) e adicione as diretivas `@tailwind` no topo:

   ```css
   /* src/index.css (ou src/App.css) */
   @import "tailwindcss";
   ```

   Certifique-se de que este arquivo CSS está sendo importado em seu `main.jsx` (ou `main.tsx`) ou `App.jsx`. O projeto já vem com `import './App.css'`, então podemos usar ele.

---

### **Passo 4: Componente de Login (`src/App.jsx`)**

Substitua o conteúdo do arquivo `src/App.jsx` por este:

```js
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
```

### **Passo 5: Como Rodar**

Abra o terminal na pasta frontend e execute:

```bash
npm run dev
```
