import React from "react";
import axios from "axios";
import Comment from '../components/Comment'
import CommentInput from "./CommentInput";

class CommentBox extends React.Component {
    state = {
        isLoading: true,
        comments: [],
    };

    getInput = (data) => {
        this.setState({
            comments: this.state.comments.concat(data)
        })
    }

    getComments = async () => {
        const articleId = this.props.data.state.id
        const { data: { body } } = await axios.get("https://iknsm5uz03.execute-api.ap-northeast-2.amazonaws.com/default/getComments", { params: { article_id: articleId } });
        const comments = body
        this.setState({ comments, isLoading: false })
    };

    componentDidMount() {
        this.getComments();
    }

    render() {
        const {isLoading, comments } = this.state;
        const data = this.props.data.state.id;
        return (
            <>
            <div className="comment__input">
                <CommentInput data={data} getInput={this.getInput}/>
            </div>
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="comments">
                        {comments.map(comment => (
                            <Comment 
                            key={comment.id} 
                            id={comment.id} 
                            name={comment.name} 
                            articleId={comment.article_id} 
                            date={comment.date} 
                            text={comment.text} />
                        ))}
                    </div>
                )}
            </section>
            </>
        );
    }
}

export default CommentBox;