import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import SwipeableViews from 'react-swipeable-views';

export default class JeopardyGameplay extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: ['Sports', 'Music', 'Science', 'History', 'Politics', 'Movies'],
      questions: [],
      score: [],
      currQuestion: false,
      cue: false,
      row: false,
      col: false
    };
  }

  static get contextTypes() {
    return {
      socket: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.context.socket.on('stateChanged', this.handleStateChanged.bind(this));

    this.context.socket.emit('initializeGame', this.props.params.gameId);
  }

  render() {
    const tiles = Array(6).fill().map((_, row) => {
      const rowComponent = Array(6).fill().map((_, col) => {
        const tileContent = row === 0 ? this.state.categories[col] : (row ) * 200;
        return (
          <Col xs={2} key={col}>
            <Paper zDepth={2} style={{padding: '3vh', cursor: 'pointer'}} onTouchTap={this.handleQuestionClicked.bind(this, row - 1, col)}>
              {tileContent}
            </Paper>
          </Col>
        );
      });
      return (
        <Row key={row} center="xs" style={{padding: '1vh'}}>
          {rowComponent}
        </Row>
      );
    });

    const buzzer = this.shouldDisplayBuzzer() ? <span>BUZZER</span> : null;

    return (
      <Grid>
        <SwipeableViews
          index={this.getSwipeableViewIndex()}
        >
          <Paper>
            {tiles}
          </Paper>
          <Paper>
            {this.getCurrQuestion()}
            {buzzer}
          </Paper>
        </SwipeableViews>
      </Grid>
    );
  }

  shouldDisplayBuzzer() {
    return this.state.currQuestion && !this.state.cue;
  }

  getSwipeableViewIndex() {
    return this.state.currQuestion ? 1 : 0;
  }

  getCurrQuestion() {
    return JSON.stringify(this.state.currQuestion)
  }

  /* Need to transpose the array, by switching row and col values. */
  handleQuestionClicked(row, col) {
    this.context.socket.emit('pickQuestion', {row: row, col: col});
  }

  handleStateChanged(stateString) {
    const state = JSON.parse(stateString);
    console.log('state:', state);
    this.setState(state);
  }
}