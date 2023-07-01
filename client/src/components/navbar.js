import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const nav = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        nav("/auth");
    };
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/add-recipe">Add Recipe</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            {!cookies.access_token ? (
                <Link to="/auth">Login/Register</Link>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;
