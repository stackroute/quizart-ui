import React from 'react';
import NavBar from '../components/NavBar';
import MyGamesComponent from './../components/MyGamesComponent';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class MyGamesView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <MyGamesComponent/>
      </div>
    );
  }
}
