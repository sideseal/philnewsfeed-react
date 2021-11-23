import React from "react";
import { NavLink } from "react-router-dom";


function HomeNavigation(data) {
    const login = window.localStorage.getItem('Login');
    const nickname = window.localStorage.getItem('nickname');
    const Logout = () => {
        alert("Logout Success! Good Bye!")
    }
    const pageChange = () => {
        data.props.history.push(`/`);
        window.location.reload();
    }
    if (login) {
        return (
            <>
                <div className="nav__Home">
                    <NavLink to="/" onClick={pageChange}>Home</NavLink>
                </div>
                <div className="nav__Logout">
                    <NavLink to="/logout" onClick={Logout}>Logout</NavLink>
                </div>
                <div className="nickname">Welcome, {nickname}</div>
            </>
        );
    } 
    return (
            <>
                <div className="nav__Home">
                    <NavLink to="/" onClick={pageChange}>Home</NavLink>
                </div>
                <div className="nav__Login">
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                </div>
                <div className="nickname">Please Login</div>
            </>
        );
}

export default HomeNavigation;