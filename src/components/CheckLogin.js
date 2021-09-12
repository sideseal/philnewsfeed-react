import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class CheckLogin extends React.Component {
    state = {
        redirect: false
    }
    checkUser = event => {
        event.preventDefault();

        const email = this.email.value

        const loginInfo = async () => {
            try {
                return axios.get('https://lia1dk4nze.execute-api.ap-northeast-2.amazonaws.com/default/userCheckLogin', {params: { email: email }});
            } catch (error) {
                alert(error.message);
                console.error(error);
            }
        };
        
        const checkLogin = () => {
            loginInfo()
            .then(response => {
                if (response.data.statusCode === 200) {
                    const userInfo = response.data.body[0]
                    const password = this.password.value
                    const userPassword = userInfo.password

                    const bcrypt = require('bcryptjs')
                    const result = bcrypt.compareSync(password, userPassword)
                    if (result === true) {
                        alert("Login Success! Welcome to PhillNewsFeed!")

                        const jwt = require("jsonwebtoken")
                        const SECRET_TOKEN = userInfo.SECRET_TOKEN;
                        const token = jwt.sign({ id: userInfo.id, nickname: userInfo.nickname}, SECRET_TOKEN, {expiresIn: "2d"});
                        const postUserToken = {
                            'id': userInfo.id,
                            'nickname': userInfo.nickname,
                            'token': token
                        }
                        axios.post('https://mupq91eq93.execute-api.ap-northeast-2.amazonaws.com/default/userPostToken', {...postUserToken})
                        .then(resp => {
                            // onLoginSuccess(resp);
                            const accessToken = resp.data.body;
                            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                            this.setState({ redirect: true });
                        }).catch(error => {
                            console.error(error);
                        })

                        // this.props.data.history.push("/");
                    } else {
                        alert("The Password is Different")
                        this.email.value = "";
                        this.password.value = "";
                    }
                } else {
                    alert(response.data.errorMessage);
                    this.email.value = "";
                    this.password.value = "";
                }
            })
            .catch(error => {
                alert(error.message);
                console.log(error);
            })
        }

        checkLogin();
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />
        }
        return (
            <>
                <div className="login__form">
                    <form onSubmit={this.checkUser}>
                        <input
                            name="email"
                            placeholder="enter your email"
                            required ref={(input) => this.email = input}>
                        </input><br></br>
                        <input
                            name="password"
                            placeholder="enter your password"
                            required ref={(input) => this.password = input}>
                        </input><br></br>
                        <div className="login__action">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default CheckLogin;