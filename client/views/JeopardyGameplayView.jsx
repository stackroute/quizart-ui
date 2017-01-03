import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

export default class JeopardyGameplay extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: ['Sports', 'Music', 'Politics', 'Movies', 'Science', 'History'],
      questions: [],
      score: [],
      currQuestion: false,
      cue: false
    };
  }

  static get contextTypes() {
    return {
      socket: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.socket.on('stateChanged', this.handleStateChanged.bind(this));
    this.socket.emit('initializeGame', this.props.params.gameId);
  }

  render() {
    const tiles = Array(6).fill().map((_, row) => {
      const rowComponent = Array(6).fill().map((_, col) => {
        const tileContent = row === 0 ? this.state.categories[col] : (row ) * 200;
        return (
          <Col xs={2} key={col}>
            <Paper zDepth={2} style={{padding: '3vh'}} onTouchTap={this.handleQuestionClicked.bind(this, row - 1, col)}>
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

    return (
      <Grid>
        <Paper>
          {tiles}
        </Paper>
      </Grid>
    );
  }

  handleQuestionClicked(row, col) {
    console.log('QuestionOpened:', row, col);
  }

  handleStateChanged(state) {
    this.setState(state);
  }
}