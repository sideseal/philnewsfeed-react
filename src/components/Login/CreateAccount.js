import React from "react";
import axios from "axios";


class createAccount extends React.Component {
    // nickname, email valid 확인을 해야 한다.
    // const re = /^[0-9\b]+$/; / re.test(this.name.value) 이런 식으로... 
    accountInput = event => {
        event.preventDefault();
        
        if (this.password.value === this.check__password.value) {
            const password = this.password.value;

            const bcrypt = require('bcryptjs');
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const loginInfo = {
                "nickname": this.nickname.value,
                "email": this.email.value,
                "password": hash,
            }

            const postInfo = () =>{
                try {
                    return axios.post('https://hrvewl1sg1.execute-api.ap-northeast-2.amazonaws.com/default/userCreateAccount', { ...loginInfo })
                } catch (error) {
                    alert(error.message);
                    console.error(error);
                }
            };

            const getResponse = () => {
                postInfo()
                .then(response => {
                    if (response.data.statusCode === 200) {
                        alert("Create Account Success! Please Login Again.");
                        this.nickname.value = "";
                        this.email.value = "";
                        this.password.value = "";
                        this.check__password.value = "";
                        this.props.history.push("/login");
                    } else {
                        alert(response.data.errorMessage);
                        this.nickname.value = "";
                        this.email.value = "";
                        this.password.value = "";
                        this.check__password.value = "";
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            };

            getResponse();

        } else {
            alert("Incorrect Password");
            this.password.value = "";
            this.check__password.value = "";
        }
        
    }

    render() {
        return (
            <>
                <div className="create__form">
                    <form onSubmit={this.accountInput}>
                        <div className="nickname__info">
                            Nickname should be at least 2 characters to at most 10 characters.
                        </div>
                        <input className="nickname__form"
                        name="nickname"
                        placeholder="enter your nickname"
                        required ref={(input) => this.nickname = input}>
                        </input><br></br>
                        <input className="email__form"
                            name="email"
                            placeholder="enter your email"
                            required ref={(input) => this.email = input}>
                        </input><br></br>
                        <input className="password__form"
                            name="password"
                            placeholder="enter your password"
                            required ref={(input) => this.password = input}>
                        </input><br></br>
                        <input className="check__password__form"
                            name="check__password"
                            placeholder="enter your password again"
                            required ref={(input) => this.check__password = input}>
                        </input><br></br>
                        <div className="create__action">
                            <button type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default createAccount;