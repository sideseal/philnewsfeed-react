import React from "react";
import axios from "axios";
import Comment from './Comment'
import CommentInput from "./CommentInput";


class LoadComment extends React.Component {
    state = {
        isLoading: true,
        comments: [],
        apiResponse: null
    };

    getInput = (data) => {
        this.setState({
            comments: this.state.comments.concat(data)
        })
    }

    getComments = async () => {
        const articleId = this.props.data.state.id
        await axios.get("https://iknsm5uz03.execute-api.ap-northeast-2.amazonaws.com/default/getComments", { params: { article_id: articleId } })
        .then(resp => {
            const comments = resp.data.body;
            this.setState({ comments, isLoading: false, apiResponse: resp })
        })
    };

    componentDidMount() {
        this.getComments();
    }
    
    componentWillUnmount() {
    }

    componentDidUpdate() {
    }

    getCommentsCount(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }

    render() {
        const { isLoading, comments } = this.state;
        const data = this.props.data.state.id;
        const checkLogin = window.localStorage.getItem('Login')
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <>
                    {checkLogin? (
                        <div className="comment__input">
                            <CommentInput data={data} getInput={this.getInput} />
                        </div>
                    ) : (
                        <div className="need__login">
                            Need login to leave a comment.
                        </div>
                    )}
                    <h4>
                        {this.getCommentsCount(comments.length)}
                    </h4>
                    <div className="comments">
                        {comments
                        .sort((a, b) => new Date(b.comment_date) - new Date(a.comment_date))
                        .map((comment, i) => (
                            <Comment 
                            key={i} 
                            name={comment.name} 
                            date={comment.date} 
                            text={comment.text} />
                        ))}
                    </div>
                    </>
                )}
            </section>
        );
    }
}

export default LoadComment;