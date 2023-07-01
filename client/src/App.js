import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import { Auth } from "./pages/Auth.js";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from "./pages/SavedRecipes.js";
import Navbar from "./components/navbar.js";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/add-recipe" element={<CreateRecipe />} />
                    <Route path="/saved-recipes" element={<SavedRecipes />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
