import React from "react";

class Detail extends React.Component{
    componentDidMount(){
        const { location, history } = this.props;
        console.log(location.state);
        if (location.state === undefined){
            history.push("/");
        }
    }
    render(){
        const { location } = this.props;
        return (
            <div className="detail__article">
                <h3><a href={location.state.link}>{location.state.title}</a></h3>
                <h4>{location.state.name} | {location.state.published}</h4>
            </div>
        );
    }
}

export default Detail;