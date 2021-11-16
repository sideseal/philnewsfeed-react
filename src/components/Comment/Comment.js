import React from "react";
import PropTypes from "prop-types";

function Comment({name,date,text}){
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
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Comment;