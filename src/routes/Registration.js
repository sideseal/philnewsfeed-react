import React from "react";
import CreateAccount from "../components/Login/CreateAccount";

class Registration extends React.Component{
    render() {
        return (
            <div className="register">
                <CreateAccount history={this.props.history}/>
            </div>
        );
    }
}

export default Registration;