import type { Receita } from "./Receita";

type Props = {
  receitas: Receita[];
};

function Stats({ receitas }: Props) {
  const total = receitas.length;
  const faceis = receitas.filter((r) => r.dificuldade === "Fácil").length;
  const medias = receitas.filter((r) => r.dificuldade === "Média").length;
  const dificeis = receitas.filter((r) => r.dificuldade === "Difícil").length;

  const cards = [
    { label: "Total de Receitas", valor: total, cor: "text-orange-500" },
    { label: "Receitas Fáceis", valor: faceis, cor: "text-green-500" },
    { label: "Receitas Médias", valor: medias, cor: "text-yellow-500" },
    { label: "Receitas Difíceis", valor: dificeis, cor: "text-red-500" },
  ];

  return (
    <div className="flex justify-center py-6 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center"
          >
            <span className={`text-4xl font-bold ${card.cor}`}>
              {card.valor}
            </span>
            <span className="text-sm text-gray-500 mt-1 text-center">
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;

