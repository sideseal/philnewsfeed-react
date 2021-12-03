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
            <div class="sticky top-20 md:top-28 z-50 flex justify-end items-center">
                <div class="text-red-600 p-2">
                    <NavLink to="/" onClick={pageChange}>Home</NavLink>
                </div>
                <div class="text-red-600 p-2">
                    <NavLink to="/setting/logout" onClick={Logout}>Logout</NavLink>
                </div>
                <div class="text-red-600 text-opacity-50 p-2">Welcome, {nickname}</div>
            </div>
            </>
        );
    } 
    return (
            <>
            <div class="sticky bg-gray-700 top-20 md:top-28 z-50 flex justify-end items-center">
                <div class="text-red-600 p-2">
                    <NavLink to="/" onClick={pageChange}>Home</NavLink>
                </div>
                <div class="text-red-600 p-2">
                    <NavLink to="/setting/login">Login</NavLink>
                </div>
                <div class="text-red-600 text-opacity-50 p-2">Please login</div>
            </div>
        </>
    );
}

export default HomeNavigation;