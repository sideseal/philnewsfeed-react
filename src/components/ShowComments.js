import React from "react";
import axios from "axios";
import Comment from './components/Comment'

class ShowComments extends React.Component {
    state = {
        isLoading: true,
        comments: []
    };

    getComments = async () => {
        const { data: { body } } = await axios.get("", { params: { id: id } });
        const comments = body
        this.setState({ comments, isLoading: false })
    };

    componentDidMount() {
        this.getComments();
    }

    render() {
        const {isLoading, comments } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="comments">
                        {comments.map(comment => (
                            <Comment key={comment.id} id={comment.id} name={comment.name} articleId={comment.articleId} date={comment.date} text={comment.text} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default ShowComments;