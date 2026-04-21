// Aqui a gente puxa o useState do React
// Ele serve pra guardar coisas que mudam na tela (tipo a página atual)
import { useState } from "react";

// Esse é o componente do card (cada receita bonitinha na tela)
import RecipeCard from "../components/RecipeCard";

// Tipo da receita (TypeScript)
// basicamente garante que os dados estão no formato certo
import type { Receita } from "./Receita";


// Aqui você define o que esse componente recebe
// no caso: uma lista de receitas
type Props = {
  receitas: Receita[];
};


function RecipeList({ receitas }: Props) {

  // Guarda qual página o usuário está
  // começa na página 1
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Aqui você decidiu: quero mostrar 12 receitas por página
  // (3 linhas x 4 colunas)
  const itensPorPagina = 12;

  // Aqui você calcula de onde começa a página
  // exemplo:
  // página 1 → começa no 0
  // página 2 → começa no 12
  // então ele pula sempre que for em outra pagina para não mostrar os mesmos itens
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;

  // aqui define até onde vai
  const indiceFinal = indiceInicial + itensPorPagina;

  // ESSA LINHA É A MAIS IMPORTANTE DA PAGINAÇÃO
  // ela corta o array e pega só os itens da página atual
  const receitasPaginadas = receitas.slice(indiceInicial, indiceFinal);

  // calcula quantas páginas existem no total
  // Math.ceil serve pra arredondar pra cima
  const totalPaginas = Math.ceil(receitas.length / itensPorPagina);


  return (
    <div className="flex flex-col items-center">

      {/* essa div aqui só serve pra centralizar tudo */}
      <div className="w-full max-w-6xl">

        {/* GRID = organização dos cards */}
        <div
          className="
            grid 
            grid-cols-1        // celular → 1 coluna
            sm:grid-cols-2     // tela pequena → 2 colunas
            md:grid-cols-3     // tablet → 3 colunas
            lg:grid-cols-4     // pc → 4 colunas (o que a gente quer)
            gap-6              // espaço entre os cards
            p-4                // espaçamento interno
            justify-items-center // centraliza os cards
          "
        >

          {/* aqui a gente percorre só as receitas da página atual */}
          {receitasPaginadas.map((receita) => (
            <RecipeCard
              key={receita.id}   // React precisa disso pra organizar melhor
              receita={receita}  // manda a receita pro card
            />
          ))}

        </div>
      </div>


      {/* PAGINAÇÃO (os botões embaixo) */}
      <div className="flex gap-5 mt-4 items-center">

        {/* botão de voltar página */}
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1} // desativa se já estiver na primeira
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        {/* mostra em qual página você está */}
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>

        {/* botão de próxima página */}
        <button
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas} // desativa na última
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima →
        </button>

      </div>

    </div>
  );
}

export default RecipeList;