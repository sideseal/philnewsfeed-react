import React from "react";
import axios from "axios";
import { Redirect } from "react-router";

function Logout() {
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    return <Redirect to='/' />
}

export default Logout;