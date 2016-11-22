var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const React = require('react');
import IconButton from './../../node_modules/material-ui/IconButton'
import Paper from './../../node_modules/material-ui/Paper';
import NavigationClose from './../../node_modules/material-ui/svg-icons/navigation/close'
import {deepOrange300, Tile800, purple500, greenA400, grey100, black, blueGrey400, cyan900, white, indigo500} from './../../node_modules/material-ui/styles/colors';
import LeaderBoard from './LeaderBoardTable';
import {Grid, Row, Col} from './../../node_modules/react-flexbox-grid';
import {Tabs, Tab} from './../../node_modules/material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

const styles={
  height: 'window.innerHeight',
  width: '100%',
  textAlign: 'center',
  marginTop:50,
  marginLeft:130
}
class LeaderBoardPaper extends React.Component{

  render(){
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ReactCSSTransitionGroup transitionName = "focusingRow"
              transitionAppear = {true}
              transitionAppearTimeout = {5000}
              transitionEnter = {false}
              transitionLeave = {false}
              >



                <div><Paper style={styles}><LeaderBoard /></Paper>

              </div>


            </ReactCSSTransitionGroup>

          </Col>
        </Row>
      </div>
    );
  }
}

export default LeaderBoardPaper;
