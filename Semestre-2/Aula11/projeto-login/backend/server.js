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