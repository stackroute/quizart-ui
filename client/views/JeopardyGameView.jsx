import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import JeopardyGameplay from './../components/JeopardyGameplay';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class CategoriesDash extends React.Component {
  constructor() {
    super();
    
  }

  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  

  render() {
    

   
    return (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <JeopardyGameplay limit={1}/>
        </Paper>

      </MuiThemeProvider>
      
      </div>
    );
  }
}