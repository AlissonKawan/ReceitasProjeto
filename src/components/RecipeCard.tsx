// Aqui você importa o tipo Receita
// basicamente isso garante que os dados que chegam aqui estão certinhos
import type { Receita } from "./Receita";


// Define o que esse componente espera receber
// nesse caso: UMA receita só
// adicionamos onClick para permitir clique no card
type Props = {
  receita: Receita;
  onClick?: () => void;
};


// Aqui você criou um "atalho inteligente"
// em vez de fazer vários if/else, você mapeia direto a cor
const corDificuldade: Record<string, string> = {
  Fácil: "bg-green-500",
  Média: "bg-yellow-500",
  Difícil: "bg-red-500",
};


// Componente do card
// recebe a receita e transforma em UI (visual)
function RecipeCard({ receita, onClick }: Props) {
  return (

    // Esse é o card inteiro
    // w-full → ocupa o espaço que o grid der
    // max-w-md → aumentei um pouco pra ficar mais "gordinho"
    // cursor-pointer → mostra que é clicável
    // hover:scale-105 → leve animação ao passar o mouse
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md cursor-pointer transition-transform hover:scale-105"
    >

      {/* IMAGEM */}
      <img
        src={receita.imagem} // vem direto do JSON
        alt={receita.nome}   // importante pra acessibilidade
        className="w-full h-48 object-cover"
        // h-48 → altura fixa
        // object-cover → evita imagem deformada
      />

      {/* PARTE DE BAIXO DO CARD */}
      <div className="p-4">

        {/* Nome da receita (título) */}
        <h2 className="text-lg font-bold">
          {receita.nome}
        </h2>

        {/* Categoria (tipo: sobremesa, bebida, etc) */}
        <p className="text-sm text-gray-500">
          {receita.categoria}
        </p>

        {/* Tempo e porções lado a lado */}
        <div className="flex justify-between text-sm mt-2">
          <span>⏱ {receita.tempo}</span>
          <span>🍽 {receita.porcoes} porções</span>
        </div>

        {/* DIFICULDADE */}
        {/* aqui você usa o "mapa" de cores */}
        <span
          className={`${corDificuldade[receita.dificuldade]} text-white text-xs px-2 py-1 rounded mt-2 inline-block`}
        >
          {receita.dificuldade}
        </span>

      </div>
    </div>
  );
}


// exporta pra usar em outros lugares (tipo no RecipeList)
export default RecipeCard;