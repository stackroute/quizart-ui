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
    this.startGame = this.startGame.bind(this);
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
