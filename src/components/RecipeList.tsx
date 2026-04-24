import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import type { Receita } from "./Receita";

type Props = {
  receitas: Receita[];
};

const corDificuldade: Record<string, string> = {
  Fácil: "bg-green-500",
  Média: "bg-yellow-500",
  Difícil: "bg-red-500",
};

function RecipeList({ receitas }: Props) {
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 12;

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const receitasPaginadas = receitas.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(receitas.length / itensPorPagina);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
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
          {receitasPaginadas.map((receita) => (
            <RecipeCard
              key={receita.id}
              receita={receita}
              onClick={() => setReceitaSelecionada(receita)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {receitaSelecionada && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">
                {receitaSelecionada.nome}
              </h2>

              <button
                onClick={() => setReceitaSelecionada(null)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <img
              src={receitaSelecionada.imagem}
              alt={receitaSelecionada.nome}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
              <span
                className={`${corDificuldade[receitaSelecionada.dificuldade]} text-white px-2 py-1 rounded`}
              >
                {receitaSelecionada.dificuldade}
              </span>

              <span className="bg-gray-200 px-2 py-1 rounded">
                {receitaSelecionada.categoria}
              </span>

              <span>⏱ {receitaSelecionada.tempo}</span>
              <span>🍽 {receitaSelecionada.porcoes} porções</span>
            </div>

            <h3 className="font-semibold mt-4">Ingredientes</h3>
            <ul className="list-disc ml-5">
              {receitaSelecionada.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

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
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>

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