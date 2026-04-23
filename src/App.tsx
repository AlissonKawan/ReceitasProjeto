import { useState } from "react";
import Filter from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import receitasData from "./json/receitas.json";
import type { Receita } from "./components/Receita";

function App(){
    const [termoBusca, setTermoBusca] = useState("");
    const [filtroDificuldade, setFiltroDificuldade] = useState("Todas as dificuldades");
    const [filtroCategoria, setFiltroCategoria] = useState("Todas as categorias");

    const receitasFiltradas = (receitasData as Receita[]).filter((r) => {
        const matchBusca = r.nome.toLowerCase().includes(termoBusca.toLowerCase());
        const matchDificuldade =
            filtroDificuldade === "Todas as dificuldades" || r.dificuldade === filtroDificuldade;
        const matchCategoria =
            filtroCategoria === "Todas as categorias" || r.categoria === filtroCategoria;
        return matchBusca && matchDificuldade && matchCategoria;
    });

    return(
        <>
        <Header />
        <Filter
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            filtroDificuldade={filtroDificuldade}
            setFiltroDificuldade={setFiltroDificuldade}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
        />
        <RecipeList receitas={receitasFiltradas} total={receitasData.length} />
        <Footer />
        </>
    )
} export default App;