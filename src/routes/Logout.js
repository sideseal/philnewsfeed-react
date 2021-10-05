import React from "react";
import { Redirect } from "react-router";

function Logout() {
    window.localStorage.clear();
    return <Redirect to='/' />
}

export default Logout;