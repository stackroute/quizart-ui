import React from 'react';
import Paper from 'material-ui/Paper';
import {red500, deepOrange400, teal500, blue500, grey800
} from './../../node_modules/material-ui/styles/colors';
import JeopardyGameplay from './JeopardyGameplay';

  const styles = {
    height: 20,
   width: 90, 
   margin: 70,
    textAlign: 'center',
     display: 'inline-block', 
     backgroundColor: red500
  }
class Timer extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      block : [0,1,2,3,4]
    }
  }
  componentDidMount() {
  this.timerID=  setInterval( function() 
    {
      this.state.block.pop();
        this.setState({block: this.state.block});
        
    }.bind(this), 1500);
  }
  render(){
    var change = this.state.block.map(function(data) {
     return (<Paper key = {data} style={styles} zDepth={2} />);
   }.bind(this));
    return(
      <div>
      {change}
      </div>
      );
  }
}
export default Timer;
