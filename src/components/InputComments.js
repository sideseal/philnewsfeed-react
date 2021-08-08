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
    state = {
        name: '',
        text: '',
    }

    handleChange = event => {
        this.setState({
            name: event.target.value,
            text: event.target.value
        });
    }

    inputComments = event => {
        event.preventDefault();
        const articleId = this.props.data.state.id
        const user = {
            // id는 임시 고정. 유저 id를 의미함.
            "id": 3,
            "article_id": articleId,
            "name": this.state.name,
            "text": this.state.text,
            "date": getFormatDate(new Date())
        }

        axios.post('https://t4lqrwfmpl.execute-api.ap-northeast-2.amazonaws.com/default/inputComment', { ...user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <>
                <div className="comment__input">
                    <form onSubmit={this.inputComments}>
                        <label>
                            <input
                            type="text"
                            name="name"
                            placeholder="user name"
                            onChange={this.handleChange} />
                            <input 
                            type="text" 
                            name="text" 
                            placeholder="leave a comment..."
                            onChange={this.handleChange} />
                        </label>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </>
        )
    }

}

export default InputComments;