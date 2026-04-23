// importa o hook useState do react
// ele serve pra criar "variáveis reativas" que atualizam a tela automaticamente
import { useState } from "react";

// importa o componente que renderiza cada card de receita
import RecipeCard from "../components/RecipeCard";

// importa o tipo Receita (typescript, só pra garantir estrutura dos dados)
import type { Receita } from "./Receita";


// define o tipo das props que esse componente vai receber
// receitas = lista de receitas
// total = quantidade total (antes de filtrar/paginar)
type Props = {
  receitas: Receita[];
  total: number;
};


// cria um "mapa" de dificuldade -> cor (tailwind)
// isso evita if/else depois
const corDificuldade: Record<string, string> = {
  Fácil: "bg-green-500",
  Média: "bg-yellow-500",
  Difícil: "bg-red-500",
};


// componente principal
function RecipeList({ receitas, total }: Props) {

  // estado da receita que foi clicada (pra abrir modal)
  // começa como null (nenhuma selecionada)
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  // estado da página atual da paginação
  const [paginaAtual, setPaginaAtual] = useState(1);

  // estado da aba ativa (filtro)
  const [abaAtiva, setAbaAtiva] = useState("Todas");


  // define quantos itens aparecem por página
  const itensPorPagina = 12;


  // aqui filtra as receitas baseado na aba ativa
  // se for "Todas", não filtra nada
  // senão, filtra pela dificuldade
  const receitasFiltradas = abaAtiva === "Todas"
    ? receitas
    : receitas.filter((r) => r.dificuldade === abaAtiva);


  // calcula o índice inicial da paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;

  // calcula o índice final
  const indiceFinal = indiceInicial + itensPorPagina;

  // pega só o pedaço da lista que pertence à página atual
  const receitasPaginadas = receitasFiltradas.slice(indiceInicial, indiceFinal);

  // calcula quantas páginas existem no total
  const totalPaginas = Math.ceil(receitasFiltradas.length / itensPorPagina);


  // lista das abas que aparecem na tela
  const abas = ["Todas", "Fáceis", "Médias", "Difíceis"];

  // faz um "tradutor" de nome da aba -> valor real usado no filtro
  const mapaAba: Record<string, string> = {
    "Todas": "Todas",
    "Fáceis": "Fácil",
    "Médias": "Média",
    "Difíceis": "Difícil",
  };


  // função chamada quando o usuário troca de aba
  function handleAba(aba: string) {
    setAbaAtiva(mapaAba[aba]); // muda o filtro
    setPaginaAtual(1); // volta pra página 1 (boa prática)
  }


  return (
    // container principal centralizado
    <div className="flex flex-col items-center px-4">

      {/* limita largura do conteúdo */}
      <div className="w-full max-w-3xl">

        {/* texto mostrando quantas receitas estão sendo exibidas */}
        <p className="text-sm text-gray-500 mb-3">
          Mostrando {receitasFiltradas.length} de {total} receitas
        </p>


        {/* abas de filtro */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
          {abas.map((aba) => (
            <button
              key={aba}
              onClick={() => handleAba(aba)} // troca de aba
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                // se for a aba ativa → estilo diferente
                abaAtiva === mapaAba[aba]
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {aba}
            </button>
          ))}
        </div>


        {/* grid de receitas */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {receitasPaginadas.map((receita) => (
            <RecipeCard
              key={receita.id} // chave única pro react
              receita={receita}
              onClick={() => setReceitaSelecionada(receita)} // abre modal
            />
          ))}
        </div>


        {/* caso não tenha receitas */}
        {receitasFiltradas.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍽</p>
            <p className="text-lg">Nenhuma receita encontrada</p>
          </div>
        )}
      </div>


      {/* modal (só aparece se tiver receita selecionada) */}
      {receitaSelecionada && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          {/* caixa do modal */}
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">

            {/* header do modal */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{receitaSelecionada.nome}</h2>

              {/* botão fechar */}
              <button 
                onClick={() => setReceitaSelecionada(null)} 
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>


            {/* imagem da receita */}
            <img 
              src={receitaSelecionada.imagem} 
              alt={receitaSelecionada.nome} 
              className="w-full h-48 object-cover rounded-lg mb-4" 
            />


            {/* infos da receita */}
            <div className="flex flex-wrap gap-2 items-center text-sm mb-4">

              {/* dificuldade com cor */}
              <span className={`${corDificuldade[receitaSelecionada.dificuldade]} text-white px-2 py-1 rounded`}>
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


            {/* ingredientes */}
            <h3 className="font-semibold mt-4">Ingredientes</h3>
            <ul className="list-disc ml-5">
              {receitaSelecionada.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>


            {/* modo de preparo */}
            <h3 className="font-semibold mt-4">Modo de preparo</h3>
            <ol className="list-decimal ml-5">
              {receitaSelecionada.modoPreparo.map((passo, index) => (
                <li key={index}>{passo}</li>
              ))}
            </ol>
          </div>
        </div>
      )}


      {/* paginação (só aparece se tiver mais de uma página) */}
      {totalPaginas > 1 && (
        <div className="flex gap-5 mt-6 mb-4 items-center">

          {/* botão voltar */}
          <button 
            onClick={() => setPaginaAtual(paginaAtual - 1)} 
            disabled={paginaAtual === 1} 
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            ← Anterior
          </button>

          {/* indicador de página */}
          <span>Página {paginaAtual} de {totalPaginas}</span>

          {/* botão avançar */}
          <button 
            onClick={() => setPaginaAtual(paginaAtual + 1)} 
            disabled={paginaAtual === totalPaginas} 
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}


// exporta o componente pra poder usar em outros arquivos
export default RecipeList;