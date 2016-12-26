import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

export default class WaitingForPlayerseView extends React.Component {

  render() {
    return (
      <Grid>
        <Row xs="center">
          <img src = "./loader.gif"/>
        </Row>
        <Row xs="center">
          <h2>Waiting For Opponents</h2>
        </Row>
        <Row xs="center">
          <Link to = '/jeopardyGameBoard'>
          <RaisedButton
              label="Play"
              primary={ true }/>
          </Link>
        </Row>
      </Grid>
    );
  }
}
