import React from 'react'

class Apple extends React.Component{

    render(){
        const style={
            width:`${this.props.tailSize}%`,
            height:`${this.props.tailSize}%`,
            top:`${this.props.applePosition[1]*this.props.tailSize}%`,
            left:`${this.props.applePosition[0]*this.props.tailSize}%`,
        }
        return(
            <div className="apple" style={style}></div>
        )
    }

}

export default Apple