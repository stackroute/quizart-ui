import React from 'react';
import { Link, hashHistory } from "react-router";
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CardChild from './CardChild';
import {Grid, Row, Col} from 'react-flexbox-grid';

export default class PaperBoard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={view:'points',windowWidth: window.innerWidth, windowHeight: window.innerHeight};
  }

  handleResize(event) {

        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

     componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


  render()
  {
      const paperStyle = {
       width: this.state.windowWidth,
      height: this.state.windowHeight-150,
    //  marginLeft:-150,
      marginTop:10,
      backgroundColor:'#212F3D',
    };
    const divStyle = {
      marginTop:15
    }
    const cardStyle = {
      width: this.state.windowWidth/8.5,
      //height: this.state.windowHeight/10,
      marginLeft:10,
      marginTop:10,
      textAlign: "center",
      display: 'inline-block',
      backgroundColor:'#F4ECF7',
    }
    var cards100=[]
    var count=0;
    var value=100;
    var top=160;
    var height=[80,-35,-135,-235];
    var posLeft=[600,370,130,-110,-350,-590];
    var inc=0;
    var posL=600;
    var countLeft=0;
    for(var i=0;i<30;i++)
    {
      if(count==6)
      {
        count=0;
        top=height[inc];
        inc++;
        value+=value;
        if(value==1600)
        {
          value=1000;
        }
        cards100.push(<br />);
      }
      posL=posLeft[count];
      cards100.push(<CardChild points={value} top={top} posL={posL} cardWidth={this.state.windowWidth/8.5} cardHeight={this.state.windowHeight/10} key={i} index={count}> </CardChild>);
      count++;
    }


    return(
      <div className="Header" style={{divStyle}}>
      <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
      <div className="Topics" style={divStyle}>
      <Card  style={cardStyle} >
          <h4>The Dinosaurs</h4>
      </Card>
      <Card style={cardStyle}>
          <h4>Notable Women</h4>
      </Card>
      <Card style={cardStyle}>
          <h4>Belgium</h4>
      </Card>
      <Card style={cardStyle}>
          <h4>Composers by country</h4>
      </Card>
      <Card style={cardStyle}>
          <h4>Name that Instrument</h4>
      </Card>
      <Card style={cardStyle}>
          <h4>English Dictionary</h4>
      </Card>
      </div>
      <div className="Cards100" style={divStyle}>
        {cards100}
        </div>

        </Col>
        </Row>

    </Grid>
  </div>
  );
  }
}
