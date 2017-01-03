import React from 'react';
import NavBar from './NavBar';
import config from '../config';

export default class LoggedInComponent extends React.Component {
  constructor() {
    super();

    const socket = io(config.restUrl);

    console.log('Socket Connected');

    this.state = {
      socket: socket
    };
  }

  static get childContextTypes() {
    return {
      socket: React.PropTypes.object
    }
  }

  getChildContext() {
    return {
      socket: this.state.socket
    }
  }

  componentDidMount() {
    this.state.socket.on('authorized', () => {
      console.log('authorized');
      this.setState({authorized: true});
    });

    const jwtToken = localStorage.token.replace(new RegExp('"', 'g'),'');
    this.state.socket.emit('authorize', jwtToken);
  }

  render() {
    const children = this.state.authorized ? this.props.children : null;

    return (
      <div>
        {children}
      </div>
    );
  }
}
