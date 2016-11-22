import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import {grey600,red300}from './../../node_modules/material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Titlebar extends React.Component
{
   constructor(props) {
    super(props);

    this.state={open:false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

   handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openDrawer: true,
      anchorEl: event.currentTarget,
    });
  };



  render(){  

// <Drawer
//           docked={false}
//           width={200}
//           open={this.state.open}
//           onRequestChange={(open) => this.setState({open})}
//         >
//          <div>
        
       

//      </div>
//         </Drawer>



// <Popover
//           open={this.state.open}
//           anchorEl={this.state.anchorEl}
//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
//           onRequestClose={this.handleRequestClose}
//         >


    return(
      
      <div style={{backgroundColor:'grey600'}}>
      
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Drawer
          docked={false}
          
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
                  <List>
          <ListItem key={1} onTouchTap={this.handleClose} style={{textAlign:'center'}}>User Name</ListItem>
          <Divider/>          
          <ListItem key={2} onTouchTap={this.handleClose}> {
            <div style={{textAlign:'center'}}>
            <img src="./usericon.png" style={{width:'100%',height:'25vh'}}/>
            <br />
            <span style={{position: 'relative', top: '-50px', color: 'white',fontSize:'120%'}}>Rank: 12</span>
            <br />
            <Avatar src = "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png"/>
            </div>
          } </ListItem>
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
            ]}
            > 
            </ListItem>
          <Divider/>

          <ListItem key={7} onTouchTap={this.handleClose} primaryText="Create Challenge" nestedItems={[
            <ListItem key={8} 
              primaryText="Classic"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
                />,
                <ListItem key={9} 
              primaryText="Adaptive"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
                />,
            ]}
            > 
            </ListItem>
          <Divider/>

          <ListItem key={10} onTouchTap={this.handleClose} primaryText="Add Questions" nestedItems={[
            <ListItem key={11} 
              primaryText="Classic"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
                />,
                <ListItem key={12} 
              primaryText="Adaptive"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
                />,
            ]}
            > 
            </ListItem>
            <Divider/>

          
        </List>
       
        </Drawer>
        </MuiThemeProvider>

      <AppBar title="DASHBOARD" onLeftIconButtonTouchTap={this.handleToggle}
        titleStyle={{fontSize:'20px',textAlign: "center"}}
        iconElementRight={<Badge badgeContent={10} secondary={true} badgeStyle={{top: 12, right: 12}} >  <div><IconMenu iconButtonElement={<IconButton tooltip="Notifications"><NotificationsIcon /></IconButton>}>
        <MenuItem value={1} primaryText={'User Info'}/>
        <MenuItem value={2} primaryText={'Account Settings'}/>
        <MenuItem value={3} primaryText={'Settings'}/>
        <MenuItem value={4} primaryText={'Sign out'}/>
        </IconMenu> </div></Badge>}
   style={{
      backgroundColor: '#ff5454'
    }}
   
   />

    </div>
    
    );
}
}

