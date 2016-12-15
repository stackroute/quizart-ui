import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import GamePlay from './GamePlay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JeopardyGameplay from './JeopardyGameplay';


var counter=0;
var openedCards=0;
export default class CardChild extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state={view:'points',cName:'NscaledCard',content:this.props.points,question:'Points',posTop:this.props.top,posLeft:this.props.posL,open:false};
    this.handleClick=this.handleClick.bind(this);

  }


  handleClick()
  {
    counter++;
    
    if(openedCards==29)
    {
      alert("opened all the cards");
    }
  	if(this.state.content=='*')
  	{

  	}
  	else
  	{
  	if(this.state.cName=='NscaledCard')
  	{
  		this.setState({cName:'ScaledCard'});
  		this.setState({content:<JeopardyGameplay points={this.props.points} limit={1}/>});
  	}
  	else
      if(this.state.cName=='ScaledCard' && counter==3)
  	{
      openedCards++;
  		this.setState({cName:'NscaledCard'});
      counter=0;
      this.setState({content:'*'});
  	}
  }
   
  }
	render()
	{
	  const cardStyle = {
      width: this.props.cardWidth,
      height: this.props.cardHeight,
      marginLeft:15,
      marginTop:7,
      display: 'inline-block',
      textAlign: "center",
      top: '44%',
      left :'44%',
      backgroundColor: '#0E0983',
    }
		return(			
			<Card onClick={this.handleClick} className={this.state.cName} style={cardStyle} >  <h4 className={this.state.question} style={{color:"#F4D03F" ,marginTop:17}} >{this.state.content}</h4></Card>
			);
	}
}