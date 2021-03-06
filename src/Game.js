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
    applePosition:randomPosition(),
    snakeBody:[[5,10],[6,10],[7,10]],
    
  }

  
  

  componentDidMount=()=>{
    setInterval(this.snakeMove,this.state.speed)
    
    document.onkeydown= this.buttonPressed
    

  }
  componentDidUpdate=()=>{
    this.checkWallColission();
    this.checkAppleColission();
    this.checkSelfCollision();
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
    let head=this.state.snakeBody[this.state.snakeBody.length-1];
    let body= [...this.state.snakeBody];
    

    for(let i=body.length-2;i>=0;i--){
      if(body[i][0]===head[0]&&body[i][1]===head[1]){
        this.gameOver()
      }
    }

    
    
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
   console.log(e)
    this.cheangeDirection(e.keyCode)
  }

  virtualButtonPressed=(code)=>{
    console.log(code)
    this.cheangeDirection(code)
  }

  cheangeDirection=(direction)=>{
    switch (direction){
      case 38:
        if(this.state.moveDirection==="S")
        {return}
        else{
        this.setState({
          moveDirection:"N"
        });}
        break;

      case 40:
        if(this.state.moveDirection==="N")
        {return}
        else{
        this.setState({
          moveDirection:"S"
        });}
        break;

      case 37:
        if(this.state.moveDirection==="E")
        {return}
        else{
        this.setState({
          moveDirection:"W"
        });}
        break;

      case 39:
        if(this.state.moveDirection==="W")
        {return}
        else{
        this.setState({
          moveDirection:"E"
        });}
        break;
      default:
        return
    }
  }

  gameOver=()=>{
    
   alert(`Game over, You have ${this.state.snakeBody.length} points!`)
   this.setState({
    moveDirection:"E",
    speed:500,
    snakeBody:[[5,10],[6,10],[7,10]],
    applePosition:randomPosition()
  })
  }
  
  
  render(){
    
  return (
    <div className="scene">
    <div className="pad left">
      <button className="btn" onClick={()=>this.virtualButtonPressed(38)}>UP</button>
      <button className="btn" onClick={()=>this.virtualButtonPressed(37)}>LEFT</button>
    </div>
    <div className="pad center">
    <div className="board" style={{width:`${boradSize}px`, height:`${boradSize}px`}}>
      
      <Snake tailSize={tailSize}snakeBody={this.state.snakeBody}/>
      <Apple tailSize={tailSize} applePosition={this.state.applePosition}/>
    </div>
    </div>
    <div className="pad right">
      <button className="btn" onClick={()=>this.virtualButtonPressed(39)}>RIGHT</button>
      <button className="btn" onClick={()=>this.virtualButtonPressed(40)}>DOWN</button>
    </div>
    </div>
  )
}}

export default Game;
