import React from "react";
import { Link } from "react-router-dom";
import CheckLogin from '../components/Login/CheckLogin'

class Login extends React.Component {
    render() {
        const data = this.props;
        return (
        <>
            <div className="login">
                Login page
                <CheckLogin data={data}/>
            </div>
            <div className="register__page">
                <Link to="/register">Create Account</Link>
            </div>
        </>
        );
    }
}

export default Login;