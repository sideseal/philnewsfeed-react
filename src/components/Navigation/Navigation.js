import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    const login = window.localStorage.getItem('Login')
    const Logout = () => {
        alert("Logout Success! Good Bye!")
    }
    if (login) {
        return (
            <>
                <div className="nav__Home">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav__Logout">
                    <Link to="/logout" onClick={Logout}>Logout</Link>
                </div>
            </>
        );
    } 
    return (
            <>
                <div className="nav__Home">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav__Login">
                    <Link to="/login">Login</Link>
                </div>
            </>
        );
}

export default React.memo(Navigation);