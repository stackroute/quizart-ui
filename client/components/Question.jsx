import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {Card,CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {grey900} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import {Grid, Row, Col} from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
var selectedValue=[],selectedOptionValue=[],index;
var variableMeaning=["Sachin Tendulkar-Indian Cricker","Sachin Tendulkar-Human","Sachin Tendulkar-SportsMan","Sachin Tendulkar-Celebrity","Sachin Tendulkar-Citizen of India"];
var optionMeaning=["Country- citizenship","Country- Sports","Country- origin","Country- Present","Country- LivingCurrently"];
var finalMeaning=["Country- citizenship","Country- Sports","Country- origin","Country- Present"];

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

var optionArray=[],variableArray=[],variableMeaningArray=[],optionMeaningArray=[],finalMeaningArray=[],noofoptionsArray=[];
export default class QuestionGeneratorHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,question:'',sliced:[],selectedVariable:[],selectedOption:[],displayScreen:'',selectedVariableMeaning:'',selectedOptionMeaning:'',finalMeaning:'',noofoptions:'',variableButton:false,optionButton:false,
    }
    }
    handleSelectedOptionCheckBox=(e)=>{
      if(e.target.checked) {
        //this.setState({optionButton:false});
        selectedOptionValue.push(e.target.value);
      } else {
      var index=selectedOptionValue.indexOf(e.target.value);
      selectedOptionValue.splice(index,1);
      }
      this.setState({selectedOption:selectedOptionValue});
    };
    handleSelectedCheckBox=(e)=>{
      if(e.target.checked) {
        //this.setState({variableButton:false});
        selectedValue.push(e.target.value);
      } else {
      index=selectedValue.indexOf(e.target.value);
      selectedValue.splice(index,1);
      }
      this.setState({selectedVariable:selectedValue});
    };
  handleChange = (value) => {
    this.setState({
      slideIndex: value
  });
};
handleInput=(e) =>
{
    this.setState({question:e.target.value});
};
handleVariables=()=>
{
  var key=0;
      variableArray.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Variable</h4>
            </Card>);
  var splitVariables=[];
  splitVariables.push(<List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
        {this.state.question.split(" ").map(variable => <ListItem key={variable} primaryText={variable} leftCheckbox={<Checkbox value={variable} onCheck={this.handleSelectedCheckBox}/>} style={{backgroundColor:'#FFF8E1',margin:'5px'}}/>)}</List>);
   variableArray.push(splitVariables);
    this.setState({sliced:splitVariables});
    variableArray.push(<RaisedButton label="Proceed" disabled={this.state.variableButton} primary={true} onClick={this.handleOption} style={{marginLeft:"45%"}}/>);
};
handleOption=()=>{
  var key=0;
      optionArray.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Option</h4>
            </Card>);
  var optionsSelectedLocal=[];
  var optionsTemp=this.state.question.split(" ");
  for(var variable in this.state.selectedVariable)
    {
      var index=optionsTemp.indexOf(this.state.selectedVariable[variable]);
      optionsTemp.splice(index,1);
    }
    optionsSelectedLocal.push(<List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
        {optionsTemp.map(variable => <ListItem key={variable} primaryText={variable} leftCheckbox={<Checkbox value={variable} onCheck={this.handleSelectedOptionCheckBox}/>} style={{backgroundColor:'#FFF8E1',margin:'5px'}}/>)}</List>);
    optionArray.push(optionsSelectedLocal);
    optionArray.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleVariableMeaning} style={{marginLeft:"45%"}}/>);
};
handleVariableMeaning=()=>{
  var key=0;
      variableMeaningArray.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Hey! Lemme Know What Did You Mean By "  {this.state.selectedVariable.map(variable =>variable+ " ")} "</h4>
            </Card>);
    var variableMeaningTemp=[];
    variableMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
        {variableMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable}
          onClick={() => { this.handleSelectedVariableMeaning(variable) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
    variableMeaningArray.push(variableMeaningTemp);
    variableMeaningArray.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleOptionMeaning} style={{marginLeft:"45%"}}/>);
};
handleSelectedVariableMeaning=(variable)=>{
  this.setState({selectedVariableMeaning:variable});
};

handleOptionMeaning=()=>{
  var temp=[];
  var key=0;
    optionMeaningArray.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Ok! I got that.... Now Which of following best match " {this.state.selectedOption.map(variable =>variable+ " ")} " in Context of " {this.state.selectedVariable.map(variable =>variable+ " ")} "</h4>
            </Card>);
    var optionMeaningTemp=[];
    optionMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
        {optionMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable} onClick={() => { this.handleSelectedOptionMeaning(variable) }}  style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
    optionMeaningArray.push(optionMeaningTemp);
  optionMeaningArray.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleFinalMeaning} style={{marginLeft:"45%"}}/>);
};
handleSelectedOptionMeaning=(option)=>{
  this.setState({selectedOptionMeaning:option});
};
handleFinalMeaning=()=>{
  var key=0;
      finalMeaningArray.push(<Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedVariable.map(variable =>variable+ " ")} " is... Select The Description Which Matches Best</h4>
            </Card>);
    var finalMeaningTemp=[];
    finalMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
        {finalMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable} onClick={() => { this.handleSelectedFinalMeaning(variable) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
      finalMeaningArray.push(finalMeaningTemp);
      finalMeaningArray.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleNoofOptions} style={{marginLeft:"45%"}}/>);
};
handleSelectedFinalMeaning=(final)=>
{
    this.setState({selectedFinalMeaning:final});
};
handleNoofOptions=()=>{
  var arr=[];
  for(var i=2;i<13;i++ )
  {
    arr.push(<ListItem key={i} primaryText={i}  onClick={() => { this.handleSelectedNoofOptions(i) }}  style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>);
  }
  var key=0;
      noofoptionsArray.push(<Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Cool !! I Am All Set.. Just A Last Query... How Many Options Shall I Generate ?</h4>
            </Card>);
    var optionsTemp=[];
     optionsTemp.push(<List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
     {arr}
      </List>);
        noofoptionsArray.push(optionsTemp);
    temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleDisplay} style={{marginLeft:"45%"}}/>);
};
handleSelectedNoofOptions=(no)=>{
  this.setState({noofoptions:no});
};
handleDisplay=()=>{
  console.log("final");
};
  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex} >
            <Tab label="1" value={0} />
            <Tab label="2" value={1} />
            <Tab label="3" value={2} />
            <Tab label="4" value={3} />
            <Tab label="5" value={4} />
            <Tab label="6" value={5} />
            <Tab label="7" value={6} />
            <Tab label="8" value={7} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
              <Card style={{width:"90%",margin:"auto",textAlign:'center'}}>
                  <CardTitle title="Enter a sample Question (E.g. Who won the first Nobel Prize?)"/>
              </Card>
              <TextField
                hintText="Type your Question Here"
                hintStyle={styles.errorStyle} style={{marginLeft:"5%",width:"70%",marginTop:10}} onChange={this.handleInput}/>
              <RaisedButton label="Done" secondary={true} onClick={this.handleVariables} style={{marginLeft:"2%"}}/>
          </div>
          <div style={styles.slide}>
                {variableArray}
          </div>
          <div style={styles.slide}>
            {optionArray}
          </div>
          <div style={styles.slide}>
            {variableMeaningArray}
          </div>
          <div style={styles.slide}>
            {optionMeaningArray}
          </div>
          <div style={styles.slide}>
            {finalMeaningArray}
          </div>
          <div style={styles.slide}>
            {noofoptionsArray}
          </div>
          <div style={styles.slide}>
            FinalQuestions
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
