// Hook do React → serve pra guardar coisas que mudam (estado)
import { useState } from "react";


// Aqui você criou um tipo fechado
// Ou seja: só pode ser UM desses valores (evita erro)
type OpcaoFiltro = 
  | "todos" 
  | "pratos-principais" 
  | "saladas" 
  | "sobremesas" 
  | "bebidas";


// Componente de filtro (busca + select)
function Filter() {
    
    // Guarda o que o usuário digita no input
    const [termoBusca, setTermoBusca] = useState("");

    // Guarda qual filtro foi selecionado
    // começa em "todos"
    const [filtro, setFiltro] = useState<OpcaoFiltro>("todos");


    return(
        <>
            {/* essa div só centraliza tudo */}
            <div className="flex justify-center py-10">

                {/* caixinha branca do filtro */}
                <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-2 w-full max-w-lg gap-2">

                    {/* INPUT DE BUSCA */}
                    <input 
                        type="text"
                        placeholder="Pesquisar..."
                        
                        // valor controlado pelo React
                        value={termoBusca}

                        // toda vez que digita, atualiza o estado
                        onChange={(e) => setTermoBusca(e.target.value)}

                        className="flex-1 outline-none text-gray-700 px-2"
                    />

                    {/* SELECT (filtro por categoria) */}
                    <select 
                        value={filtro}

                        // pega o valor selecionado e salva no estado
                        // o "as OpcaoFiltro" força o tipo (TypeScript)
                        onChange={(e) => setFiltro(e.target.value as OpcaoFiltro)}

                        className="bg-gray-100 text-gray-700 rounded-lg px-2 py-1 outline-none"
                    >
                        <option value="todos">Todos</option>
                        <option value="pratos-principais">Pratos Principais</option>
                        <option value="saladas">Saladas</option>
                        <option value="sobremesas">Sobremesas</option>
                        <option value="bebidas">Bebidas</option>
                    </select>

                </div>
            </div>
        </>
    )
}

// exporta o componente
export default Filter;