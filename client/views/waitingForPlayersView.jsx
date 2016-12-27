import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import BottomPlayerBoard from './../components/BottomPlayerBoard';

export default class WaitingForPlayerseView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      playersId: []
    };
  }

  /*static get contextTypes() {
    return {
      socket: React.propTypes.object.isRequired
    }
  }*/

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
        <Row center="xs">
        <Col >
        <div style={{textAlign: "-webkit-center"}}>
          players
          <BottomPlayerBoard playersID={this.state.playersId} p1Score={this.state.p1_score} p2Score={this.state.p2_score} p3Score={this.state.p3_score}/>
         </div>
         </Col>
        </Row>
      </Grid>
    );
  }
}
