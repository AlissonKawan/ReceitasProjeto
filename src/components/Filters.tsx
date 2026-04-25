// Importa hooks do React
// useRef → referencia um elemento do DOM
// useEffect → executa efeitos colaterais (ex: evento de clique fora)
// useState → controla estados locais do componente
import { useRef, useEffect, useState } from "react";

// Define o tipo das props que o componente Filter recebe
type Props = {
  termoBusca: string;
  setTermoBusca: (v: string) => void;
  filtroDificuldade: string;
  setFiltroDificuldade: (v: string) => void;
  filtroCategoria: string;
  setFiltroCategoria: (v: string) => void;
  onLimpar: () => void;
};

// Lista de opções de dificuldade que serão exibidas no select
// O valor aqui é exatamente o que será usado no estado
const dificuldades = ["Todas as dificuldades", "Fácil", "Média", "Difícil"];

// Lista de categorias disponíveis
const categorias = ["Todas as categorias", "Prato Principal", "Bebida", "Sobremesa", "Salada"];


// Componente reutilizável de select customizado (dropdown feito na mão)
function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {

  // Controla se o dropdown está aberto ou fechado
  const [open, setOpen] = useState(false);

  // Referência para o container do select
  const ref = useRef<HTMLDivElement>(null);

  // Esse efeito detecta clique fora do componente
  // Se clicar fora, ele fecha o dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    // Remove o evento quando o componente desmonta
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* Botão principal que mostra o valor selecionado */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 bg-white text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>{value}</span>

        {/* Ícone de seta */}
        <svg
          className={`w-3 h-3 text-gray-400 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown com as opções */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow z-50 min-w-full">

          {/* Percorre todas as opções e cria um botão para cada */}
          {options.map((opt) => (
            <button
              key={opt}

              // Quando clicar, atualiza o valor e fecha o dropdown
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}

              className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 ${
                value === opt ? "font-medium text-gray-900" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


// Componente principal de filtros
function Filter({
  termoBusca,
  setTermoBusca,
  filtroDificuldade,
  setFiltroDificuldade,
  filtroCategoria,
  setFiltroCategoria,
  onLimpar,
}: Props) {

  return (
    <div className="flex justify-center px-4 pt-4 pb-2">

      {/* Container visual do filtro */}
      <div
        className="
          bg-white 
          shadow-sm 
          rounded-lg 
          p-3 
          w-full   
          flex 
          flex-col 
          gap-2
        "
      >

        {/* Campo de busca */}
        <div className="flex items-center border border-gray-200 rounded-md px-2 py-1.5 gap-2">

          {/* Ícone de lupa */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Input de texto para busca */}
          <input
            type="text"
            placeholder="Buscar..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Área dos filtros */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Select de dificuldade */}
          <CustomSelect
            value={filtroDificuldade}
            onChange={setFiltroDificuldade}
            options={dificuldades}
          />

          {/* Select de categoria */}
          <CustomSelect
            value={filtroCategoria}
            onChange={setFiltroCategoria}
            options={categorias}
          />

          {/* Botão para limpar todos os filtros */}
          <button
            onClick={onLimpar}
            className="text-xs text-gray-500 hover:text-gray-800 ml-auto"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente
export default Filter;