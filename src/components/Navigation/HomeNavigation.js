import React from "react";
import { NavLink } from "react-router-dom";


function HomeNavigation() {
    const login = window.localStorage.getItem('Login')
    const Logout = () => {
        alert("Logout Success! Good Bye!")
    }
    if (login) {
        return (
            <>
                <div className="nav__Home">
                    <NavLink to="/">Home</NavLink>
                </div>
                <div className="nav__Logout">
                    <NavLink to="/logout" onClick={Logout}>Logout</NavLink>
                </div>
            </>
        );
    } 
    return (
            <>
                <div className="nav__Home">
                    <NavLink to="/">Home</NavLink>
                </div>
                <div className="nav__Login">
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                </div>
            </>
        );
}

export default HomeNavigation;