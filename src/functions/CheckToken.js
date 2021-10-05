import axios from "axios";

async function CheckToken(){
    const token = window.localStorage.getItem('token');
    if (token) {
        const queryToken = token.split('.')[0];
        const resp = await axios.get("https://7c42fzd3b1.execute-api.ap-northeast-2.amazonaws.com/default/checkToken", { params: { token: queryToken } });
        const secret = resp.data.body;
        
        const jwt = require("jsonwebtoken");
        jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
                const nickname = decoded.nickname;
                window.localStorage.setItem('nickname',nickname)
                window.localStorage.setItem('Login', true)
            } else {
                alert(err);
                console.log(err);
                window.localStorage.clear();
            }
        })
    }
}

export default CheckToken;