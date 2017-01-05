import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import BottomPlayerBoard from './../components/BottomPlayerBoard';
import jwt from 'jwt-decode';
import MediaQuery from 'react-responsive';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles={
  imageDesktopStyle:{
      opacity:0.5
  },
  imageMobileStyle:{
      opacity:0.5
  }
};

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
      <div>
      <Card>
        <CardMedia

            overlay={
              <Row center='xs'>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <img src="./../images/loading_bar.gif" style={styles.loadingDesktopStyle} />
                </Col>
              </Row>}
                    overlayContainerStyle={{bottom:'30%'}}
                    overlayContentStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                  >
                    <MediaQuery minDeviceWidth='500px'>
                    <div className="some-class">
                      <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483464732/oie_1ZF4CIRCajHA_mjs5f6.jpg" style={styles.imageDesktopStyle}/>
                    </div>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth='499px' className="some-class">
                      <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483464060/oie_hYqmkwDFCJhS_zznw0b.jpg" style={styles.imageMobileStyle}/>
                    </MediaQuery>
            </CardMedia>
      </Card>
</div>
    );
  }
}
