import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
const phoneIcon = <i className="material-icons">call</i>;
const mailIcon = <i className="material-icons">mail</i>;

export default class DrawerOpenRightExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
   return (
    <AppBar
      iconElementLeft = {
        <div>
        <FlatButton
          label="Quick Play"
        />
      </div>
      }


      iconElementRight={
        <div>
          <FlatButton
            label="Meet the Team"
            // onTouchTap={this.handleToggle}
          />
        <FlatButton
          label="Connect"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={200} openSecondary={true} open={this.state.open} containerStyle={{height: '80%', top: 80}}>
          <MenuItem>Location:
          <br/>Stack Route
          <br/>Koramangala
          <br/>Bangalore</MenuItem>
          <Divider inset={true} />
          <MenuItem>Office Hours:
          <br/>  8:00am - 7:00pm
          </MenuItem>
           <Divider inset={true} />
          <MenuItem>Social Media:
            <br/> Facebook
            <br/> Twitter
          </MenuItem>
          <Divider inset={true} />
          <Paper zDepth={1}>
          <BottomNavigation>
            <BottomNavigationItem
              label="Phone"
              icon={phoneIcon}
            />
            <BottomNavigationItem
              label="Email"
              icon={mailIcon}
            />
          </BottomNavigation>
        </Paper>
        </Drawer>
      </div>
      }
    />
  );
}

}
