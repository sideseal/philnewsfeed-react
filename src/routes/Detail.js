import React from "react";
import InputComments from '../components/InputComments';
import ShowComments from '../components/ShowComments';

class Detail extends React.Component{
    componentDidMount(){
        const { location, history } = this.props;
        if (location.state === undefined){
            history.push("/");
        }
    }
    render(){
        const { location } = this.props;
        const data = this.props.location;
        return (
            <div className="detail__article">
                <h3><a href={location.state.link}>{location.state.title}</a></h3>
                <h4>{location.state.name} | {location.state.published}</h4>
                {/* This is Comment Section Below */}
                <InputComments data={data}/>
                <ShowComments data={data}/>
            </div>
        );
    }
}

export default Detail;