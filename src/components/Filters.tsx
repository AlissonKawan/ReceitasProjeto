import { useState } from "react";

type OpcaoFiltro = "todos" | "pratos-principais" | "saladas" | "sobremesas" | "bebidas";

function Filter() {

    const [termoBusca, setTermoBusca] = useState("");
    const [filtro, setFiltro] = useState<OpcaoFiltro>("todos");

    return(
        <>
            <div className="flex justify-center py-10">
                <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-2 w-full max-w-lg gap-2">
                    <input type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="flex-1 outline-none text-gray-700 px-2"
                    />

                    <select 
                        value={filtro}
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
export default Filter;