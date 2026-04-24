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

const dificuldades = ["Todas as dificuldades", "Fácil", "Média", "Difícil"];
const categorias = ["Todas as categorias", "Prato Principal", "Bebida", "Sobremesa", "Salada"];

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
        className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        <span>{value}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-full">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                value === opt ? "text-gray-900 font-medium" : "text-gray-700"
              }`}
            >
              <span>{opt}</span>
              {value === opt && (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
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
    <div className="flex justify-center px-4 pt-6 pb-2">
      <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-3xl flex flex-col gap-3">

        {/* Buscagem */}
        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar receitas..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="flex-1 outline-none text-gray-700 text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          <CustomSelect value={filtroDificuldade} onChange={setFiltroDificuldade} options={dificuldades} />
          <CustomSelect value={filtroCategoria} onChange={setFiltroCategoria} options={categorias} />
          <button
            onClick={onLimpar}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors ml-auto"
          >
            Limpar Filtros
          </button>
        </div>

      </div>
    </div>
  );
}

export default Filter;