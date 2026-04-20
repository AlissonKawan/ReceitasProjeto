import type { Receita } from "./Receita";

type Props = {
    receita: Receita;
};

function RecipeCard({ receita }: Props) {
    return (
    <>
        <h2>{receita.nome}</h2>
    </>
    );
}
export default RecipeCard;