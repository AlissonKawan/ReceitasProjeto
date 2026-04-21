import Filter from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import receitasData from "./json/receitas.json";

function App(){
    return(
        <>
        <Header />
        <Filter />
        <RecipeList receitas={receitasData} />
        <Footer />
        </>
    )
} export default App;