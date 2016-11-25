import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/MuiThemeProvider/darkBaseTheme';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';


export default class JeopardyScoreCard extends React.Component{
  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <Grid className="container-fluid">
            <Row center="xs">
              {categoryTiles}
            </Row>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
