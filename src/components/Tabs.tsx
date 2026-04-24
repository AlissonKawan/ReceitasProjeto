// Define um tipo chamado DificuldadeFiltro que só pode assumir esses quatro valores
type DificuldadeFiltro = "Todas" | "Fácil" | "Média" | "Difícil";

// Define o tipo das props que o componente Tabs vai receber
type Props = {
  filtroAtivo: DificuldadeFiltro; // Qual filtro está ativo no momento
  onChange: (filtro: DificuldadeFiltro) => void; // Função chamada quando o usuário troca de filtro
};

// Array com todas as opções possíveis de filtro
const opcoes: DificuldadeFiltro[] = ["Todas", "Fácil", "Média", "Difícil"];

function Tabs({ filtroAtivo, onChange }: Props) {
  return (
    // Container externo que centraliza o conteúdo e adiciona espaçamento
    <div className="flex justify-center px-4 pb-4">
      {/* Container interno com fundo cinza claro e bordas arredondadas */}
      <div className="flex w-full bg-gray-100 rounded-xl overflow-hidden">
        {/* Itera sobre cada opção de filtro e cria um botão */}
        {opcoes.map((opcao) => (
          <button
            key={opcao} // Usa o nome da opção como chave única
            onClick={() => onChange(opcao)} // Chama a função onChange passando a opção clicada
            className={`flex-1 py-3 text-sm font-semibold transition-colors
              ${
                filtroAtivo === opcao
                  ? "bg-white text-gray-800 shadow-sm rounded-xl" // Estilo quando o botão está ativo
                  : "text-gray-500 hover:text-gray-700" // Estilo quando está inativo
              }`}
          >
            {/* Exibe o texto do botão. Se for "Todas", mostra "Todas". 
                Caso contrário, adiciona um "s" no final (ex: "Fácil" -> "Fáceis") */}
           {opcao === "Todas" ? "Todas" : opcao === "Fácil" ? "Fáceis" : opcao === "Média" ? "Médias" : "Difíceis"}
          </button>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente Tabs para ser usado em outros arquivos
export default Tabs;

// Exporta também o tipo DificuldadeFiltro para ser reutilizado em outros lugares
export type { DificuldadeFiltro };