import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filter from "./components/Filters";
import RecipeList from "./components/RecipeList";
import Tabs from "./components/Tabs";
import Stats from "./components/Stats";

import receitasData from "./json/receitas.json";

import type { Receita } from "./components/Receita";
import type { DificuldadeFiltro } from "./components/Tabs";

function App() {
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroDificuldade, setFiltroDificuldade] = useState("Todas as dificuldades");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas as categorias");
  const [abaAtiva, setAbaAtiva] = useState<DificuldadeFiltro>("Todas");

  const receitasFiltradas = (receitasData as Receita[]).filter((r) => {
    const matchBusca = r.nome.toLowerCase().includes(termoBusca.toLowerCase());

    const matchDificuldade =
      filtroDificuldade === "Todas as dificuldades" ||
      r.dificuldade === filtroDificuldade;

    const matchCategoria =
      filtroCategoria === "Todas as categorias" ||
      r.categoria === filtroCategoria;

    const matchAba =
      abaAtiva === "Todas" ||
      r.dificuldade === abaAtiva;

    return matchBusca && matchDificuldade && matchCategoria && matchAba;
  });

  function limparFiltros() {
    setTermoBusca("");
    setFiltroDificuldade("Todas as dificuldades");
    setFiltroCategoria("Todas as categorias");
    setAbaAtiva("Todas");
  }

  return (
    <>
      <Header />

      <Stats receitas={receitasData as Receita[]} />

      <Filter
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        filtroDificuldade={filtroDificuldade}
        setFiltroDificuldade={setFiltroDificuldade}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        onLimpar={limparFiltros}
      />

      <Tabs
        filtroAtivo={abaAtiva}
        onChange={setAbaAtiva}
      />

      <RecipeList receitas={receitasFiltradas} />

      <Footer />
    </>
  );
}

export default App;