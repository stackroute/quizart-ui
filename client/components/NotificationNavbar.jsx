import React from 'react';
import {List, ListItem} from './../../node_modules/material-ui/List';
import Avatar from './../../node_modules/material-ui/Avatar';

import superagent from 'superagent';
import RaisedButton from './../../node_modules/material-ui/RaisedButton';
import Divider from './../../node_modules/material-ui/Divider';
import Subheader from './../../node_modules/material-ui/Subheader';
import {indigo500} from './../../node_modules/material-ui/styles/colors';
import {Row, Grid, Col} from 'react-flexbox-grid';

import Notification from './Notification';

var data=[];

class NotificationList extends React.Component{
  constructor(){
    super();
    this.state={
      announcements:[]
    };
  }
  static get propTypes(){
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  componentDidMount(){

    superagent
  .get('/announcement')
  .end((err, res) => {
    console.log(res.body.message);
    this.setState({announcements: res.body.message});
  });


  }

  render(){
    console.log(this.props.limit);
    const notificationItems= this.state.announcements ? this.state.announcements.map((notification) => {
    return (
        <Row center='xs'>
            <Notification notification={notification} />
        </Row>
      );
    }) :null ;
    console.log(this.state.announcements);
  return (
    <Row >
    {notificationItems}
    </Row>
    );
}
}


export default NotificationList;
