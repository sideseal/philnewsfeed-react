import React from "react";
import PropTypes from "prop-types";

function Article({name,title,published,link}){
    return (
        <div class="article">
            <div class="article__data">
                <h4><a href={link}>{title}</a></h4>
                <h5>{name} | {published}</h5>
            </div>
            <hr></hr>
        </div>
    );
}

Article.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default Article;