import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    render() {
        return (
        <>
            <div className="login">
                Login page
            </div>
            <div className="register__page">
                <Link to="/register">Create Account</Link>
            </div>
        </>
        );
    }
}

export default Login;