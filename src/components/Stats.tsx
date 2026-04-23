// Importa o tipo Receita definido em outro arquivo
import type { Receita } from "./Receita";

// Define o tipo das props que o componente vai receber
type Props = {
  receitas: Receita[]; // Um array de receitas
};

function Stats({ receitas }: Props) {
  // Conta o total de receitas
  const total = receitas.length;

  //Conta quantas receitas têm dificuldade "Fácil"
  const faceis = receitas.filter((r) => r.dificuldade === "Fácil").length;

  // Conta quantas receitas têm dificuldade "Média"
  const medias = receitas.filter((r) => r.dificuldade === "Média").length;

  // Conta quantas receitas têm dificuldade "Difícil"
  const dificeis = receitas.filter((r) => r.dificuldade === "Difícil").length;

  // Cria um array de objetos que representam os cartões a serem exibidos
  const cards = [
    { label: "Total de Receitas", valor: total, cor: "text-orange-500" },
    { label: "Receitas Fáceis", valor: faceis, cor: "text-green-500" },
    { label: "Receitas Médias", valor: medias, cor: "text-yellow-500" },
    { label: "Receitas Difíceis", valor: dificeis, cor: "text-red-500" },
  ];

  return (
    // Container principal que centraliza o conteúdo e adiciona espaçamento
    <div className="flex justify-center py-6 px-4">
      {/* Grid responsiva: 2 colunas em telas pequenas, 4 em maiores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
        {/* Itera sobre o array de cards e renderiza cada um */}
        {cards.map((card) => (
          <div
            key={card.label} // Usa o label como chave única
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center"
          >
            {/* Valor do card em destaque, com cor dinâmica */}
            <span className={`text-4xl font-bold ${card.cor}`}>
              {card.valor}
            </span>
            {/* Label do card em texto menor e cinza */}
            <span className="text-sm text-gray-500 mt-1 text-center">
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default Stats;
