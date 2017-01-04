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
            <Paper zDepth={2} style={{padding: '3vh', cursor: 'pointer', backgroundColor: '#673AB7'}} onTouchTap={this.handleQuestionClicked.bind(this, row - 1, col)}>
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

    const options = this.shouldDisplayOptions() ? <span> {this.state.currQuestion.options.map(function (option) {
      return(
        <Paper key={option} style = {{padding: '2vh', cursor: 'pointer'}}
          onTouchTap = {this.handleAnswer.bind(this, option)}>
          {option}
        </Paper>
      );
    }.bind(this)) }</span> : null
    const buzzer = this.shouldDisplayBuzzer() ? <span>
      <Row center="xs">
        <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
        alt="Image Not Available"
        style={{height:'200px',width:'200px',marginTop:'15px',cursor:'pointer'}}
        onTouchTap = { this.getOptions.bind(this) }
      />
      </Row>
    </span> : null;

    return (
      <Grid>
        <SwipeableViews
          index={ this.getSwipeableViewIndex() }
        >
          <Paper>
            {tiles}
          </Paper>
          <Paper>
            {this.getCurrQuestion()}
            {buzzer}
            {options}
          </Paper>
        </SwipeableViews>
      </Grid>
    );
  }

  handleAnswer = (option) => {
      console.log(option);
      this.context.socket.emit('answer', option);
  }
  shouldDisplayOptions () {
      return (this.state.currQuestion && this.state.cue);
    }

  shouldDisplayBuzzer() {
    return this.state.currQuestion && !this.state.cue;
  }

  getSwipeableViewIndex() {
    if(this.state.currQuestion.opened)
    return this.state.currQuestion ? 1 : 0;
  }

  getCurrQuestion() {
    return this.state.currQuestion.clues;
  }

  getOptions(event) {
    this.context.socket.emit('hitBuzzer', this.state);
  }

  handleClick(){
    console.log("selected value")
    //send selected value to server
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
