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
// import MenuItem from 'material-ui/MenuItem';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from './../../node_modules/material-ui/List';
import NotificationList from './NotificationList';
import ChallengeRequestList from './ChallengeRequestList';
import UserDrawer from './UserDrawer.js';


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
    margin:23,
    cursor:'pointer'
  },
  avatarStyle:{
    margin:10,
    color: white
  },
  badgeStyle:{
    // marginBottom:10,
    padding:0,
    margin:0,
    color: white
  }

}


class NavigationBar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
   handleClose = () => this.setState({open: false});


  render(props){
    return (
      <div>
      <div>
        <div>
      <Toolbar style={styles.navbarStyle}>
        <ToolbarGroup>
          <div>
            <i className="material-icons" style={styles.iconStyles} onTouchTap={this.handleToggle}>menu</i>
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}>
                <UserDrawer />
        </Drawer>
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text= "LOGO" style={{color:white}}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <div>
            <i className="material-icons" style={styles.iconStyles}>dashboard</i>
            <IconMenu
              iconStyle={{color:white}}
              iconButtonElement={<IconButton><i className="material-icons" style={styles.iconStyles}>message</i></IconButton>}
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


        <IconMenu
          iconStyle={{color:white}}
          iconButtonElement={<IconButton><i className="material-icons" style={styles.iconStyles}>people</i></IconButton>}
          anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
          targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}

          // onChange={this.handleChangeSingle}
      // value={this.state.valueSingle}
    >
      <MenuItem >
        <ChallengeRequestList />
      </MenuItem>
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
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            // onChange={this.handleChangeSingle}
        // value={this.state.valueSingle}
      >

        <MenuItem >
          <NotificationList />
        </MenuItem>
      </IconMenu>






          <IconMenu
            iconStyle={{color:white}}
            iconButtonElement={<IconButton>  <Avatar src="./../img/avatar.jpg"></Avatar></IconButton>}
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


        </ToolbarGroup>
      </Toolbar>
      </div>
      <div id="content">
        {this.props.children}
      </div>
    </div>
    <div id="content">

    </div>
  </div>
    );
  }
}

export default NavigationBar;
