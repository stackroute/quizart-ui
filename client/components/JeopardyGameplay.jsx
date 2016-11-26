import React from  'react';
import superagent from 'superagent';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Timer from './TimerV';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey900,blue300} from './../../node_modules/material-ui/styles/colors';
import {ListItem} from 'material-ui/List';

var options=[];
export default class JeopardyGameplay extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: [],
      choice:''
    };
    this.handleClick=this.handleClick.bind(this);
  }
  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  handleClick()
  {
  	if(this.state.choice=='')
  	{
      this.state.topic.map((topics => {
      for(var i=0;i<topics.options.length;i++)
      	{
      		options.push(<ListItem primaryText={topics.options[i]}/>);
 
      	}
    }));
  }

      this.setState({choice:options});
  }
  componentDidMount() {
    superagent
      .get('http://localhost:3000/topic?_limit=' + this.props.limit)
      .end((err, res) => {
        this.setState({topic: res.body});
      });
  }
  render() {
    const styles = {
      height: 180,
  	  width: 180
      }
    

    const topicStruct =  this.state.topic.map((topics => {
      return (
      	
      	<CardTitle title={topics.question}/>


      );
    }));


    return (
    <div>
    <center>
  		<Card style={{width:'80%',height:'60vh',backgroundColor:blue300}}>
	    {topicStruct}
		    <CardText>
	    		<FloatingActionButton backgroundColor={grey900} iconStyle={styles} onClick={this.handleClick}>
	      			<div style={{paddingTop:'25%' ,color: "white"}}> <h1> BUZZER </h1> </div>
	    		</FloatingActionButton>
	    		{this.state.choice}
		     </CardText>
     	      <Timer/>  
        </Card>
 	    </center>
      
	
	  </div>
   
    );
  }
}
