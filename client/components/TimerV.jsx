import React from 'react'
import Paper from 'material-ui/Paper'
import ScorecardAdaptive from './ScorecardAdaptive'
import {redA700, deepOrange400, teal500, blue500, grey900,pinkA200,blue900} from './../../node_modules/material-ui/styles/colors';
/*-----------------------------------End of importing--------------------------------------------------*/
/*-----------------------------------Start Timer progress for count time-------------------------------*/
const styles2 = {

 height: 4,
 width: 4,
 margin: 1,

/*
 height: 15,
 width: 10,
 margin: 2,*/

 textAlign: 'center',
 display: 'inline-block',
}
var timer=0;
class TimerSpeed extends React.Component
{
 constructor(props){
   super(props);
   this.state = {
     block : this.props.blocks,
     interval : ''
   }
 }

 componentDidMount() {
  timer=this.props.timeLimit;
    this.setState({
      interval : setInterval( function()
    {
      this.state.block.pop();
      this.setState({block: this.state.block});
    }.bind(this),timer)
  });
 }


 componentWillUnmount() {
   clearInterval(this.state.interval);
 }
 render(){
   var change = this.state.block.map(function(data) {
    return (<Paper key = {data} style={styles2} zDepth={2} />);
  }.bind(this));
   return(
    <center>
     <div>
     {change}
     </div>
     </center>
     );
 }
}
export default TimerSpeed;
