import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Grid, Row, Col} from 'react-flexbox-grid';
import CategoryDialog from './CategoryDialog';
import superagent from 'superagent';

const questions = [];
for (let i = 15; i < 100; i=i+5 ) {
  questions.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

const styles={
  paper:{
  width: '75%',
  margin: 'auto',
  marginTop: '10px',
  padding: '10px 10px 10px 10px',
  textAlign: 'center',
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
    this.state={name:'',question: 15,durationInMins:'',durationInSecs:'',right:'',wrong:''};
   this.handleChange=this.handleChange.bind(this);
    this.handleDialog=this.handleDialog.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
  }
  handleChange(){
    this.setState({name:this.refs.name.getValue()});
    this.setState({durationInMins:this.refs.min.getValue()});
    this.setState({durationInSecs:this.refs.secs.getValue()});
    this.setState({right:this.refs.right.getValue()});
    this.setState({wrong:this.refs.wrong.getValue()});
  }
  handleQuestions = (event, index, question) => this.setState({question});
  handleDialog()
  {
    ReactDOM.unmountComponentAtNode(document.getElementById('topic'));
    ReactDOM.render(<MuiThemeProvider><CategoryDialog open={true}/></MuiThemeProvider>,document.getElementById('topic'));
  }

  handleCreate()
  {
    alert("Challenge is Created Successfully!!!");
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
   <Col  xs={12} sm={12} md={12} lg={12}>
    <div>
      <TextField ref='min'
      floatingLabelText="DurationInMins"  onChange={this.handleChange}/>
    <TextField ref='secs'
        floatingLabelText="DurationInSecs"  onChange={this.handleChange}/>
    </div>
  </Col>
</Row>

<Row style={styles.paddingStyles}>
 <Col  xs={12} sm={12} md={12} lg={12}>
  <div>
    <TextField ref='right'
    floatingLabelText="Score For RightAnswer"  onChange={this.handleChange} />
  </div>
</Col>
</Row>

<Row style={styles.paddingStyles}>
 <Col  xs={12} sm={12} md={12} lg={12}>
  <div>
    <TextField ref='wrong'
    floatingLabelText="Score For WrongAnswer"  onChange={this.handleChange} />
  </div>
</Col>
</Row>
<Row style={styles.paddingStyles}>
 <Col  xs={12} sm={12} md={12} lg={12}>
  <div>
    <RaisedButton
      containerElement='label'>
        <input type="file" />
    </RaisedButton>
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
