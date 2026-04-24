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


// mesmo mapa de cores do RecipeCard (reutilização de lógica)
// isso evita duplicar if/else e mantém padrão visual
const corDificuldade: Record<string, string> = {
  Fácil: "bg-green-500",
  Média: "bg-yellow-500",
  Difícil: "bg-red-500",
};


function RecipeList({ receitas }: Props) {

  // NOVO ESTADO
  // Guarda qual receita foi clicada
  // começa como null (nenhuma selecionada)
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

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
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            p-4
            justify-items-center
          "
        >

          {/* aqui a gente percorre só as receitas da página atual */}
          {receitasPaginadas.map((receita) => (
            <RecipeCard
              key={receita.id}
              receita={receita}
              // ao clicar no card, salva a receita no estado
              onClick={() => setReceitaSelecionada(receita)}
            />
          ))}

        </div>
      </div>


      {/*  MODAL (Parte parte visual da tela de modo de preparo) */}
      {/* se tiver uma receita selecionada, mostra */}
      {receitaSelecionada && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          {/* container do modal */}
          <div className="bg-white p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[90vh]">
            
            {/* HEADER com título + botão fechar */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">
                {receitaSelecionada.nome}
              </h2>

              {/* botão fechar */}
              <button
                onClick={() => setReceitaSelecionada(null)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* IMAGEM da receita */}
            <img
              src={receitaSelecionada.imagem}
              alt={receitaSelecionada.nome}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* INFORMAÇÕES PRINCIPAIS */}
            {/* aqui usamos o mesmo mapa de cores da dificuldade */}
            <div className="flex flex-wrap gap-2 items-center text-sm mb-4">

              {/* dificuldade com cor dinâmica */}
              <span
                className={`${corDificuldade[receitaSelecionada.dificuldade]} text-white px-2 py-1 rounded`}
              >
                {receitaSelecionada.dificuldade}
              </span>

              {/* categoria */}
              <span className="bg-gray-200 px-2 py-1 rounded">
                {receitaSelecionada.categoria}
              </span>

              {/* tempo */}
              <span>⏱ {receitaSelecionada.tempo}</span>

              {/* porções */}
              <span>🍽 {receitaSelecionada.porcoes} porções</span>

            </div>

            {/* Ingredientes */}
            <h3 className="font-semibold mt-4">Ingredientes</h3>
            <ul className="list-disc ml-5">
              {receitaSelecionada.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Modo de preparo */}
            <h3 className="font-semibold mt-4">Modo de preparo</h3>
            <ol className="list-decimal ml-5">
              {receitaSelecionada.modoPreparo.map((passo, index) => (
                <li key={index}>{passo}</li>
              ))}
            </ol>

          </div>
        </div>
      )}


      {/* PAGINAÇÃO (os botões embaixo) */}
      <div className="flex gap-5 mt-4 items-center">

        {/* botão de voltar página */}
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
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
          disabled={paginaAtual === totalPaginas}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima →
        </button>

      </div>

    </div>
  );
}

export default RecipeList;