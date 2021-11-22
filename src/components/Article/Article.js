import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Article({page,id,name,title,published,link,comments,tags}){
    return (
            <div className="article__data">
                <h4 className="article__title">
                <a href={link}>{title}</a></h4>
                <h5 className="article__info">{name} | {published} | {tags}</h5>
                <div className="article__comment">
                    <Link
                        to={{
                            pathname: `/${page}/article/${id}`,
                            state: {
                                page: page,
                                id: id,
                                name: name,
                                title: title,
                                published: published,
                                link: link,
                                comments: comments,
                            }
                        }}
                    >
                    <h5 className="article__detail">{comments} comments</h5>
                    </Link>
                </div>
            <hr></hr>
        </div>
    );
}

Article.propTypes = {
    page: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    comments: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
};

export default Article;