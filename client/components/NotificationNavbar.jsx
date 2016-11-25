import React from 'react';
import {List, ListItem} from './../../node_modules/material-ui/List';
import Avatar from './../../node_modules/material-ui/Avatar';
import RaisedButton from './../../node_modules/material-ui/RaisedButton';
import Divider from './../../node_modules/material-ui/Divider';
import Subheader from './../../node_modules/material-ui/Subheader';
import {indigo500} from './../../node_modules/material-ui/styles/colors'


const styles={
  listStyle:{
  width: 500,
},
imgStyle:{
  height: 50,
  width:50
}

}

class NotificationList extends React.Component{
  render(){
    return(
      <List style={styles.listStyle}>
        <Subheader>Notifications</Subheader>
          <Divider />
        <ListItem
          primaryText="Brunch this weekend?"
          secondaryText={<p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
          secondaryTextLines={1}
          leftAvatar={<img src="hthttp://res.cloudinary.com/deaxb0msww/image/upload/v1480051934/quiztack/usericon.png" style={styles.imgStyle}/>}

        />
        <Divider />
        <ListItem
          primaryText="Brunch this weekend?"
          secondaryText={<p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
          secondaryTextLines={1}
          leftAvatar={<img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480051934/quiztack/usericon.png" style={styles.imgStyle}/>}
        />
        <Divider />
        <ListItem
          primaryText="Brunch this weekend?"
          secondaryText={<p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
          secondaryTextLines={1}
          leftAvatar={<img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480051934/quiztack/usericon.png" style={styles.imgStyle}/>}
        />
        <Divider />
        <ListItem
          primaryText="Brunch this weekend?"
          secondaryText={<p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
          secondaryTextLines={1}
          leftAvatar={<img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480051934/quiztack/usericon.png" style={styles.imgStyle}/>}
        />
        <Divider />
        <Subheader style={{textAlign: 'center'}}>See All</Subheader>
          <Divider />
      </List>
    );
  }
}


export default NotificationList;
