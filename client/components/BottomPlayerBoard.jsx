import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Avatar from 'material-ui/Avatar';
import red500 from 'material-ui/styles/colors';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const faceIcon = <FontIcon className="muidocs-icon-action-face" />

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */

 const style = {
  height: 210,
  width: '90%',
  marginLeft: 70,
  backgroundColor:red500
};
var score = 50;
var index=1;
class BottomPlayerBoard extends Component {
  state = {
    selectedIndex:index,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper style={style} zDepth={3} >
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label={<h1>PlayerName {score}</h1>}
            icon={<Avatar size={120} src="../img/usericon.png" />}/>
          <BottomNavigationItem
            label={<h1>PlayerName {score}</h1>}
            icon={<Avatar size={120}  src="../img/usericon.png" />} />
          <BottomNavigationItem
            label={<h1>PlayerName {score}</h1>}
            icon={<Avatar size={120} src="../img/usericon.png" />}/>
        <BottomNavigationItem
            label={<h1>PlayerName {score}</h1>}
            icon={<Avatar size={120} src="../img/usericon.png" />}/>
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomPlayerBoard;