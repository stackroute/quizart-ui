import React from 'react';
import NavBar from '../components/NavBar';
import ImageCarousel from '../components/Carousel';
import MyChallenges from '../components/MyChallenges';
import CategoriesDash from '../components/CategoriesDash';
import MediaQuery from 'react-responsive';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles={
  imageStyle:{
        opacity:0.7,
  }
};

export default class DashboardView extends React.Component {
  render() {
      document.body.style.backgroundColor = "#0D111C";
    return (

      <div>
        <NavBar />
        <Card>
          <CardMedia

              overlay={
                <Row center='xs'>
                  <Col xs={6} sm={6} md={6} lg={6}>
                <Link to = '/waitingForPlayers'><RaisedButton
                  backgroundColor="#42C299"
                  label="Play Jeopardy!"
                  labelColor="white"
                  buttonStyle={{height:'60px', width:'200px', borderRadius:'10px'}}
                  />
                </Link>
              </Col>
              </Row>}
              overlayContainerStyle={{bottom:'25%'}}
              overlayContentStyle={{backgroundColor: 'rgba(0,0,0,0)'}}

            >
            <MediaQuery minDeviceWidth='1224px'>
         <div className="some-class">
           <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483453570/Dboard_jtxczc.jpg" style={styles.imageStyle}/>
         </div>
         </MediaQuery>
         <MediaQuery maxDeviceWidth='1224px' className="some-class">
         <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483463322/DboardRes_l4vzyw.jpg" style={styles.imageStyle}/>
         </MediaQuery>
            </CardMedia>

        </Card>
      </div>
    );
  }
}
