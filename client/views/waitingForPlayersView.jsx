import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import BottomPlayerBoard from './../components/BottomPlayerBoard';
import jwt from 'jwt-decode';
// var queuedUser = [];
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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      p1_score:'',
      p2_score:'',
      p3_score:'',
      data:[]
    };
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  handleResize(event) {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

  componentDidMount() {
    var socket = io();
    var thisCopy = this;
    let decode = jwt(localStorage.token);
    var userToken = localStorage.getItem('token');
    console.log(userToken);
      console.log("socket on jeopardy view");
      socket.emit('queue',{
      token: userToken
    });
    // socket.on('joinRequest',function(data){
    // console.log("gameId is ", data.gameID);
    // var idForGame = data.gameID;
    // socket.emit('joiningNow',{gameID: idForGame})
    // });
    // console.log("decoded token ",decode);
    // // socket.emit('testMsg', 'testData');
    // console.log("Testing Data : "+localStorage.token);

    socket.emit('joining',{email: decode.email, userId: decode.sub});
    socket.on('game_id',(data) => {
      console.log("emitted data of players queued");
      console.log('gameId',data);
      // if(data.gameId){
        console.log("to redirect from here");
        thisCopy.context.router.push('/jeopardyGameBoard/'+data);
        // thisCopy.context.router.push('/');
      // }
    });
    socket.on("data",function(data)
    {
      // queuedUser.push(data);
      thisCopy.setState({playersId: data});
      console.log("Data from socket to waiting view:", data);
      // console.log("Checking players Id:",this.state.playersId);
      console.log("checking socket connection");
      window.addEventListener('resize', this.handleResize.bind(this));
    }.bind(this));
    };

  /*static get contextTypes() {
    return {
      socket: React.propTypes.object.isRequired
    }
  }*/

  render() {
    document.body.style.backgroundColor = "#00201F";
    return (
      <div>
      <Grid>
        <img src="./../images/map6.jpg" style={styles.imageStyle}/>
        <Row xs="center">
        <img src="./../images/loading_bar.gif" style={styles.gifStyle}/>
        </Row>
        <Row center="xs">
        <Col >
        <div style={{textAlign: "-webkit-center"}}>
          <h2>Players: </h2>
          <BottomPlayerBoard playersID={this.state.playersId} p1Score={this.state.p1_score} p2Score={this.state.p2_score} p3Score={this.state.p3_score}/>
         </div>
         </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}
