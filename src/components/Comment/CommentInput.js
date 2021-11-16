import React from "react";
import axios from "axios";

function getFormatDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    var hour = date.getHours();
    hour = hour >= 10 ? hour : '0' + hour;
    var minutes = date.getMinutes();
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    return year + '-' + month + '-' + day + ', at ' + hour + ':' + minutes;
}

function makeId(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    var hour = date.getHours();
    hour = hour >= 10 ? hour : '0' + hour;
    var minutes = date.getMinutes();
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    var seconds = date.getSeconds();
    var randInt = Math.floor(Math.random()*101)
    return year + month + day + hour + minutes + seconds + randInt;
}

class InputComments extends React.Component {
    inputComment = async event => {
        event.preventDefault();
        const checkLogin = window.localStorage.getItem('Login')

        if (checkLogin) {
            const username = window.localStorage.getItem('nickname')
            const articleId = this.props.data;
            const comment = {
                // 유저 id를 의미함.
                "id": parseInt(makeId(new Date())),
                "article_id": articleId,
                "name": username,
                "text": this.text.value,
                "date": getFormatDate(new Date()),
                "comment_date": Date()
            }

            await axios.post('https://t4lqrwfmpl.execute-api.ap-northeast-2.amazonaws.com/default/inputComment', { ...comment })
            // .then(res => {
            //     console.log(res);
            //     console.log(res.data);
            // })

            this.props.getInput(comment);
            this.text.value = "";
        }
    }

    render() {
        const username = window.localStorage.getItem('nickname')
        return (
            <div className="comment__form">
                <form onSubmit={this.inputComment}>
                        <div className="comment__username">
                            {username}
                        </div>
                        <textarea className="comment__text"
                        name="text" 
                        placeholder="leave a comment..."
                        required ref={(input) => this.text = input}>
                        </textarea>
                    <div className="comment__actions">
                        <button type="submit" >Post Comment</button>
                    </div>
                </form>
            </div>
        );
    } 
}

export default InputComments;