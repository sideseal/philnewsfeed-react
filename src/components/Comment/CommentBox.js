import React from "react";
import axios from "axios";
import Comment from './Comment'
import CommentInput from "./CommentInput";


class CommentBox extends React.Component {
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
        const { isLoading, comments, apiResponse } = this.state;
        const data = this.props.data.state.id;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <>
                    <div className="comment__input">
                        <CommentInput data={data} resp={apiResponse} getInput={this.getInput} />
                    </div>
                    <h4>
                        {this.getCommentsCount(comments.length)}
                    </h4>
                    <div className="comments">
                        {comments
                        .sort((a, b) => new Date(b.comment_date) - new Date(a.comment_date))
                        .map((comment, i) => (
                            <Comment 
                            key={i} 
                            id={comment.id} 
                            name={comment.name} 
                            articleId={comment.article_id} 
                            date={comment.date} 
                            text={comment.text}
                            comment_date={comment.comment_date} />
                        ))}
                    </div>
                    </>
                )}
            </section>
        );
    }
}

export default CommentBox;