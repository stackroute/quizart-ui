import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CardChild from './CardChild';
import {Grid, Row, Col} from 'react-flexbox-grid';
import DialogExampleCustomWidth from './Dialog';
import BottomPlayerBoard from './BottomPlayerBoard';
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
      height: this.state.windowHeight,
   
      marginTop:10,
      backgroundColor:'#3498DB',
    };
    const divStyle = {

      marginBottom:10

    }
    const CardPoints = {marginBottom:-10}
    const cardStyle = {
      width: this.state.windowWidth/9,
      height:'100%',
      marginLeft:15,
      marginTop:10,
      textAlign: "center",
      display: 'inline-block',
      backgroundColor: '#0E0983'
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
      cards100.push(<CardChild points={value} top={top} posL={posL} cardWidth={this.state.windowWidth/9} cardHeight={this.state.windowHeight/9} key={i} index={count}> </CardChild>);
      count++;
    }


    return(
      <div className="Header" style={{divStyle}} >
   
    
      <Grid>
       <div className="Topics" style={divStyle}>
        <center>
      <Row center="xs">
        <Col>
        
     
      </Col>

      <Col>
      <Card  style={cardStyle} >
          <h4 style={{color:"#FDFEFE"}} >States & Capitals </h4>
      </Card>
       </Col>

      <Col>

      <Card style={cardStyle}>
          <h4 style={{color:"#FDFEFE"}}>Notable Women</h4>
      </Card>
      </Col>

      <Col>
      <Card style={cardStyle}>
          <h4 style={{color:"#FDFEFE"}}>Actors & Roles</h4>
      </Card>
      </Col>

      <Col>
      <Card style={cardStyle}>
          <h4 style={{color:"#FDFEFE"}}>Composers by country</h4>
      </Card>
      </Col>

      <Col>
      <Card style={cardStyle}>
          <h4 style={{color:"#FDFEFE"}}>Name that Instrument</h4>
      </Card>
      </Col>

      <Col>
      <Card style={cardStyle}>
          <h4 style={{color:"#FDFEFE"}}>English Dictionary</h4>
      </Card>
      </Col>
        </Row>
        </center>

         </div>
      
      <Row center="xs">
       
      <div className="Cards100" style={CardPoints}>
        {cards100}
        </div>
        </Row>
        <Row center="xs" >
            <BottomPlayerBoard />
        </Row>
        </Grid>     
  </div>
  );
  }
}