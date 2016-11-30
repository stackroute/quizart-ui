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
  height: '50%',
  width: '80%',
  marginTop:8,
  backgroundColor:"darkgray"
};
var score = 50;
var index=1;
class BottomPlayerBoard extends Component {
  state = {
    selectedIndex:index,
    size:100,
  };

  select = (index) => this.setState({selectedIndex: index});

  handleResize(event) {

        windowWidth >= 768 ? this.setState({ size:130 }) : this.setState({ size:50 });
    }

     componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

  render() {
    return (
      
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={style}>
          <BottomNavigationItem 
            label={<h1 className="ScoreBoard">PlayerName {score}</h1> }
            icon={<Avatar size={this.state.size} src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480051920/quiztack/avt4.png"/>}/>
          <BottomNavigationItem
            label={<h1 className="ScoreBoard">PlayerName {score}</h1>}
            icon={<Avatar size={this.state.size}  src="http://res.cloudinary.com/deaxb0msww/image/upload/c_scale,w_513/v1480051920/quiztack/avt3.png" />} />
          <BottomNavigationItem
            label={<h1 className="ScoreBoard">PlayerName {score}</h1>}
           icon={<Avatar size={this.state.size} src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480050193/avt1_yfioy5.png" />}/>
        
        </BottomNavigation>
      
    );
  }
}

export default BottomPlayerBoard;