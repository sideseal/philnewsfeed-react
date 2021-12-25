import React from 'react';
import './index.css'

const Snowflake = (props) => {
    return(
        <p 
        className='Snowflake'
        id={`items${props.id}`}
        style={props.style}>
            *
        </p>
    )
}

class Snow extends React.Component {
    snow=()=>{
        let animationDelay = '0s';
        let fontSize = '100px';
        let arr = Array.from(
            'Snowflakes are awesome!!! I love snowflake, as long as this list, there are much snow here!\
            Snowflakes are awesome!!! I love snowflake, as long as this list, there are much snow here!'
            )
        return arr.map((el, i)=>{
            animationDelay = `${(Math.random()*16).toFixed(2)}s`;
            fontSize = `${(Math.floor(Math.random()*10) + 10)}px`;
            let style = {
                animationDelay,
                fontSize
            }
            return (<Snowflake key={i} id={i} style={style} />)
        })
    }

    render(
    ) {
        return(
            <div className='App'>
                {this.snow()}
            </div>
        )
    }
}

export default Snow
