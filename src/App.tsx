// importa o hook de estado do react
import { useState } from "react";

// importa os componentes da tela
import Filter from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";

// importa o JSON com as receitas
import receitasData from "./json/receitas.json";

// importa o tipo Receita (typescript)
import type { Receita } from "./components/Receita";


// componente principal da aplicação
function App(){

    // estado da busca (texto digitado)
    const [termoBusca, setTermoBusca] = useState("");

    // estado do filtro de dificuldade
    const [filtroDificuldade, setFiltroDificuldade] = useState("Todas as dificuldades");

    // estado do filtro de categoria
    const [filtroCategoria, setFiltroCategoria] = useState("Todas as categorias");


    // aqui acontece o filtro principal da aplicação
    // ele pega TODAS receitas e aplica regras
    const receitasFiltradas = (receitasData as Receita[]).filter((r) => {

        // verifica se o nome da receita contém o texto digitado
        // toLowerCase = ignora maiúscula/minúscula
        const matchBusca = r.nome.toLowerCase().includes(termoBusca.toLowerCase());

        // verifica dificuldade
        // se for "Todas", aceita qualquer uma
        // senão, precisa bater exatamente
        const matchDificuldade =
            filtroDificuldade === "Todas as dificuldades" || r.dificuldade === filtroDificuldade;

        // mesma lógica para categoria
        const matchCategoria =
            filtroCategoria === "Todas as categorias" || r.categoria === filtroCategoria;

        // só retorna true se TODAS as condições forem verdadeiras
        return matchBusca && matchDificuldade && matchCategoria;
    });


    return(
        <>
        {/* cabeçalho */}
        <Header />

        {/* componente de filtros */}
        {/* aqui você passa o estado + funções pra ele controlar */}
        <Filter
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            filtroDificuldade={filtroDificuldade}
            setFiltroDificuldade={setFiltroDificuldade}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
        />

        {/* lista de receitas já filtradas */}
        <RecipeList 
            receitas={receitasFiltradas} // só o que passou no filtro
            total={receitasData.length} // total original (sem filtro)
        />

        {/* rodapé */}
        <Footer />
        </>
    )
}


// exporta o App (ponto de entrada)
export default App;