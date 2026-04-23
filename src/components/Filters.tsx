// importa hooks do react
// useState → estado
// useRef → referência de elemento no DOM
// useEffect → efeitos colaterais (tipo escutar eventos)
import { useState, useRef, useEffect } from "react";


// tipagem das props do componente Filter
// basicamente tudo vem do componente pai
type Props = {
    termoBusca: string; // texto digitado na busca
    setTermoBusca: (v: string) => void; // função pra atualizar busca

    filtroDificuldade: string;
    setFiltroDificuldade: (v: string) => void;

    filtroCategoria: string;
    setFiltroCategoria: (v: string) => void;
};


// lista fixa de dificuldades (usada no select)
const dificuldades = ["Todas as dificuldades", "Fácil", "Média", "Difícil"];

// lista fixa de categorias
const categorias = ["Todas as categorias", "Prato Principal", "Bebida", "Sobremesa", "Salada"];


// componente reutilizável de select customizado
// substitui <select> padrão do html
function CustomSelect({
    value,     // valor atual selecionado
    onChange,  // função chamada quando muda
    options,   // lista de opções
    label,     // texto padrão
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
    label: string;
}) {

    // controla se o dropdown está aberto ou fechado
    const [open, setOpen] = useState(false);

    // referência para o container do select
    const ref = useRef<HTMLDivElement>(null);


    // efeito que detecta clique fora do select
    // serve pra fechar o dropdown automaticamente
    useEffect(() => {

        function handleClick(e: MouseEvent) {
            // se clicou fora do elemento
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false); // fecha o dropdown
            }
        }

        // adiciona listener no documento inteiro
        document.addEventListener("mousedown", handleClick);

        // cleanup → remove o listener quando componente desmonta
        return () => document.removeEventListener("mousedown", handleClick);

    }, []); // [] = roda só uma vez (quando monta)


    return (
        // container com position relative (pra posicionar dropdown)
        <div ref={ref} className="relative">

            {/* botão principal do select */}
            <button
                onClick={() => setOpen(!open)} // abre/fecha dropdown
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >

                {/* mostra label ou valor selecionado */}
                <span>{value === options[0] ? label : value}</span>

                {/* seta (ícone) */}
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>


            {/* dropdown (só aparece se open = true) */}
            {open && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-full">

                    {/* percorre todas opções */}
                    {options.map((opt) => (
                        <button
                            key={opt}

                            // quando clicar:
                            onClick={() => {
                                onChange(opt); // atualiza valor no pai
                                setOpen(false); // fecha dropdown
                            }}

                            // estilização dinâmica
                            className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                value === opt ? "text-gray-900 font-medium" : "text-gray-700"
                            }`}
                        >

                            {/* nome da opção */}
                            <span>{opt}</span>

                            {/* se for selecionado, mostra check */}
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


// componente principal de filtros
function Filter({
    termoBusca,
    setTermoBusca,
    filtroDificuldade,
    setFiltroDificuldade,
    filtroCategoria,
    setFiltroCategoria,
}: Props) {

    // função para resetar todos os filtros
    const limparFiltros = () => {
        setTermoBusca(""); // limpa busca
        setFiltroDificuldade("Todas as dificuldades");
        setFiltroCategoria("Todas as categorias");
    };


    return (
        // container geral
        <div className="flex justify-center px-4 pt-6 pb-2">

            {/* caixa dos filtros */}
            <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-3xl flex flex-col gap-3">

                {/* campo de busca */}
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2">

                    {/* ícone de lupa */}
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    {/* input de texto */}
                    <input
                        type="text"
                        placeholder="Buscar receitas..."
                        value={termoBusca} // valor controlado
                        onChange={(e) => setTermoBusca(e.target.value)} // atualiza estado
                        className="flex-1 outline-none text-gray-700 text-sm"
                    />
                </div>


                {/* filtros (dropdowns + botão limpar) */}
                <div className="flex items-center gap-3 flex-wrap">

                    {/* filtro por dificuldade */}
                    <CustomSelect
                        value={filtroDificuldade}
                        onChange={setFiltroDificuldade}
                        options={dificuldades}
                        label="Todas as dificuldades"
                    />

                    {/* filtro por categoria */}
                    <CustomSelect
                        value={filtroCategoria}
                        onChange={setFiltroCategoria}
                        options={categorias}
                        label="Todas as categorias"
                    />

                    {/* botão limpar filtros */}
                    <button
                        onClick={limparFiltros}
                        className="text-sm text-gray-500 hover:text-gray-800 transition-colors ml-auto"
                    >
                        Limpar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
}


// exporta o componente
export default Filter;