import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router";
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/Search';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import Request from 'superagent';
const styles = {
 paper:{
  width: '100%',
  margin: 'auto',
  marginTop: '10px',
  padding: '10px 10px 10px 10px',
},
center:{
  textAlign:'center',
},
wrap:{wordWrap: 'break-word',
 whiteSpace: 'normal'},
};

var queSelected=[];
var questions=[];
var count=0;
var tempLimit=0;
export default class QuestionPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     questions: [],limit: 50,showMore:true,checked:false,done:false,selectable: true,
      multiSelectable: true,
    };
    this.handleQuestions=this.handleQuestions.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.showMore=this.showMore.bind(this);
  }
  componentWillMount() {
   this.search();
  }
  showMore() {
    tempLimit=this.state.limit+50;
    if(this.state.questions.length>=tempLimit)
    {
    this.setState({
      showMore: true,
      limit:tempLimit
    });
    }
    else
    {
    this.setState({
      showMore: false,
       limit: this.state.questions.length
    });
    }
  }
  renderButton() {
    if (!this.state.showMore) return null;
    return (
      <RaisedButton label="ShowMore"  onClick={this.showMore} fullWidth={true} />
    );
  }

  search( query = '') {
   console.log(query);
   let url =`http://localhost:3000/questions/?q=${query}`;
   let that = this;
   console.log(url);
   Request
     .get(url)
     .end(function(err, res){
       that.setState({
         questions:res.body
     });
   });
  }
  handleQuestions(e){
    count++;
    if(count>15)
    alert("You are not allowed to select more than 15 questions");
    else
    {
    alert(count);
    if(count==15)
    {
       this.setState({done:false});
    }
      this.setState(prevState => ({
       checked: !prevState.checked
     }));
      if(e.target.checked)
     queSelected.push(e.target.value);
    }
  }
  handleInput(){
  alert(this.refs.inputText.getValue());
       this.search(this.refs.inputText.getValue());
  }

  render(){
    console.log(this.props.location.query.categories);
      var data = this.state.questions.slice(0,this.state.limit);
      questions = data.map(function(questionfetch){
      //<Checkbox  key={questionfetch.id} label={questionfetch.question} value={questionfetch.question} onCheck={this.handleQuestions} />
        return    <TableRow key={questionfetch.id}> <TableRowColumn style={styles.wrap}><b>{questionfetch.question} </b></TableRowColumn></TableRow>
     });

    return(
      <Grid>
        <Paper style={styles.paper} zDepth={3} rounded={false} >
         <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
        <h2  style={styles.center}>Select your questions </h2>
      <center>
      <TextField
        floatingLabelText="Search"
        hintText="Search"
      ref="inputText"/>
        <IconButton onTouchTap={this.handleInput.bind(this)}><Search /></IconButton> </center>
        </Col>
         </Row>
        <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
         <div id='displayque'>
         <Table  selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}>
         <TableBody>

         {questions}

         </TableBody>
         </Table>
        {this.renderButton()}
        </div>
         </Col>
         </Row>
         <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
         <div>
         <Link to="displayquestions/"><center><FlatButton label="Done"  primary={true} onTouchTap={this.handleToggle} style={{marginTop:'10px'}} disabled={this.state.done}/></center></Link>
         </div>
         </Col>
         </Row>
        </Paper>
      </Grid>

      );
  }
  }
