import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {indigo700} from './../../node_modules/material-ui/styles/colors';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar';

var count;
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
      col: false,
      countQues: 0,
      completed: false
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

    // const winner = this.state.completed ? alert()
    const winner = (this.state.scores && this.state.scores instanceof Array ? this.state.scores : []).sort((a,b) => {
      if(a.score < b.score) {
        return 1;
      } else if(a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    })[0];
    if(this.state.completed) {
      alert(winner.player, 'won');
    }
    const tiles = Array(6).fill().map((_, row) => {
      const rowComponent = Array(6).fill().map((_, col) => {
        // const tileColor = this.state.questions[col][row].opened ? '#FFFFFF' : '#673AB7';
        const tileContent = row === 0 ? this.state.categories[col] : (row ) * 200;
        const bgColor = this.getCardDisable(row -1, col) ? '#673AB7': 'grey' ;
        return (
          <Col xs={2} key={col}>
            <Paper zDepth={2} style={{padding: '3vh', cursor: 'pointer', backgroundColor:bgColor, color:'#FFFFFF'}}
              onTouchTap={this.handleQuestionClicked.bind(this, row - 1, col)}>
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
    //
    const borderScore = this.state.cue ? '3px' : '0px';
    const cue = this.state.cue;
    // console.log("cue is -----",this.state.cue);
    const userScores = this.state.cue ? this.state.scores.map(function(playerScore){
      let borderScore = cue === playerScore.player ? '#FFFF66' : '#FFFFFF';
      return(
        <Col>
        <Paper style={{width:'200px', margin:'3px',  backgroundColor:borderScore }}>
          <Row center='xs'>{playerScore.player}</Row>
          <Row center='xs'><Avatar size={90} color='#000000' style={{fontSize:'28px'}}> {playerScore.score} </Avatar></Row>
      </Paper>
    </Col>
      );
    }):null;

    const options = this.shouldDisplayOptions() ? <span> {this.state.currQuestion.options.map(function (option) {
      return(
        <Paper key={option} zDepth={3} style = {{padding: '3vh', cursor: 'pointer', backgroundColor: '#80DEEA', margin:'2px'}}
          onTouchTap = {this.handleAnswer.bind(this, option)}>
          Who is {option} ?
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

    const category = this.state.categories[this.state.col];
    const point = (this.state.row+1)*200;
    const isOpened = this.state.currQuestion.opened ? true : false;
    return (
      <Grid>
        <SwipeableViews
          index={ this.getSwipeableViewIndex() }
        >
          <Paper style={{width:'100%', backgroundColor: '#000000', overflow:'hidden'}}>
            {tiles}
            <Row center='xs' style={{backgroundColor:indigo700, marginTop:'20px'}}>{userScores}</Row>
          </Paper>
          <Paper style={{width:'100%', height:'100%', backgroundColor: indigo700, color: '#FFFFFF', overflow:'hidden'}}>
            <Row style={{marginTop:'2px', marginLeft:'2px'}}>
              <Col xs={2}> Category: {category} </Col>
              <Col xsOffset={8} xs={2} > Clue Point: {point}</Col>
           </Row>
          <Row center='xs' style={{marginTop:'40px', marginLeft:'5px', marginRight:'5px', fontSize:'20px', lineHeight:'30px', textAlign:'justify'}}> <Col xs={12} sm ={12} md={12} lg={12}  > {this.getCurrQuestion()} </Col> </Row>
          <Row center='xs' style={{marginTop:'70px'}}> <Col xs={12} sm ={12} md={12} lg={12} > {buzzer} </Col> </Row>
          <Row center='xs' style={{marginTop:'70px'}}> <Col xs={12} sm ={12} md={12} lg={12} >  {options} </Col> </Row>
          <Row center='xs'>{userScores}</Row>
          </Paper>
        </SwipeableViews>
      </Grid>
    );
  }

  handleAnswer = (option, event) => {
      console.log(option);
      if(event.target.innerText === this.state.currQuestion.subject)
      event.target.style.backgroundColor='green'
      else {
        event.target.style.backgroundColor='red'
      }
      this.context.socket.emit('answer', option);
      count = this.state.countQues + 1;
      this.setState({countQues:count});
      console.log(this.state.countQues);
  }
  shouldDisplayOptions () {
      return (this.state.currQuestion && this.state.cue);
    }

 getCardDisable(row, col) {
   const questions = this.state.questions;
   return !(questions
    && questions[col]
    && questions[col][row]
    && questions[col][row].opened)
  }

  shouldDisplayBuzzer() {
    return this.state.currQuestion && !this.state.cue;
  }

  getSwipeableViewIndex() {
    // if(this.state.currQuestion.opened)
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
  handleQuestionClicked(row, col, event) {
    console.log('question clicked:', row, col);
    if(this.state.cue !== JSON.parse(atob(localStorage.token.split('.')[1])).email) { return; }
    if(!event.target.disabled)
    this.context.socket.emit('pickQuestion', {row: row, col: col});
    event.target.disabled=true;
  }

  handleStateChanged(stateString) {
    const state = JSON.parse(stateString);
    console.log('state:', state);
    this.setState(state);

  }
}
