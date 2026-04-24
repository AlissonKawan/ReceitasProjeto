import { useRef, useEffect, useState } from "react";

type Props = {
  termoBusca: string;
  setTermoBusca: (v: string) => void;
  filtroDificuldade: string;
  setFiltroDificuldade: (v: string) => void;
  filtroCategoria: string;
  setFiltroCategoria: (v: string) => void;
  onLimpar: () => void;
};

const dificuldades = ["Todas", "Fácil", "Média", "Difícil"];
const categorias = ["Todas", "Prato Principal", "Bebida", "Sobremesa", "Salada"];

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 bg-white text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>{value}</span>
        <svg
          className={`w-3 h-3 text-gray-400 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow z-50 min-w-full">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
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
        {/* BUSCA */}
        <div className="flex items-center border border-gray-200 rounded-md px-2 py-1.5 gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            type="text"
            placeholder="Buscar..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* FILTROS */}
        <div className="flex items-center gap-2 flex-wrap">
          <CustomSelect
            value={filtroDificuldade}
            onChange={setFiltroDificuldade}
            options={dificuldades}
          />

          <CustomSelect
            value={filtroCategoria}
            onChange={setFiltroCategoria}
            options={categorias}
          />

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

export default Filter;