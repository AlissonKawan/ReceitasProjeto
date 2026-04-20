import receitasData from "../json/receitas.json";
import RecipeCard from "../components/RecipeCard";
import type { Receita } from "./Receita";

// tipando o JSON corretamente
const receitas: Receita[] = receitasData;

function RecipeList() {
    return (
    <div>
        {receitas.map((receita) => (
        <RecipeCard key={receita.id} receita={receita} />
        ))}
    </div>
    );
}

export default RecipeList;