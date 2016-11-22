import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FriendRequest from './FriendRequest';

const styles = {
  paper:{
  width: '100%',
  margin: 'auto',
  marginTop: '10px',
  padding: '10px 10px 10px 10px',
  textAlign: 'center',
},
wrap:{wordWrap: 'break-word',
 whiteSpace: 'normal'},
};
const marks=[];
export default class DisplayQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state={questions:[
     'Which country does sachin belongs to ?','Which country does sachin belongs to ?1','Which country does sachin belongs to ?2','Which country does sachin belongs to ?3','Which country does sachin belongs to ?4','Which country does sachin belongs to ?5','Which country does sachin belongs to ?6','Which country does sachin belongs to ?7','Which country does sachin belongs to ?8','Which country does sachin belongs to ?9','Which country does sachin belongs to ?10','Which country does sachin belongs to ?11','Which country does sachin belongs to ?12','Which country does sachin belongs to ?13','Which country does sachin belongs to ?14'
      ]
      };
      this.handleClose=this.handleClose.bind(this);
  }

  handleClose(i){
  let newItems = this.state.questions.slice();
  newItems.splice(i, 1);
  this.setState({questions: newItems});
  }
  handleToggle = () => {
    sendFriendRequest();
  }
  render() {
    const displayQues=this.state.questions.map((ques, i) => (
        <TableRow key={ques}>
          <TableRowColumn>   </TableRowColumn> 
        <TableRowColumn style={styles.wrap}><b>{ques}</b></TableRowColumn>
      <TableRowColumn>  <IconButton  onTouchTap={() => this.handleClose(i)}><NavigationClose /></IconButton></TableRowColumn>
      </TableRow>
    ));
    return (
      <Grid>
      <Paper style={styles.paper} zDepth={3} rounded={false} >
        <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
          <h2>Your Questions</h2>
         </Col>
         </Row>
      <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
           <div>
           <Table  selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
           <TableBody displayRowCheckbox={false}>
       {displayQues}

           </TableBody>
           </Table>
           </div>
       </Col>
         </Row>
         <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
           <div>
          <FlatButton label="Send Friend Request" secondary={true} onTouchTap={this.handleToggle} />
           <FlatButton label="Done" primary={true} onTouchTap={this.handleSubmit} />
           </div>
       </Col>
         </Row>
        </Paper>
          <div id='friends'></div>
        </Grid>
        );
}
}
function sendFriendRequest()
{
  ReactDOM.render(<MuiThemeProvider><FriendRequest open={true}/></MuiThemeProvider>,document.getElementById('name'));
}
