import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {Grid, Row, Col} from 'react-flexbox-grid';
import QuestionsDropDown from './QuestionsDropDown';
import RightAnswerDropDown from './RightAnswerDropDown';
import WrongAnswerDropDown from './WrongAnswerDropDown';
import TimeDropDown from './TimeDropDown';
import CategoryDialog from './CategoryDialog';

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
    this.state = {value: ''};
    this.handleDialog=this.handleDialog.bind(this);
  }
  handleDialog()
  {
    ReactDOM.unmountComponentAtNode(document.getElementById('topic'));
    ReactDOM.render(<MuiThemeProvider><CategoryDialog open={true}/></MuiThemeProvider>,document.getElementById('topic'));
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
		      floatingLabelText="Name of the Challenge" value={this.state.value} onChange={this.handleChange} />
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
	    <div>
		    Number of Questions :
		    <QuestionsDropDown />
	    </div>
    </Col>
  </Row>

  <Row style={styles.paddingStyles}>
   <Col  xs={12} sm={12} md={12} lg={12}  >
 	 <div>
     Duration of Challenge : <TimeDropDown/> mins
     </div>
     </Col>
   </Row>

      <Row style={styles.paddingStyles}>
       <Col xs={12} sm={12} md={12} lg={12}>
      Score for RightAnswer: <RightAnswerDropDown/>
      </Col>
    </Row>

    <Row style={styles.paddingStyles}>
     <Col xs={12} sm={12} md={12} lg={12} >
  <div>  Score for WrongAnswer:<WrongAnswerDropDown/></div>
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
          onTouchTap={this.handleNext}
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
