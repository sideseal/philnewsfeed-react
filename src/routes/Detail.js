import React from "react";
import CommentBox from '../components/Comment/CommentBox';
import CommentNavigation from '../components/Navigation/CommentNavigation'

class Detail extends React.Component{
    componentDidMount(){
        const { location, history } = this.props;
        if (location.state === undefined){
            history.push("/");
        }
    }

    componentWillUnmount(){
        let page = Number(window.sessionStorage.getItem('currentPage'));
        window.sessionStorage.setItem('currentPage', page+1);
        this.props.history.push({
            pathname: `/page/${page + 1}`,
        });
    }

    render() {
        const { location } = this.props;
        const data = this.props.location;
        return (
            <>
                <CommentNavigation />
                <div className="detail__article">
                    <h3><a href={location.state.link}>{location.state.title}</a></h3>
                    <h4>{location.state.name} | {location.state.published}</h4>
                </div>
                <div className="comment__box">
                    <CommentBox data={data}/>
                </div>
            </>
        );
    }
}

export default Detail;