import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import {Grid, Row, Col} from 'react-flexbox-grid';
import CategoryDialog from './CategoryDialog';
import superagent from 'superagent';

const questions = [];
for (let i = 15; i < 100; i++ ) {
  questions.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}
const time = [];
for (let j = 1; j < 60; j++ ) {
  time.push(<MenuItem value={j} key={j} primaryText={`${j}`} />);
}
const rightans = [];
for (let k = 5; k < 100; k++ ) {
  rightans.push(<MenuItem value={k} key={k} primaryText={`${k}`} />);
}
const wrongans = [];
for (let iter = 1; iter < 50; iter++ ) {
  wrongans.push(<MenuItem value={iter} key={iter} primaryText={`${iter}`} />);
}


const styles={
  paper:{
  width: '75%',
  margin: 'auto',
  marginTop: '10px',
  padding: '10px 10px 10px 10px',
  textAlign: 'center',
  color:'#009688'
},
  center:{
    textAlign:'center',
  },
  paddingStyles:{
	padding: '10px 10px 10px 10px',
  }
};

export default class CreateChallengeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={name:'',question: 15,duration:10,right:10,wrong:5};
   this.handleChange=this.handleChange.bind(this);
    this.handleDialog=this.handleDialog.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
  }
  handleChange(){
    this.setState({name:this.refs.name.getValue()});
  }
  handleQuestions = (event, index, question) => this.setState({question});
  handleTime = (event, index, duration) => this.setState({duration});
  handleRightAnswer = (event, index, right) => this.setState({right});
  handleWrongAnswer = (event, index, wrong) => this.setState({wrong});
  handleDialog()
  {
    ReactDOM.unmountComponentAtNode(document.getElementById('topic'));
    ReactDOM.render(<MuiThemeProvider><CategoryDialog open={true}/></MuiThemeProvider>,document.getElementById('topic'));
    this.setState({topic:this.props.category});
  }

  handleCreate()
  {
    alert("your challenge has been created successfully!!");
  }
  render() {
    return (
      <Grid >
      <Paper style={styles.paper} zDepth={3} rounded={false} >
      <Row>
       <Col xs={12} sm={12} md={12} lg={12}>
      	<div>
	        <h1 style={styles.center}>
	        Create Classic Challenge
	        </h1>
        </div>
        </Col>
      </Row>

      <Row style={styles.paddingStyles}>
       <Col  xs={12} sm={12} md={12} lg={12}>
	      <div>
		      <TextField ref='name'
		      floatingLabelText="Name of the Challenge"  onChange={this.handleChange} />
	      </div>
      </Col>
    </Row>

    <Row style={styles.paddingStyles}>
     <Col  xs={12} sm={12} md={12} lg={12}>
	     <div>
	      <FlatButton
	          label={"Choose the Topic"}
	        disableTouchRipple={true}
	        disableFocusRipple={true}
	        primary={true}
	        onTouchTap={this.handleDialog}
          style={{marginLeft:'-100px'}}/>
	      </div>
	      </Col>
        <div id='topic'></div>
    </Row>


    <Row style={styles.paddingStyles}>
     <Col xs={12} sm={12} md={12} lg={12}>
		    Number of Questions :
        <DropDownMenu maxHeight={300} value={this.state.question} onChange={this.handleQuestions}>
          {questions}
        </DropDownMenu>
    </Col>
  </Row>

  <Row style={styles.paddingStyles}>
   <Col  xs={12} sm={12} md={12} lg={12}  >
 	 <div>
     Duration of Challenge :
     <DropDownMenu maxHeight={300} value={this.state.duration} onChange={this.handleTime}>
         {time}
       </DropDownMenu> mins
     </div>
     </Col>
   </Row>

      <Row style={styles.paddingStyles}>
       <Col xs={12} sm={12} md={12} lg={12}>
      Score for RightAnswer:
      <DropDownMenu maxHeight={300} value={this.state.right} onChange={this.handleRightAnswer}>
        {rightans}
      </DropDownMenu>
      </Col>
    </Row>

    <Row style={styles.paddingStyles}>
     <Col xs={12} sm={12} md={12} lg={12} >
  <div>  Score for WrongAnswer:
    <DropDownMenu maxHeight={300} value={this.state.wrong} onChange={this.handleWrongAnswer}>
      {wrongans}
    </DropDownMenu>
    </div>
    </Col>
  </Row>

      <Row>
       <Col xs={12} sm={12} md={12} lg={12}>
      <div>
        <FlatButton
            label={"Create"}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleCreate}
          style={{marginRight: 12}}
        />
        </div>
        </Col>
      </Row>
        </Paper>
      </Grid>
    );
  }
}
