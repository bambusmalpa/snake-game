import React, { Component } from 'react'

export class Snake extends Component {
    


    render(){

        return(
           
           

            <div>
              {this.props.snakeBody.map((el,index)=>{
                  return(
                      <div key={index} className="snakePart" style={{left:`${el[0]*this.props.tailSize}%`,
                      top:`${el[1]*this.props.tailSize}%`,
                        width:`${this.props.tailSize}%`,
                        height:`${this.props.tailSize}%`,
                      }}></div>
                  )
              })

              }


            </div>
        )
    }
}

export default Snake
