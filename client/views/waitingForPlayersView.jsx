import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import BottomPlayerBoard from './../components/BottomPlayerBoard';
import jwt from 'jwt-decode';

var styles = {
  imageStyle:{
    position:'relative',
    width:'100%',
    height:'100%',
    opacity:0.1,
    margin:'auto'
  },
  gifStyle:{
    position: 'absolute',
    top:'150px',
    right:'550px',
    // opacity:0.7,
    textAlign:'center',
  }
}

export default class WaitingForPlayerseView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      playersId: [],
      view:'points',
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight,
      p1_score:'',
      p2_score:'',
      p3_score:'',
      data:[]
    };
    this.startGame = this.startGame.bind(this);
  }

  handleResize(event) {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
      socket: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.context.socket.on('startGame', this.startGame);
    this.context.socket.emit('queue');
  }

  startGame(gameId) {
    console.log('gameId', gameId);
    this.context.router.push('/jeopardyGameBoard/'+gameId);
  }

  componentWillUnmount() {
    this.context.socket.removeListener('startGame', this.startGame);
  }

  render() {
    document.body.style.backgroundColor = "#00201F";
    return (
      <div>
      <Grid>
        <img src="./../images/map6.jpg" style={styles.imageStyle}/>
        <Row center="xs">
        <img src="./../images/loading_bar.gif" style={styles.gifStyle}/>
        </Row>
        <Row center="xs">
        <Col >
        <div style={{textAlign: "-webkit-center"}}>
          players
          <BottomPlayerBoard playersID={this.state.playersId} p1Score={this.state.p1_score} p2Score={this.state.p2_score} p3Score={this.state.p3_score}/>
         </div>
         </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}
