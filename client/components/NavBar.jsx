import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {Link} from 'react-router';
import DisplayDialoge from './DialogAlertForGamePlayStart';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import NotificationNavbar from './NotificationNavbar';
import superagent from 'superagent';
import jwt_decode from 'jwt-decode';
import jwt from 'jwt-decode';

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
  constructor(props) {
    super(props);
    // this.state = { isDrawerOpen: false };
      this.state = {
        isDrawerOpen: false,
        userDetailDrawer: [],
        open:false,
        isAdmin: false,
        nameUser: '',
        letterAvatar:''
      };
    // this.state={open:false};
    // this.state = { isAdmin: false};
  }
   handleOpen =() => {
   this.setState({open:true});
 };
    handleClose =() => {
        this.setState({open:false});
    };
  static get contextTypes() {
   return{
     router: React.PropTypes.object.isRequired,
   };
 }

 componentDidMount(){
   var thisSelf = this;
   let decode = jwt(localStorage.token).name;
   console.log(decode);
   console.log(decode.charAt(0));
   this.setState({nameUser: decode});
   this.setState({letterAvatar:decode.charAt(0)});
   console.log("nameUser:",this.state.nameUser);
   superagent
     .get('/userDetails')
     .end((err, res) => {
       console.log(res.body.message);
       thisSelf.setState({userDetailDrawer: res.body.message});
     });

 }

  handleDrawerOpen() {
    this.setState({isDrawerOpen: true});
    if(jwt_decode(localStorage.token).role=="admin")
    {
      this.setState({isAdmin: true});
      console.log("is Admin");
    }
    else{
      console.log("not admin");
    }

  }
  handleDrawerClose() {
    this.setState({isDrawerOpen: false});
  }

  signOut(){
    delete localStorage.token;
    this.context.router.push('/login');
    }

  render() {
    const actions = [
         <FlatButton
           label="Back"
           primary={true}
           onTouchTap={this.handleClose}/>,

         <Link to="gamePlay/">
         <FlatButton
           label="Start Challenge"
           primary={true} />
           </Link>
           ];

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


    const adminRights = this.state.isAdmin ?
      // return (
              <ListItem key={15} onTouchTap={() => this.context.router.push('/jeopardyClues')}>
                Jeopardy Clues
              </ListItem>
      // );
    :
              console.log("user");


    const userDetailsInfo = this.state.userDetailDrawer ? this.state.userDetailDrawer.map((userDetails) => {
      return (

          <List key={0} style={{hoverColor:'transparent'}}>
              <ListItem key={1} onTouchTap={this.handleClose} style={{textAlign:'center'}}>{this.state.nameUser}</ListItem>
              <Divider/>
              <ListItem key={2} onTouchTap={this.handleClose}> {
                <div style={{textAlign:'center'}}>
                  <Avatar
                    color='white'
                    backgroundColor={indigo500}
                    size={180}
                  >
                  {this.state.letterAvatar}
                  </Avatar>
                  {/* <img src={userDetails.avatarImage}
                    style={{width:'100%'}}/> */}
                  <br />
                  <span style={styles.rankStyle}>Rank: {userDetails.rank}</span>
                  <br />
                  <Avatar src = {userDetails.flags}/>
                  </div>
                }
              </ListItem>
              <Divider/>
          </List>
      );
    }):null;
    // return (
    //   {userDetailsInfo}
    // );

  const rightMenus=(
      <div>


      <IconMenu
            iconStyle={{color:white}}
            iconButtonElement={<IconButton>  <Avatar src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480057030/politics_og9usc.png"></Avatar></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >

        <MenuItem primaryText="Change Picture" />
        <MenuItem primaryText="Change Password" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" onTouchTap={this.signOut.bind(this)}/>
      </IconMenu>

        </div>
    );

    return (
      <div>
      <AppBar
        title={<span style={styles.title}>Quizztack</span>}
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
                <List style={{hoverColor:'transparent'}}>
                  <ListItem key={1} onTouchTap={this.handleClose} style={{textAlign:'center'}}>{userDetailsInfo}</ListItem>

                {/*<ListItem key={9} onTouchTap={() => this.context.router.push('/createChallenge')}>
                  Create Challenges
                </ListItem>
              <Divider/>
                <ListItem key={10} onTouchTap={() => this.context.router.push('/myChallenge')}>
                  My Challenges
                </ListItem>
              <Divider/>
                  <Dialog
                    title={"On clicking on Start Challenge you will start to play Challenge"}
                    actions={actions}
                    modal={true}
                    open={this.state.open} style={{backgroundColor:'black'}} bodyStyle={{color:'#3F51B5'}}>
                  </Dialog>
              <ListItem key={12} onTouchTap={() => this.handleOpen(this)}>
                  Play Challenge
                </ListItem>
              <Divider/>
                <ListItem key={13} onTouchTap={() => this.context.router.push('/myGames')}>
                  My Games
                </ListItem>
              <Divider/>
                <ListItem key={14} onTouchTap={() => this.context.router.push('/questionGenerator')}>
                  Question Generator
                </ListItem>
                <Divider/> */}

                <ListItem key={14} onTouchTap={() => this.context.router.push('/waitingForPlayers')}>
                  Jeopardy Challenge
                </ListItem>
                <Divider/>
                {adminRights}
                {/* <ListItem key={15}>{adminRights}</ListItem> */}
            </List>
          </Drawer>
      </div>
    );
  }
}
