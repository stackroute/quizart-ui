import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import BottomPlayerBoard from './../components/BottomPlayerBoard';
import jwt from 'jwt-decode';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class WaitingForPlayerseView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      playersId: [],
      view:'points',
      data:[]
    };
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }


  componentDidMount() {
    var socket = io();
    var thisCopy = this;
    let decode = jwt(localStorage.token);
    var userToken = JSON.parse(localStorage.getItem('token'));
      console.log("socket on jeopardy view");
      socket.emit('queue',{
      token: userToken
    });


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
      thisCopy.setState({playersId: data});
      console.log("Data from socket to waiting view:", data);
      // console.log("Checking players Id:",this.state.playersId);
      console.log("checking socket connection");
    }.bind(this));
    };



  render() {
    document.body.style.backgroundColor = "#00201F";
    return (
      <Card>
        <CardMedia

            overlay={
              <Row center='xs'>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <img src="./../images/loading_bar.gif" />
                </Col>
              </Row>}
                    overlayContainerStyle={{bottom:'45%'}}
                    overlayContentStyle={{backgroundColor: 'rgba(0,0,0,0)'}}

                  >
                        <img src="./../images/map7.jpg"/>
            </CardMedia>

      </Card>



    );
  }
}
