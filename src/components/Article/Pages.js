import React from "react";
// import { Link } from "react-router-dom";
import Article from "./Article";

function Page({page,articles}){
    const startPage = (parseInt(page) - 1) * 15;
    const endPage = (parseInt(page) * 15) - 1
    const pageArticles = articles.slice(startPage, endPage)
    return (
        <div className="articles">
            {pageArticles.map(article => (
                <Article 
                    key={article.id} 
                    page={page} 
                    id={article.id} 
                    name={article.name} 
                    title={article.title} 
                    published={article.published} 
                    link={article.link} 
                    comments={article.comments} 
                    tags={article.tags} 
                />
            ))}
        </div>
    )
}

export default Page;