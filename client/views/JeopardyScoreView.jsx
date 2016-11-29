import React from 'react';
import NavBar from '../components/NavBar';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import JeopardyScoreCard from './../components/JeopardyScoreCard';


export default class JeopardyScoreView extends React.Component {

  render() {
    return (
      <JeopardyScoreCard />
    );
  }
}
