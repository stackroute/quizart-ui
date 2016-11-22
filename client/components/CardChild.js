import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import GamePlayStart from './GamePlayStart'
export default class CardChild extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state={view:'points',cName:'FirstHeading',content:this.props.points,question:'inverted',posTop:this.props.top,posLeft:this.props.posL};
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(e)
  {
    if(this.state.cName==='FirstHeadingChnage')
    {
      this.setState({cName:'FirstHeading'});
      this.setState({content:'*'});
    }
    else
    {
    this.setState({cName:'FirstHeadingChnage'});
    this.setState({content:<GamePlayStart />});
    this.setState({question:'ContentDisplay'});
    //e.target.style = {
   // 	width: '400px',
   // 	margin: 'auto',
   // };
    }
  }
	render()
	{
	  const cardStyle = {
      width: this.props.cardWidth,

     // height: this.props.cardHeight
      marginLeft:10,
      marginTop:10,
      display: 'inline-block',
      textAlign: "center",
     // top: this.state.posTop,
     // left :this.state.posLeft,
      //right:'30%',
      backgroundColor: '#B3B6B7',
    }
		return(<Card onClick={this.handleClick} className={this.state.cName} style={cardStyle}> <h4 className={this.state.question}>{this.state.content}</h4></Card>);
	}
}
