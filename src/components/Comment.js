import React from "react";

class Comment extends React.Component {
    constructor() {
        super();
        this.inputCommentRef = React.createRef();
        this.state = {
            comments: []
        }
    }

    inputComments = (e) => {
        e.preventDefault()
        const commentBox = [...this.state.comments]
        // for test
        commentBox.push({id: Date.now(), user: "test", content:this.inputCommentRef.current.value})
        this.setState({comments : commentBox})
        this.inputCommentRef.current.value = ""
    }

    render() {
        return (
            <>
                <ul className="article__comments">
                    {this.state.comments.map((c) => (
                        <li>{c.user}: {c.content}</li>
                    ))}
                </ul>
                <div className="comment__container">
                    <form onSubmit={this.inputComments}>
                        <input
                            type="text"
                            className="comment__input"
                            placeholder="leave a comment..."
                            ref={this.inputCommentRef}
                        />
                        <button className="comment__upload">submit</button>
                    </form>
                </div>
            </>
        );
    }
}

export default Comment;