# Interatividade com Tailwind CSS: Estados, Focus e Ações

## 🎯 Objetivos da Aula

- Usar classes do Tailwind CSS para tratar estados de interação (`hover`, `focus`, `active`, `disabled`);
- Trabalhar com `group`, `peer` e manipulação de estados visuais sem JavaScript;
- Introduzir validação visual (`valid`, `invalid`, `required`);
- Explorar suporte a **Dark Mode** com JavaScript interno;
- Construir pequenos componentes interativos (tabs, dropdown, modal).

---

## 1. Estados de Interação: `hover`, `focus` e `active`

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-4 active:bg-blue-900 text-white font-bold py-2 px-4 rounded">
  Interaja comigo
</button>
```

---

## 2. Usando `group` para afetar elementos filhos

```html
<div class="group p-4 bg-gray-100 hover:bg-gray-200 rounded-lg">
  <h2 class="text-lg font-bold group-hover:text-blue-500">Título</h2>
  <p class="group-hover:underline">Texto ao passar o mouse</p>
</div>
```

---

## 3. Usando `peer` em formulários reativos

```html
<div>
  <input type="checkbox" id="mostrar" class="peer hidden" />
  <label for="mostrar" class="cursor-pointer text-blue-500">Mostrar mensagem</label>

  <div class="mt-2 hidden peer-checked:block text-green-600">
    Checkbox marcado! 🎉
  </div>
</div>
```

---

## 4. Dark Mode com JavaScript Interno

Aqui usaremos JavaScript direto no HTML para alternar a classe `dark` no elemento `<html>`.

```html
<!DOCTYPE html>
<html lang="pt-BR"> 
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // Informa ao Tailwind para usar o modo de classe, ignorando o navegador.
  tailwind.config = {
    darkMode: 'class'
  }
</script>
</head>
<body class="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center justify-center">

  <button id="toggle-dark" class="mb-6 px-4 py-2 bg-blue-500 text-white rounded">
    Alternar Dark Mode
  </button>

  <div class="p-6 rounded bg-gray-100 dark:bg-gray-800">
    <p>Este card muda com o dark mode 🌙</p>
  </div>

  <script>
    const btn = document.getElementById('toggle-dark');
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  </script>
</body>
</html>
```

---

## 5. Componentes Sem JavaScript

### 5.1 Dropdown Simples

```html
<div>
  <input type="checkbox" id="menu" class="peer hidden" />
  <label for="menu" class="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">Menu</label>
  
  <div class="hidden peer-checked:block mt-2 border rounded p-2">
    <a href="#" class="block p-2 hover:bg-gray-100">Item 1</a>
    <a href="#" class="block p-2 hover:bg-gray-100">Item 2</a>
  </div>
</div>
```

### 5.2 Modal com Peer

```html
<div>
  <input type="checkbox" id="abrir" class="peer hidden" />
  <label for="abrir" class="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">Abrir Modal</label>

  <div class="fixed inset-0 bg-black/50 hidden peer-checked:flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md max-w-sm dark:bg-gray-800 dark:text-white">
      <p>Conteúdo do modal</p>
      <label for="abrir" class="cursor-pointer mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded">Fechar</label>
    </div>
  </div>
</div>
```

### 5.3 Tabs

```html
<div class="p-8 max-w-lg mx-auto">

  <input type="radio" id="tab1" name="tabs" class="peer/aba1 hidden" checked />
  <label for="tab1" class="inline-block cursor-pointer px-4 py-2 text-gray-500
                          hover:text-gray-700
                          peer-checked/aba1:text-blue-600 peer-checked/aba1:border-b-2 peer-checked/aba1:border-blue-600">
    Aba 1
  </label>

  <input type="radio" id="tab2" name="tabs" class="peer/aba2 hidden" />
  <label for="tab2" class="inline-block cursor-pointer px-4 py-2 text-gray-500
                          hover:text-gray-700
                          peer-checked/aba2:text-blue-600 peer-checked/aba2:border-b-2 peer-checked/aba2:border-blue-600">
    Aba 2
  </label>

  <div class="w-full border-t border-gray-300 -mt-px"></div>

  <div class="py-4 hidden peer-checked/aba1:block">
    <p class="text-lg font-semibold">Conteúdo da Aba 1 🚀</p>
    <p>Agora este conteúdo é um irmão direto do input. A relação `peer` funciona.</p>
  </div>
  
  <div class="py-4 hidden peer-checked/aba2:block">
    <p class="text-lg font-semibold">Conteúdo da Aba 2 ✨</p>
    <p>Este também é um irmão do seu respectivo input e agora aparece corretamente.</p>
  </div>

</div>
```

---

## 6. Dicas de Interatividade (com exemplos)

### Hover + Transition

```html
<button class="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300">
  Hover com transição
</button>
```

### Focus com `ring`

```html
<input type="text" placeholder="Digite algo"
       class="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 p-2">
```

### Disabled com opacidade

```html
<button class="bg-gray-400 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed" disabled>
  Desativado
</button>
```

---

## 7. Mini Projeto: Formulário Completo com Interatividade

Monte um formulário com:

- Nome e email obrigatórios (`valid` / `invalid`);
- Checkbox para ativar botão de envio (`peer`);
- Feedback visual de erro e sucesso;
- Dark mode ativado por botão em JavaScript.

## 8. Atividades em Sala 💪

1. Criar um dropdown com `peer` e estilizar opções.
2. Montar um modal que abre e fecha sem JS.
3. Implementar tabs apenas com Tailwind.
4. ecriar o formulário em dark mode.
5. Desafio: usar `group` para estilizar cards que mudam título e cor ao passar o mouse.

---
