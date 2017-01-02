import React from 'react';
import NavBar from '../components/NavBar';
import ImageCarousel from '../components/Carousel';
import MyChallenges from '../components/MyChallenges';
import CategoriesDash from '../components/CategoriesDash';
import MediaQuery from 'react-responsive';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483304321/21_nsnhj4.jpg"/>
        <Grid>
          <Row xs="center">
            <Link to = '/waitingForPlayers'>
            <RaisedButton
                label="Play Jeopardy!"
                primary={ true }/>
            </Link>
          </Row>
        </Grid>
      </div>
    );
  }
}
