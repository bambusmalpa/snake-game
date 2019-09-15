import React from 'react';
import Snake from "./components/Snake";
import Apple from "./components/Apple";

const boradSize=500;
const tailSize=5;


const randomPosition=()=>{
  const x=Math.floor(Math.random()*boradSize/tailSize/tailSize)
  const y=Math.floor(Math.random()*boradSize/tailSize/tailSize)
  return [x,y]
}





class Game extends React.Component{
  state={
    moveDirection:"E",
    speed:500,
    snakeBody:[[5,10],[6,10],[7,10]],
    applePosition:randomPosition()
  }
  

  componentDidMount=()=>{
    setInterval(this.snakeMove,this.state.speed)
    
    document.onkeydown= this.buttonPressed
    

  }
  componentDidUpdate=()=>{
    this.checkWallColission();
    this.checkAppleColission();
  }
  
  snakeMove=()=>{
    
    let elements= [...this.state.snakeBody];
    let snakeHead=elements[elements.length-1]

    switch(this.state.moveDirection){
      case "N":
        snakeHead=[snakeHead[0],snakeHead[1]-1];
      break

      case "E":
          snakeHead=[snakeHead[0]+1,snakeHead[1]];
        break
      
      case "S":
          snakeHead=[snakeHead[0],snakeHead[1]+1];
        break
        
      case "W":
          snakeHead=[snakeHead[0]-1,snakeHead[1]];
      break;
      default:
          snakeHead=[snakeHead[0]+1,snakeHead[1]];
          break
      
    }

    elements.push(snakeHead)
    elements.shift()

    this.setState({
      snakeBody:elements
    })
  }

  checkWallColission=()=>{
    let eastWall=boradSize/tailSize/tailSize;
    let southWall=boradSize/tailSize/tailSize;
    let snakeHead=this.state.snakeBody[this.state.snakeBody.length-1]

    if(snakeHead[0]<0||snakeHead[0]>=eastWall||snakeHead[1]<0||snakeHead[1]>=southWall){
      this.gameOver()
    }
    
  }
  checkSelfCollision=()=>{
    let snakeHead=this.state.snakeBody[this.state.snakeBody.length-1];
    
  }
  checkAppleColission=()=>{
    
    let snakeHead=this.state.snakeBody[this.state.snakeBody.length-1]
 
    if(snakeHead[0]===this.state.applePosition[0]&&snakeHead[1]===this.state.applePosition[1]){
      this.eatApple()
      
    }
  }
  eatApple=()=>{
    let newTail=[this.state.applePosition]
    let body=[...this.state.snakeBody]
    body.unshift(newTail)
      console.log(body)
      this.setState({
        snakeBody:body,
        applePosition:randomPosition()
      })


  } 

  
 

  buttonPressed=(e)=>{
   
    switch (e.keyCode){
      case 38:
        this.setState({
          moveDirection:"N"
        });
        break;

      case 40:
        this.setState({
          moveDirection:"S"
        });
        break;

      case 37:
        this.setState({
          moveDirection:"W"
        });
        break;

      case 39:
        this.setState({
          moveDirection:"E"
        });
        break;
      default:
        return
    }
  }

  gameOver=()=>{
    
   alert("game over")
   this.setState({
    moveDirection:"E",
    speed:1000,
    snakeBody:[[5,10],[6,10],[7,10]],
    applePosition:randomPosition()
  })
  }
  
  
  render(){
    
  return (
    <div className="board" style={{width:`${boradSize}px`, height:`${boradSize}px`}}>
      
      <Snake tailSize={tailSize}snakeBody={this.state.snakeBody}/>
      <Apple tailSize={tailSize} applePosition={this.state.applePosition}/>
    </div>
  )
}}

export default Game;
