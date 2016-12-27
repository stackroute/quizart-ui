import React from 'react';
import io from 'socket.io-client';

const socket = io();

export default class ContextComponent extends React.Component {
  static getChildContext() {
    return (
      socket: socket
    );
  }

  static getChildContextTypes() {
    return (
      socket: React.propTypes.object.isRequired
    );
  }

  render() {
    console.log('socket connected');
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
