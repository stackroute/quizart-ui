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

// let imgUrl= 'http://res.cloudinary.com/deaxb0msww/image/upload/v1483423520/Dashboard_qugmli.jpg';

export default class DashboardView extends React.Component {
  render() {
      document.body.style.backgroundColor = "#0D111C";
    // document.body.style.backgroundColor = "#00201F";
    // document.body.style.backgroundImage = 'url(' + imgUrl + ')';
    // document.body.style.backgroundSize = 'cover';
    return (

      <div>
        <NavBar />
        <Card>
          <CardMedia

              overlay={
                <Row center='xs'>
                  <Col xs={6} sm={6} md={6} lg={6}>
                <Link to = '/waitingForPlayers'><RaisedButton
                  backgroundColor="#FFFF33"
                  label="Play Jeopardy!"
                  />
                </Link>
              </Col>
              </Row>}
              overlayContainerStyle={{bottom:'45%'}}
              overlayContentStyle={{backgroundColor: 'rgba(0,0,0,0)'}}

            >
                  <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483423520/Dashboard_qugmli.jpg"/>
              </CardMedia>

        </Card>

        {/* <Grid>
          <Row xs="center">
            <Link to = '/waitingForPlayers'>
            <RaisedButton
                label="Play Jeopardy!"
                primary={ true }/>
            </Link>
          </Row>
        </Grid> */}
      </div>
    );
  }
}
