import React from "react";
import PropTypes from "prop-types";

function Comment({id,name,articleId,date,text}){
    return (
        <div className="comment">
                <div className="comment_data">
                    <h5 className="comment__name">{name} | {date} </h5>
                    <h5 className="comment__text">{text}</h5>
                    <hr></hr>
                </div>
        </div>
    );
}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    articleId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default Comment;