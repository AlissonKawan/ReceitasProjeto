// Importa o hook useState do React
// Ele serve para guardar estados (valores que podem mudar na tela)
import { useState } from "react";

// Importa os componentes visuais da aplicação
// Cada um é responsável por uma parte da tela
import Header from "./components/Header";      // topo da página
import Footer from "./components/Footer";      // rodapé
import Filter from "./components/Filters";     // filtros de busca (input, selects, etc)
import RecipeList from "./components/RecipeList"; // lista de receitas (cards + modal)
import Tabs from "./components/Tabs";          // abas de filtro por dificuldade
import Stats from "./components/Stats";        // estatísticas gerais

// Importa os dados das receitas (JSON local)
import receitasData from "./json/receitas.json";

// Importa os tipos do TypeScript
// Receita → formato de cada receita
// DificuldadeFiltro → tipo usado nas tabs
import type { Receita } from "./components/Receita";
import type { DificuldadeFiltro } from "./components/Tabs";


// Componente principal da aplicação
// Aqui fica a "inteligência" do sistema (estado + lógica)
function App() {

  // Estado que guarda o texto digitado na busca
  const [termoBusca, setTermoBusca] = useState("");

  // Estado que guarda o filtro de dificuldade selecionado
  const [filtroDificuldade, setFiltroDificuldade] = useState("Todas as dificuldades");

  // Estado que guarda o filtro de categoria
  const [filtroCategoria, setFiltroCategoria] = useState("Todas as categorias");

  // Estado que controla qual aba está ativa (Fácil, Média, Difícil, Todas)
  const [abaAtiva, setAbaAtiva] = useState<DificuldadeFiltro>("Todas");


  // Aqui acontece a lógica principal de filtragem
  // Ele percorre todas as receitas e decide quais vão aparecer
  const receitasFiltradas = (receitasData as Receita[]).filter((r) => {

    // Verifica se o nome da receita contém o texto digitado
    // toLowerCase é usado para ignorar maiúsculas/minúsculas
    const matchBusca = r.nome.toLowerCase().includes(termoBusca.toLowerCase());

    // Verifica se a dificuldade bate com o filtro
    // Se estiver em "Todas", passa tudo
    const matchDificuldade =
      filtroDificuldade === "Todas as dificuldades" ||
      r.dificuldade === filtroDificuldade;

    // Verifica a categoria da receita
    const matchCategoria =
      filtroCategoria === "Todas as categorias" ||
      r.categoria === filtroCategoria;

    // Verifica a aba ativa (Tabs)
    // Funciona como um filtro extra por dificuldade
    const matchAba =
      abaAtiva === "Todas" ||
      r.dificuldade === abaAtiva;

    // Só retorna a receita se TODOS os filtros forem verdadeiros
    return matchBusca && matchDificuldade && matchCategoria && matchAba;
  });


  // Função para limpar todos os filtros
  // Reseta tudo para o estado inicial
  function limparFiltros() {
    setTermoBusca("");
    setFiltroDificuldade("Todas as dificuldades");
    setFiltroCategoria("Todas as categorias");
    setAbaAtiva("Todas");
  }


  // Aqui é o retorno visual do componente
  // É o que aparece na tela
  return (
    <>
      {/* Cabeçalho da aplicação */}
      <Header />

      {/* Estatísticas gerais (usa TODAS as receitas, não as filtradas) */}
      <Stats receitas={receitasData as Receita[]} />

      {/* Componente de filtros */}
      {/* Recebe os estados e funções para alterar eles */}
      <Filter
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        filtroDificuldade={filtroDificuldade}
        setFiltroDificuldade={setFiltroDificuldade}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        onLimpar={limparFiltros}
      />

      {/* Tabs de dificuldade */}
      {/* Controla qual aba está ativa */}
      <Tabs
        filtroAtivo={abaAtiva}
        onChange={setAbaAtiva}
      />

      {/* Lista de receitas */}
      {/* Aqui entram só as receitas já filtradas */}
      <RecipeList receitas={receitasFiltradas} />

      {/* Rodapé */}
      <Footer />
    </>
  );
}

// Exporta o componente para ser usado no projeto
export default App;