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
// import ChooseTopic from './ChooseTopic';
import ChooseCategory from './ChooseCategory';
import MediaQuery from 'react-responsive';
import Dialog from 'material-ui/Dialog';
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
    this.state={name:'',question: 15,durationInMins:'',durationInSecs:'',right:'',wrong:'',isChooseTopicDialogOpen:false};
    this.handleChange=this.handleChange.bind(this);
    this.handleDialogOpen=this.handleDialogOpen.bind(this);
    this.handleDialogClose=this.handleDialogClose.bind(this);
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
  handleDialogOpen()
  {
    this.setState({
      isChooseTopicDialogOpen: true
    });
  }

  handleDialogClose() {
    console.log('Close Requested');
    this.setState({
      isChooseTopicDialogOpen: false
    });
  }

  handleCreate()
  {
    alert("Challenge is Created Successfully!!!");
  }

  render() {
    const action = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleDialogClose}/>
    ];

    return (
      <div>
        <Dialog
          open={this.state.isChooseTopicDialogOpen}
          actions={action}
          repositionOnUpdate={true}
          onRequestClose={this.handleDialogClose} >
          <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
            <ChooseCategory limit={1} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
            <ChooseCategory limit={1} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
            <ChooseCategory limit={3} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
            <ChooseCategory limit={5} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={1440}>
            <ChooseCategory limit={5} />
          </MediaQuery>
        </Dialog>
        <Row center="xs">
          <Col xs={10} sm={10} md={8} lg={6}>
            <Paper>
              <h1>Create Classic Challenge</h1>
              <form>
                <TextField
                  floatingLabelText="Name of the Challenge"
                  onChange={this.handleChange} />
                <br />
                Topics: <FlatButton
                label={"Choose the Topic"}
                primary={true}
                onTouchTap={this.handleDialogOpen} />
                <br />
                Number of Questions :
                <DropDownMenu maxHeight={300} value={this.state.question} onChange={this.handleQuestions}>
                  {questions}
                </DropDownMenu>
                <br />
                <TextField ref='min'
                  floatingLabelText="DurationInMins"  onChange={this.handleChange}/>
                <TextField ref='secs'
                  floatingLabelText="DurationInSecs"  onChange={this.handleChange}/>
                <br />
                <TextField ref='right'
                  floatingLabelText="Score For RightAnswer"  onChange={this.handleChange} />
                <br />
                <TextField ref='wrong'
                  floatingLabelText="Score For WrongAnswer"  onChange={this.handleChange} />
                <br />
                <input type="file" />
                <br />
                <FlatButton
                  label={"Create"}
                  primary={true}
                  onTouchTap={this.handleCreate}
                  style={{marginRight: 12}}
                />
              </form>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }

  /*render() {
    return (

      <Grid>
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
          disabled={this.state.disableButton}
	        onTouchTap={this.handleDialog}
          style={{marginLeft:'-100px'}}/>
	      </div>
	      </Col>
        FIXME: <div>{this.state.isChooseTopicDialogOpen?<CategoryDialog open={true}/>:null}</div>
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
  }*/
}
