import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

export default class DBTitlebar extends React.Component
{
   constructor(props) {
    super(props);
    this.state = {open:false};
   // this.state={open:false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open:false});

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

   handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };



  render(){  

    return(
      <div>
     <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose} style={{margin:"auto"}}><Avatar size={200} src="../img/usericon.png" /></MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
        <Menu>
            <MenuItem primaryText="UserInfo" />
            <MenuItem primaryText="Account Settings" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>


      <AppBar title="DASHBOARD" onLeftIconButtonTouchTap={this.handleToggle} 
        titleStyle={{textAlign: "center"}}
        iconElementRight={<Badge badgeContent={10} onTouchTap={this.handleTouchTap}  secondary={true} badgeStyle={{top: 12, right: 12}} > <IconButton tooltip="Notifications">   <NotificationsIcon />  </IconButton> </Badge>}
   style={{
      backgroundColor: '#C62828',
    }}
   // iconClassNameRight="muidocs-icon-navigation-expand-more"
   />
    </div>
    );
}
}

