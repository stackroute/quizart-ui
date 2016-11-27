import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from './../../node_modules/material-ui/Toolbar';
import Avatar from './../../node_modules/material-ui/Avatar';
import Badge from './../../node_modules/material-ui/Badge';
import FontIcon from './../../node_modules/material-ui/FontIcon';
import NotificationsIcon from './../../node_modules/material-ui/svg-icons/social/notifications';
import IconButton from './../../node_modules/material-ui/IconButton';
import ActionHome from './../../node_modules/material-ui/svg-icons/action/home';
import FloatingActionButton from './../../node_modules/material-ui/FloatingActionButton';
import DropDownMenu from './../../node_modules/material-ui/DropDownMenu';
import MenuItem from './../../node_modules/material-ui/MenuItem';
import IconMenu from './../../node_modules/material-ui/IconMenu';
import Drawer from 'material-ui/Drawer';
import MediaQuery from 'react-responsive';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import SocialPeople from 'material-ui/svg-icons/social/people';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Link} from 'react-router';

import{Row, Grid, Col} from 'react-flexbox-grid';
import {List, ListItem} from './../../node_modules/material-ui/List';
import NotificationNavbar from './NotificationNavbar';
import NotificationMobileList from './NotificationMobileList';
import RequestNavbar from './RequestNavbar';


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

const styles = {
  navbarStyle:{
  background : indigo500
},
  iconStyles:{
    color:white,
    marginTop:'10px',
    cursor:'pointer'
  },
  avatarStyle:{
    color: white
  },
  badgeStyle:{
    padding:0,
    margin:0,
    color: white
  }
}


class NavigationBar extends React.Component{
constructor() {
  super();
  this.state = { isDrawerOpen: false };
}

static get contextTypes(){
  return{
    router: React.PropTypes.object.isRequired
  };
}

handleDrawerOpen() {
  this.setState({isDrawerOpen: true});
}

handleDrawerClose() {
  this.setState({isDrawerOpen: false});
}

  render(props){
    return (
      <div>
        <div>
          <div>
            <Toolbar style={styles.navbarStyle}>
              <ToolbarGroup>
              <div>
                <NavigationMenu style={styles.iconStyles}
                  onTouchTap={this.handleDrawerOpen.bind(this)}
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
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text= "LOGO" style={{color:white}}/>
        </ToolbarGroup>
        <ToolbarGroup>
        <Row>
          <div style={styles.iconStyles}>
          <Link to='/'><IconMenu
            iconStyle={{color:white}}
            iconButtonElement={<IconButton><ActionDashboard /></IconButton>}
            anchorOrigin={{horizomntal: 'middle', vertical: 'top'}}
            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}


            // onChange={this.handleChangeSingle}
        // value={this.state.valueSingle}
      >

      </IconMenu>
      </Link>


            <IconMenu
              iconStyle={{color:white}}
              iconButtonElement={<IconButton><CommunicationMessage /></IconButton>}
              anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
              targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}


              // onChange={this.handleChangeSingle}
          // value={this.state.valueSingle}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Send feedback" />
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>



          </div>

          <IconMenu
            iconStyle={{color:white , margin: -12 }}
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

        <MenuItem
        style={{backgroundColor:'transparent'}}>

        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
        <div>
          <NotificationMobileList />
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
        <div>
          <NotificationMobileList />
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
        <div>
          <NotificationNavbar />
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
        <div>
          <NotificationNavbar />
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1440}>
        <div>
          <NotificationNavbar />
        </div>
        </MediaQuery>

        </MenuItem>
      </IconMenu>

          <IconMenu
            iconStyle={{color:white}}
            iconButtonElement={<IconButton>  <Avatar src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480057030/politics_og9usc.png"></Avatar></IconButton>}
            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
            // onChange={this.handleChangeSingle}
        // value={this.state.valueSingle}
      >

        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
      </Row>

        </ToolbarGroup>
      </Toolbar>
      </div>
      <div id="content">
        {this.props.children}
      </div>
    </div>
  </div>
    );
  }
}

export default NavigationBar;
