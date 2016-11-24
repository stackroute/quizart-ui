import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { isDrawerOpen: false };
  }

  handleDrawerOpen() {
    this.setState({isDrawerOpen: true});
  }

  handleDrawerClose() {
    this.setState({isDrawerOpen: false});
  }

  render() {
    return (
      <div>
        <AppBar
          title="QuizArt"
          onLeftIconButtonTouchTap={this.handleDrawerOpen.bind(this)} />
        <Drawer
          open={this.state.isDrawerOpen}
          docked={false}
          onRequestChange={this.handleDrawerClose.bind(this)} />
      </div>
    );
  }
}
