import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {Grid, Row, Col} from './../../node_modules/react-flexbox-grid';
import {Table,TableBody,TableHeader,TableFooter,TableHeaderColumn,TableRow,TableRowColumn} from './../../node_modules/material-ui/Table';
import TextField from './../../node_modules/material-ui/TextField';
import {deepOrange300} from './../../node_modules/material-ui/styles/colors';
import Avatar from './../../node_modules/material-ui/Avatar';

const styles = {
  tableStyle:{
  height: 'window.innerHeight',
  width: '100%',
  background: deepOrange300
},
  imgStyle:{
    height:35,
    width:60
  }
}
  const colwidth = {
  width:'2rem'
  }
  const tableData = [
    {
    name: 'John Smith',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/India.jpg',
    score: 23456
  },
  {
    name: 'Randal White',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/India.jpg',
    score: 23456
  },
  {
    name: 'Stephanie Sanders',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/Russia.jpg',
    score: 23456
  },
  {
    name: 'Steve Brown',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/India.jpg',
    score: 23456
  },
  {
    name: 'Joyce Whitten',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/China.jpg',
    score: 23456
  },
  {
    name: 'Samuel Roberts',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/China.jpg',
    score: 23456
  },
  {
    name: 'Shipra Joshi',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/India.jpg',
    score: 23456
  },
  {
    name: 'Ruchika Saklani',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/India.jpg',
    score: 23456
  },
  {
    name: 'Adam Moore',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/Germany.jpg',
    score: 23456
  },
  {
    name: 'Steve Brown',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/France.jpg',
    score: 23456
  },
  {
    name: 'Joyce Whitten',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/Russia.jpg',
    score: 23456
  },
  {
    name: 'Samuel Roberts',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/England.jpg',
    score: 23456
  },
  {
    name: 'Adam Moore',
    imgsrc: './img/avatar.jpg',
    country: 'http://www.sciencekids.co.nz/images/pictures/flags680/China.jpg',
    score: 23456
  }
]

class LeaderBoard extends React.Component{
  render(){
    return (
      <div>
        <Table
          height = '500px'
          fixedHeader = {true}
          fixedFooter = {false}
          selectable = {false}
          multiSelectable = {false}
          >
            <TableHeader
              adjustForCheckbox = {false}
              displaySelectAll = {false}
              deselectOnClickaway = {false}
              showRowHover = {false}
              stripedRows = {false}
              >
              <TableRow>
                <TableHeaderColumn style={colwidth}>Rank</TableHeaderColumn>
                <TableHeaderColumn style={colwidth}>Avatar</TableHeaderColumn>
                <TableHeaderColumn >Name</TableHeaderColumn>
                <TableHeaderColumn >Country</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox = {false}
              deselectOnClickaway = {false}
              showRowHover = {false}
              stripedRows = {false}
              >
              {
                tableData.map( (row, index) => (

                  <TableRow key={index} style={{border:0}}>

                    <TableRowColumn style={colwidth}>{index+1}</TableRowColumn>
                    <TableRowColumn style={colwidth}><Avatar src={row.imgsrc} /></TableRowColumn>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn><img src={row.country} style={styles.imgStyle}/></TableRowColumn>
                    <TableRowColumn>{row.score}</TableRowColumn>

                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      </div>
    );
  }
}


export default LeaderBoard;
