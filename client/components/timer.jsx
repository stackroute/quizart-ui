import React from 'react'
import Paper from 'material-ui/Paper'
import {redA700, deepOrange400, teal500, blue500, grey900,pinkA200,blue900} from './../../node_modules/material-ui/styles/colors';
/*-----------------------------------End of importing--------------------------------------------------*/ 

/*-----------------------------------Start Timer progress for count time-------------------------------*/ 
const styles2 = {
 height: 15,
 width: 10, 
 margin: 3,
 textAlign: 'center',
 display: 'inline-block', 


}
var timer=1000;
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
  //console.log(this.props.timelimit);
  timer=this.props.timelimit/15;
  console.log(timer);
    this.setState({
      interval : setInterval( function() 
    {
     //console.log(timer);
      this.state.block.pop();

      if(this.state.block.length==0)
      {
       this.setState({block : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]});
      }
      this.setState({block: this.state.block});
    }.bind(this),timer)
  });
 }

 componentWillMount() {
   clearInterval(this.state.intervalId);
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