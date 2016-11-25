import React from 'react';
import {List, ListItem} from './../../node_modules/material-ui/List';
import Avatar from './../../node_modules/material-ui/Avatar';
import RaisedButton from './../../node_modules/material-ui/RaisedButton';
import Divider from './../../node_modules/material-ui/Divider';
import Subheader from './../../node_modules/material-ui/Subheader';
import {indigo500} from './../../node_modules/material-ui/styles/colors'


const styles={
  width: 330,

}

class NotificationList extends React.Component{
  render(){
    return(
      <List style={styles}>
        <Subheader>Challenge Requests</Subheader>
          <Divider />
        <ListItem

          primaryText="Brendan Lim"
          leftAvatar={<Avatar src="./img/avatar.jpg" />}
          rightIcon={
            <div>
              <RaisedButton label="Primary" primary={true} style={style} />
              <RaisedButton label="Accept"  secondary={true} />
            </div>}

        />
        <Divider />
        <ListItem
          primaryText="Eric Hoffman"
          leftAvatar={<Avatar src="./img/avatar.jpg" />}
          rightIcon={<RaisedButton label="Accept" secondary={true} />}
        />
        <Divider />
        <ListItem
          primaryText="Grace Ng"
          leftAvatar={<Avatar src="./img/avatar.jpg" />}
          rightIcon={<RaisedButton label="Accept" secondary={true} />}
        />
        <Divider />
        <ListItem
          primaryText="Kerem Suer"
          leftAvatar={<Avatar src="./img/avatar.jpg" />}
            rightIcon={<RaisedButton label="Accept"  secondary={true}/>}
        />
        <Divider />
        <Subheader style={{textAlign: 'center'}}>See All</Subheader>
      </List>
    );
  }
}


export default NotificationList;
