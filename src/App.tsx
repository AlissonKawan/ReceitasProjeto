// Importa o hook useState do React
import { useState } from "react";

// Importa os componentes que serão usados na aplicação
import Filter from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import Stats from "./components/Stats";
import Tabs from "./components/Tabs";

// Importa o tipo DificuldadeFiltro definido no componente Tabs
import type { DificuldadeFiltro } from "./components/Tabs";

// Importa os dados das receitas a partir de um arquivo JSON
import receitasData from "./json/receitas.json";

// Importa o tipo Receita para tipagem das receitas
import type { Receita } from "./components/Receita";

function App() {
  // Estado que guarda qual aba de dificuldade está ativa (inicialmente "Todas")
  const [tabDificuldade, setTabDificuldade] = useState<DificuldadeFiltro>("Todas");

  // Filtra as receitas conforme o filtro ativo
  // Se o filtro for "Todas", mostra todas as receitas
  // Caso contrário, mostra apenas as receitas da dificuldade selecionada
  const receitasFiltradas: Receita[] = tabDificuldade === "Todas"
    ? receitasData
    : receitasData.filter((r) => r.dificuldade === tabDificuldade);

  return (
    <>
      {/* Cabeçalho da aplicação */}
      <Header />

      {/* Estatísticas gerais das receitas (sempre com base em todas) */}
      <Stats receitas={receitasData} />

      {/* Componente de filtros adicionais (não relacionado às tabs) */}
      <Filter />

      {/* Texto informativo mostrando quantas receitas estão sendo exibidas */}
      <p className="text-center text-sm text-gray-500 mb-3">
        Mostrando <strong>{receitasFiltradas.length}</strong> de{" "}
        <strong>{receitasData.length}</strong> receitas
      </p>

      {/* Componente de abas para selecionar dificuldade */}
      <Tabs filtroAtivo={tabDificuldade} onChange={setTabDificuldade} />

      {/* Lista de receitas filtradas conforme a aba selecionada */}
      <RecipeList receitas={receitasFiltradas} />

      {/* Rodapé da aplicação */}
      <Footer />
    </>
  );
}

// Exporta o componente principal da aplicação
export default App;
