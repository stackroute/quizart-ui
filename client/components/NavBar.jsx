import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {Link} from 'react-router';
import NavigationBar from './NavigationBar'

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { isDrawerOpen: false };
  }

  handleDrawerOpen() {
    this.setState({isDrawerOpen: true});
  }

  handleDrawerClose() {
    this.setState({isDrawerOpen: false});
  }

  render() {
    const styles = {
      rankStyle: {
        position: 'relative',
        top: '-50px',
        fontSize:'120%'
      }
    };
    return (
      <div>
        <NavigationBar />
          
        <Drawer
          open={this.state.isDrawerOpen}
          docked={false}
          onRequestChange={this.handleDrawerClose.bind(this)} >
          <List>
            <ListItem key={1} onTouchTap={this.handleClose} style={{textAlign:'center'}}>User Name</ListItem>
            <Divider/>
            <ListItem key={2} onTouchTap={this.handleClose}> {
              <div style={{textAlign:'center'}}>
              <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480050265/quiztack/avt1.png"
              style={{width:'100%'}}/>
              <br />
              <span style={styles.rankStyle}>Rank: 12</span>
              <br />
              <Avatar src = "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png"/>
              </div>
              }
            </ListItem>
            <Divider/>
            <ListItem key={3} onTouchTap={this.handleClose} primaryText="My Profile" nestedItems={[
              <ListItem key={4}
                primaryText="Change Password"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                  />,
                  <ListItem key={5}
                primaryText="Change Picture"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                  />,
                   <ListItem key={6}
                primaryText="Account Settings"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                  />,
              ]}>
              </ListItem>
            <Divider/>
            <Link to="createChallenge/">
              <ListItem key={9} onTouchTap={this.handleClose}>
                Create Challenges
              </ListItem>
            </Link>
            <Divider/>
            <Link to="myChallenge/">
              <ListItem key={10} onTouchTap={this.handleClose}>
                My Challenges
              </ListItem>
            </Link>
            <Divider/>
            <Link to="myGames/">
              <ListItem key={11} onTouchTap={this.handleClose}>
                My Games
              </ListItem>
            </Link>
            <Divider/>
          </List>
        </Drawer>
      </div>
    );
  }
}
