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

class InputComments extends React.Component {
    inputComment = event => {
        event.preventDefault();
        const articleId = this.props.data;
        const comment = {
            // id는 임시 고정. 유저 id를 의미함.
            "id": 3,
            "article_id": articleId,
            "name": this.name.value,
            "text": this.text.value,
            "date": getFormatDate(new Date()),
            "comment_date": Date()
        }

        axios.post('https://t4lqrwfmpl.execute-api.ap-northeast-2.amazonaws.com/default/inputComment', { ...comment })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

        this.props.getInput(comment);
        this.name.value = "";
        this.text.value = "";
    }

    render() {
        return (
            <>
                <div className="comment__form">
                    <form onSubmit={this.inputComment}>
                            <input
                            name="name"
                            placeholder="Name"
                            required ref={(input) => this.name = input}>
                            </input><br></ br>
                            <textarea 
                            name="text" 
                            placeholder="leave a comment..."
                            required ref={(input) => this.text = input}>
                            </textarea>
                        <div className="comment__actions">
                            <button type="submit" >Post Comment</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

}

export default InputComments;