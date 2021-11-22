import axios from "axios";

async function CheckToken() {
    const tokenCheck = window.localStorage.getItem('Token');
    if (tokenCheck) {
        const token = tokenCheck.split(' ')[1];
        // const queryToken = token.split('.')[0];
        const resp = await axios.get("https://7c42fzd3b1.execute-api.ap-northeast-2.amazonaws.com/default/checkToken", { params: { token: token } });
        const secret = resp.data.body;
        const jwt = require("jsonwebtoken");
        jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
                const nickname = decoded.nickname;
                window.localStorage.setItem('nickname',nickname)
                window.localStorage.setItem('Login', true)
            } else {
                alert(err);
                alert('Please login again')
                window.localStorage.clear();
                delete axios.defaults.headers.common['Authorization'];
                // window.location.replace("/");
            }
        })
    }
}

export default CheckToken;