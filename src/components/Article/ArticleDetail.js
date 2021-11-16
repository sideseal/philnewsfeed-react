import React from "react";
import { useLocation } from "react-router-dom";
import LoadComment from "../Comment/LoadComment"

function ArticleDetail(){
    const location = useLocation();
    const data = location.state;
    return (
       <div className="detail__data">
           <h3 className="detail__title"><a href={data.link}>{data.title}</a></h3>
           <h4 className="detail__info">{data.name} | {data.published}</h4>
        <LoadComment data={location} />
       </div>
    )
}

export default ArticleDetail;