// Importa o useState do React
// Ele permite criar estados (dados que mudam na tela)
import { useState } from "react";

// Importa o componente do card (cada receita individual)
import RecipeCard from "../components/RecipeCard";

// Importa o tipo Receita (estrutura dos dados)
import type { Receita } from "./Receita";


// Define o que esse componente recebe
// Aqui ele recebe uma lista de receitas
type Props = {
  receitas: Receita[];
};


// Mapa de cores baseado na dificuldade
// Isso evita usar vários if/else no JSX
// Ex: se for "Fácil", aplica verde automaticamente
const corDificuldade: Record<string, string> = {
  Fácil: "bg-green-500",
  Média: "bg-yellow-500",
  Difícil: "bg-red-500",
};


// Componente principal que mostra a lista de receitas
function RecipeList({ receitas }: Props) {

  // Estado que guarda qual receita foi clicada
  // começa como null (nenhuma aberta)
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  // Estado da página atual (paginação)
  // começa na página 1
  const [paginaAtual, setPaginaAtual] = useState(1);


  // Quantidade de receitas por página
  // aqui você decidiu mostrar 12 por vez
  const itensPorPagina = 12;


  // Calcula o índice inicial da página
  // Ex:
  // página 1 → começa no 0
  // página 2 → começa no 12
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;

  // Calcula o índice final
  const indiceFinal = indiceInicial + itensPorPagina;


  // Aqui acontece a "mágica" da paginação
  // slice pega só uma parte do array
  // ou seja, só as receitas da página atual
  const receitasPaginadas = receitas.slice(indiceInicial, indiceFinal);


  // Calcula quantas páginas existem no total
  // Math.ceil arredonda pra cima
  const totalPaginas = Math.ceil(receitas.length / itensPorPagina);


  return (
    <div className="flex flex-col items-center">

      {/* Container centralizado */}
      <div className="w-full">

        {/* GRID de receitas */}
        {/* organiza os cards em colunas responsivas */}
        <div
          className="
            grid 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            p-4
            justify-items-center
          "
        >

          {/* Percorre apenas as receitas da página atual */}
          {receitasPaginadas.map((receita) => (
            <RecipeCard
              key={receita.id} // chave única para o React
              receita={receita}

              // Quando clicar no card, salva a receita no estado
              // isso abre o modal
              onClick={() => setReceitaSelecionada(receita)}
            />
          ))}

        </div>
      </div>


      {/* MODAL */}
      {/* Só aparece se existir uma receita selecionada */}
      {receitaSelecionada && (

        // Fundo escuro (overlay)
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          
          {/* Caixa do modal */}
          {/* max-h + overflow = permite scroll interno */}
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto">
            
            {/* Cabeçalho do modal */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">
                {receitaSelecionada.nome}
              </h2>

              {/* Botão de fechar */}
              <button
                onClick={() => setReceitaSelecionada(null)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Imagem da receita */}
            <img
              src={receitaSelecionada.imagem}
              alt={receitaSelecionada.nome}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Informações principais */}
            <div className="flex flex-wrap gap-2 items-center text-sm mb-4">

              {/* Dificuldade com cor dinâmica */}
              <span
                className={`${corDificuldade[receitaSelecionada.dificuldade]} text-white px-2 py-1 rounded`}
              >
                {receitaSelecionada.dificuldade}
              </span>

              {/* Categoria */}
              <span className="bg-gray-200 px-2 py-1 rounded">
                {receitaSelecionada.categoria}
              </span>

              {/* Tempo e porções */}
              <span>⏱ {receitaSelecionada.tempo}</span>
              <span>🍽 {receitaSelecionada.porcoes} porções</span>
            </div>

            {/* Lista de ingredientes */}
            <h3 className="font-semibold mt-4">Ingredientes</h3>
            <ul className="list-disc ml-5">
              {receitaSelecionada.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Passo a passo */}
            <h3 className="font-semibold mt-4">Modo de preparo</h3>
            <ol className="list-decimal ml-5">
              {receitaSelecionada.modoPreparo.map((passo, index) => (
                <li key={index}>{passo}</li>
              ))}
            </ol>

          </div>
        </div>
      )}


      {/* PAGINAÇÃO */}
      <div className="flex gap-5 mt-4 items-center">

        {/* Botão anterior */}
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        {/* Informação da página */}
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>

        {/* Botão próxima */}
        <button
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

// Exporta o componente
export default RecipeList;