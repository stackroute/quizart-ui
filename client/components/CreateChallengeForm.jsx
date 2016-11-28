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
import ChooseCategory from './ChooseCategory';
import MediaQuery from 'react-responsive';
import Dialog from 'material-ui/Dialog';
import superagent from 'superagent';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';

const questions = [];
for (let i = 15; i < 100; i=i+5 ) {
  questions.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}
const errorMessages= {
  wordsError: "Please only use letters",
  numericError: "Please enter less than 100",
} ;
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

var selectCategory=[],deselectCategory=[],select=[];
export default class CreateChallengeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={name:'',question: 15,durationInMins:'',durationInSecs:'',right:'',wrong:'',isChooseTopicDialogOpen:false,Topics:[],SelectedTopics:[],disableTopicSelect:false,canSubmit: false};
    this.handleDialogOpen=this.handleDialogOpen.bind(this);
    this.handleDialogClose=this.handleDialogClose.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.enableButton = this.enableButton.bind(this);
this.disableButton = this.disableButton.bind(this);
    this.handleTopicSelect=this.handleTopicSelect.bind(this);
    this.handleTopicDeSelect=this.handleTopicDeSelect.bind(this);
  }
  componentDidMount() {
   superagent
     .get('http://localhost:3000/classicCategory')
     .end((err, res) => {
       this.setState({Topics: res.body});
     });
 }
 enableButton() {
    this.setState(()=>({
      canSubmit: true,
    }));
  }
  disableButton() {
    this.setState(()=>({
      canSubmit: false,
    }));
  }

submitForm(data) {
 alert(JSON.stringify(data, null, 4));
}

notifyFormError(data) {
 console.error('Form error:', data);
}
  handleDialogOpen()
  {
    this.setState({
      isChooseTopicDialogOpen: true
    });
  }

  handleTopicSelect(value)
  {
      selectCategory.push(value);
  }
  handleTopicDeSelect(value)
  {
    deselectCategory.push(value);
  }
  handleDialogClose() {
    this.setState({
      isChooseTopicDialogOpen: false
    });
  for(var i in selectCategory)
    {
      for(var j in deselectCategory)
      {
        if(selectCategory[i].title!=deselectCategory[j].title)
            select.push(selectCategory[i].title);
      }
    }
    this.setState({SelectedTopics:select});
    this.setState({disableTopicSelect:true});
  }

  handleCreate()
  {
    alert("Challenge is Created Successfully!!!");
  }

  onNameChange(e)
  {
     this.setState({ name: e.target.value })
  }
  onDurationMins(e)
  {
     this.setState({ durationInMins: e.target.value })
  }
  onDurationSecs(e)
  {
     this.setState({ durationInSecs: e.target.value })
  }
  onRightAnswer(e)
  {
     this.setState({ right: e.target.value })
  }
  onWrongAnswer(e)
  {
     this.setState({ wrong: e.target.value })
  }
  onNumberofQuestions(event, index, value){
    this.setState({question:value})
  }

  render() {
      console.log(this.state.SelectedTopics);
    const action = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleDialogClose}/>
    ];
    let { wordsError, numericError} = errorMessages;

    return (
      <div>
        <Dialog
          open={this.state.isChooseTopicDialogOpen}
          actions={action}
          repositionOnUpdate={true}
          autoScrollBodyContent={true}
          onRequestClose={this.handleDialogClose} >
          <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
            <ChooseCategory limit={1} topic={this.state.Topics} onSelect={this.handleTopicSelect} onDeselect={this.handleTopicDeSelect}/>
          </MediaQuery>
          <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
            <ChooseCategory limit={1} topic={this.state.Topics} onSelect={this.handleTopicSelect} onDeselect={this.handleTopicDeSelect}/>
          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
            <ChooseCategory limit={3} topic={this.state.Topics} onSelect={this.handleTopicSelect} onDeselect={this.handleTopicDeSelect}/>
          </MediaQuery>
          <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
            <ChooseCategory limit={5} topic={this.state.Topics} onSelect={this.handleTopicSelect} onDeselect={this.handleTopicDeSelect}/>
          </MediaQuery>
          <MediaQuery minDeviceWidth={1440}>
            <ChooseCategory limit={5} topic={this.state.Topics}  onSelect={this.handleTopicSelect} onDeselect={this.handleTopicDeSelect}/>
          </MediaQuery>
        </Dialog>
        <Row center="xs">
          <Col xs={10} sm={10} md={8} lg={6}>
            <Paper>
              <h1>Create Classic Challenge</h1>
                <Formsy.Form
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onValidSubmit={this.submitForm}
              onInvalidSubmit={this.notifyFormError}  >

              <FormsyText
                type="text"
                name="name of the challenge"
                validations="isWords"
                validationError={wordsError}
                updateImmediately
                required
                floatingLabelText="Name of the Challenge"
               onChange={this.onNameChange.bind(this)}/>
               <br />
                 Topics: <FlatButton
                 label={"Choose the Topic"}
                 primary={true}
                 onTouchTap={this.handleDialogOpen}
                 disabled={this.state.disableTopicSelect}/>
               <p>Topics choosed : {this.state.SelectedTopics}</p>
                 <br />
                <FormsySelect
                name="questions"
                required
                floatingLabelText="No.of Questions"
                onChange={this.onNumberofQuestions.bind(this)}
                menuItems={this.selectFieldItems}>
                  {questions}
              </FormsySelect>
              <br />
                <FormsyText
              name="durationInMins"
              validations="isNumeric"
              validationError={numericError}
              floatingLabelText="Duration In Mins"
              value={this.state.durationInMins}
              onChange={this.onDurationMins.bind(this)}/>
               <br />
                 <FormsyText
               name="durationInSecs"
               validations="isNumeric"
               validationError={numericError}
               floatingLabelText="Duration In Secs"
               value={this.state.DurationInSecs}
               onChange={this.onDurationSecs.bind(this)}/>
             <br/>
               <FormsyText
             name="RightAnswer"
             validations="isNumeric"
             validationError={numericError}
             floatingLabelText="Score for Right Answer"
             value={this.state.right}
             onChange={this.onRightAnswer.bind(this)}/>
           <br/>
             <FormsyText
           name="WrongAnswer"
           validations="isNumeric"
           validationError={numericError}
           floatingLabelText="Score For WrongAnswer"
           value={this.state.wrong}
           onChange={this.onWrongAnswer.bind(this)}/>
           <br />
             <FlatButton
               label={"Create"}
               primary={true}
               disabled={!this.state.canSubmit}
               onTouchTap={this.handleCreate}
               style={{marginRight: 12}}
             />
               </Formsy.Form>
             </Paper>
           </Col>
         </Row>
       </div>
    );
  }
}
