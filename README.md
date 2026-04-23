# 🍳 Receitas Web

Projeto desenvolvido com **React + TypeScript + Vite + TailwindCSS** para exibição de receitas dinâmicas a partir de um arquivo JSON.

---

## 👥 Integrantes

* Alisson Kawan
* Marcos Vinicius
* Eduardo Boni
* Millena Pamio

---

## 📌 Descrição

Este projeto consiste em uma aplicação web que exibe receitas organizadas por categorias como:

* Pratos Principais
* Saladas
* Sobremesas
* Bebidas

As receitas são carregadas a partir de um arquivo JSON e renderizadas dinamicamente na tela utilizando componentes React.

---

## 🚀 Funcionalidades

* 📋 Listagem dinâmica de receitas via JSON
* 🎨 Interface moderna com TailwindCSS
* 🔍 Filtro de receitas (em desenvolvimento)
* 📱 Layout responsivo
* 🎯 Separação de responsabilidades (componentes reutilizáveis)

---

## 🧠 Estrutura do Projeto

```
src/
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeList.tsx
│   ├── Filters.tsx
│   ├── Stats.tsx
│   └── Tabs.tsx
│
├── json/
│   └── receitas.json
│
├── App.tsx
└── main.tsx
```

---

## ⚙️ Tecnologias Utilizadas

* React
* TypeScript
* Vite
* TailwindCSS

---

## 🔄 Fluxo da Aplicação

```
JSON → App → RecipeList → RecipeCard → Tela
```

* O **JSON** contém os dados das receitas
* O **App** gerencia e repassa os dados
* O **RecipeList** percorre os dados
* O **RecipeCard** exibe cada receita

---

## ▶️ Como executar o projeto

1. Clone o repositório:

```
git clone <url-do-repositorio>
```

2. Acesse a pasta:

```
cd ReceitasWeb
```

3. Instale as dependências:

```
npm install
```

4. Execute o projeto:

```
npm run dev
```

---

## 📊 Status do Projeto

🚧 Em desenvolvimento

---

## 💡 Observações

Este projeto tem como objetivo aplicar conceitos de:

* Componentização em React
* Manipulação de dados via JSON
* Uso de props e tipagem com TypeScript
* Organização de código front-end

---

## 🏁 Conclusão

O projeto demonstra a construção de uma aplicação moderna utilizando boas práticas de desenvolvimento front-end, com foco em reutilização de componentes e organização de dados.

---