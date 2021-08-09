import React from "react";
import axios from "axios";

function getFormatDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

class InputComments extends React.Component {
    inputComment = event => {
        event.preventDefault();
        console.log(this.state)
        const articleId = this.props.data.state.id
        const comment = {
            // id는 임시 고정. 유저 id를 의미함.
            "id": 3,
            "article_id": articleId,
            "name": this.name.value,
            "text": this.text.value,
            "date": getFormatDate(new Date())
        }

        axios.post('https://t4lqrwfmpl.execute-api.ap-northeast-2.amazonaws.com/default/inputComment', { ...comment })
            // .then(res => {
            //     console.log(res);
            //     console.log(res.data);
            // })
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
                            <button type="submit">Post Comment</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

}

export default InputComments;