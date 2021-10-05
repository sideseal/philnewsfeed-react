import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    const checkLogin = window.localStorage.getItem('Login');
    if (checkLogin) {
        return (
            <div className="nav">
                <Link to="/">Home</Link>
            </div>
        );
    } else {
        return (
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        );
    }
    
}

export default Navigation;