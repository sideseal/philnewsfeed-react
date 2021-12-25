import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Article({page,id,name,title,published,link,comments,tags}){
    return (
            <div class="p-3 block">
                <p class="md:text-xl text-xl">
                    <a href={link}>{title}</a>
                </p>
                <p class="text-sm inline-block">{name} | {published} | {tags} </p>
                    <div class="inline-block">
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
                        <div class="text-sm ml-0 p-1">
                            <p class="">:: {comments} comments</p>
                        </div>
                    </Link>
                </div>
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