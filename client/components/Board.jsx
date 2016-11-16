import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

/*var response=false,dis=false;
const TableExampleSimple = () => (
  <Table selectable={false} height={'350px'}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn style={{height:100}}>  <h1>Topic 1 </h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 2</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 3</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 4</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 5</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 6</h1></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>

      <TableRow>
        <TableRowColumn> <RaisedButton label="$200" id="id1" onTouchTap={handleChange} secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>      
        </TableRow>
      

    </TableBody>
  </Table>
);
function handleChange()
{
  this.id.setAttribute("disabled");
}*/
export default class Board extends React.Component  {
  
  render()
  {
    return(<Table selectable={false} height={'350px'}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn style={{height:100}}>  <h1>Topic 1 </h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 2</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 3</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 4</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 5</h1></TableHeaderColumn>
        <TableHeaderColumn><h1>Topic 6</h1></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>

      <TableRow>
        <TableRowColumn> <RaisedButton onTouchTap={e=>e.disabled={true}} label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$200" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$400" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$600" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$800" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>
        <TableRowColumn> <RaisedButton label="$1000" secondary={true} style={{height:60, width:150}}/></TableRowColumn>      
        </TableRow>
      

    </TableBody>
  </Table>);
  }
}