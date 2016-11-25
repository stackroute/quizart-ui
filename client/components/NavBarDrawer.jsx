import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import {orange400,grey900}from './../../node_modules/material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

export default class UserDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  render() {
    return (
      <div>
        <List>
          <ListItem key={1} onTouchTap={this.handleClose} style={{textAlign:'center'}}>User Name</ListItem>
          <Divider/>
          <ListItem key={2} onTouchTap={this.handleClose}> {
            <div style={{textAlign:'center'}}>
            <img src="./img/avatar.jpg" style={{width:'100%',height:'25vh'}}/>
            <br />
            <span style={{position: 'relative', top: '-50px', color: 'white',fontSize:'120%'}}>Rank: 12</span>
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
            ]}
            >
            </ListItem>
          <Divider/>

          <ListItem key={7} onTouchTap={this.handleClose} primaryText="Create Challenge" nestedItems={[
            <Link to="Topic/"><ListItem key={8}
              primaryText="Classic"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
            />
          </Link>,
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
      </div>
    );
  }
}
