import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {Link} from 'react-router';

// import NavigationBar from './NavigationBar'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import NotificationNavbar from './NotificationNavbar';

import {
  blue300,
  white,
  indigo500,
  orange200,
  deepOrange300,
  grey500,
  pink400,
  purple500,
} from './../../node_modules/material-ui/styles/colors';

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { isDrawerOpen: false };
  }
  static get contextTypes() {
   return{
     router: React.PropTypes.object.isRequired,
   };
 }

  handleDrawerOpen() {
    this.setState({isDrawerOpen: true});
  }
  handleDrawerClose() {
    this.setState({isDrawerOpen: false});
  }
  
  render() {
    const styles = {
      title:{
        cursor:'pointer',
        color:white,
        textDecoration: 'none'
      },
      navbarStyle:{
        background : indigo500
      },
      badgeStyle:{
        color: white,
      },
     
    };

// navigate(){
//     this.props.history.pushState(null,"/")
// },
  const rightMenus=(
      <div>
      <IconMenu
            iconStyle={{color:white , margin: -29 }}
            iconButtonElement={
              <IconButton>
              <Badge
                badgeContent={4}
                primary={true}
                style={styles.iconStyle}
                >
                <NotificationsIcon style={styles.badgeStyle}/>
              </Badge>
            </IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            // onChange={this.handleChangeSingle}
        // value={this.state.valueSingle}
      >

      <MenuItem style={{width:'500px', backgroundColor:'indigo500'}}>
        <NotificationNavbar limit={3} />
      </MenuItem>
      </IconMenu>

      <IconMenu
            iconStyle={{color:white}}
            iconButtonElement={<IconButton>  <Avatar src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480057030/politics_og9usc.png"></Avatar></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            // onChange={this.handleChangeSingle}
        // value={this.state.valueSingle}
      >

        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>

        </div>
    );

    return (
      <div>
      <AppBar 
        title={<span style={styles.title}>Logo</span>}
        onTitleTouchTap={() => this.context.router.push('/')}
        iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
        onLeftIconButtonTouchTap={this.handleDrawerOpen.bind(this)}
        iconElementRight={rightMenus}
        style={styles.navbarStyle}
      />
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

                <ListItem key={9} onTouchTap={() => this.context.router.push('/createChallenge')}>
                  Create Challenges
                </ListItem>

              <Divider/>

                <ListItem key={10} onTouchTap={() => this.context.router.push('/myChallenge')}>
                  My Challenges
                </ListItem>

              <Divider/>

                <ListItem key={11} onTouchTap={() => this.context.router.push('/gamePlayJeopardy')}>
                  Play Jeopardy
                </ListItem>

              <Divider/>

                <ListItem key={12} onTouchTap={() => this.context.router.push('/gamePlay')}>
                  Play Challenge
                </ListItem>

              <Divider/>

                <ListItem key={13} onTouchTap={() => this.context.router.push('/myGames')}>
                  My Games
                </ListItem>

              <Divider/>
            </List>
          </Drawer>
      </div>
    );
  }
}
