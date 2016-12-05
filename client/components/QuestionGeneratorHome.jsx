import React from 'react';
import Card from 'material-ui/Card';
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
export default class QuestionGeneratorHome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={question:'',sliced:[],selectedVariable:[],selectedOption:[],displayScreen:'',selectedVariableMeaning:'',selectedOptionMeaning:'',finalMeaning:'',noofoptions:'',variableButton:false,optionButton:false}
        this.handleVariables = this.handleVariables.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectedCheckBox=this.handleSelectedCheckBox.bind(this);
        this.handleOption=this.handleOption.bind(this);
        this.handleVariableMeaning=this.handleVariableMeaning.bind(this);
        this.handleOptionMeaning=this.handleOptionMeaning.bind(this);
        this.handleSelectedOptionCheckBox=this.handleSelectedOptionCheckBox.bind(this);
        this.handleSelectedVariableMeaning=this.handleSelectedVariableMeaning.bind(this);
        this.handleSelectedOptionMeaning=this.handleSelectedOptionMeaning.bind(this);
        this.handleSelectedFinalMeaning=this.handleSelectedFinalMeaning.bind(this);
        this.handleFinalMeaning=this.handleFinalMeaning.bind(this);
        this.handleNoofOptions=this.handleNoofOptions.bind(this);
        this.handleSelectedNoofOptions=this.handleSelectedNoofOptions.bind(this);
        this.handleDisplay=this.handleDisplay.bind(this);
    }

    handleSelectedOptionCheckBox(e){
      if(e.target.checked) {
        //this.setState({optionButton:false});
        selectedOptionValue.push(e.target.value);
      } else {
      var index=selectedOptionValue.indexOf(e.target.value);
      selectedOptionValue.splice(index,1);
      }
      this.setState({selectedOption:selectedOptionValue});
    }
    handleSelectedCheckBox(e){
      if(e.target.checked) {
        //this.setState({variableButton:false});
        selectedValue.push(e.target.value);
      } else {
      index=selectedValue.indexOf(e.target.value);
      selectedValue.splice(index,1);
      }
      this.setState({selectedVariable:selectedValue});
    }

    handleVariables()
    {
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Variable</h4>
                </Card>);
      var splitVariables=[];
      splitVariables.push(<List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
            {this.state.question.split(" ").map(variable => <ListItem key={variable} primaryText={variable} leftCheckbox={<Checkbox value={variable} onCheck={this.handleSelectedCheckBox}/>} style={{backgroundColor:'#FFF8E1',margin:'5px'}}/>)}</List>);
       temp.push(splitVariables);
        this.setState({sliced:splitVariables});
        temp.push(<RaisedButton label="Proceed" disabled={this.state.variableButton} primary={true} onClick={this.handleOption} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});
    }
    handleChange(e)
    {
        this.setState({question:e.target.value});
    }

    handleOption(){
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Option</h4>
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
          temp.push(optionsSelectedLocal);
        temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleVariableMeaning} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});
    }
    handleVariableMeaning(){
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Hey! Lemme Know What Did You Mean By "  {this.state.selectedVariable.map(variable =>variable+ " ")} "</h4>
                </Card>);
        var variableMeaningTemp=[];
        variableMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
            {variableMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable}
              onClick={() => { this.handleSelectedVariableMeaning(variable) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
          temp.push(variableMeaningTemp);
        temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleOptionMeaning} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});
    }
    handleSelectedVariableMeaning(variable){
      this.setState({selectedVariableMeaning:variable});
    }

    handleOptionMeaning(){
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Ok! I got that.... Now Which of following best match " {this.state.selectedOption.map(variable =>variable+ " ")} " in Context of " {this.state.selectedVariable.map(variable =>variable+ " ")} "</h4>
                </Card>);
        var optionMeaningTemp=[];
        optionMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
            {optionMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable} onClick={() => { this.handleSelectedOptionMeaning(variable) }}  style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
          temp.push(optionMeaningTemp);
        temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleFinalMeaning} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});
    }
    handleSelectedOptionMeaning(option){
      this.setState({selectedOptionMeaning:option});
    }
    handleFinalMeaning(){
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedVariable.map(variable =>variable+ " ")} " is... Select The Description Which Matches Best</h4>
                </Card>);
        var finalMeaningTemp=[];
        finalMeaningTemp.push(<List style={{margin:"0% 10% 0% 10%"}}>
            {finalMeaning.map(variable => <ListItem key={variable} primaryText={variable} value={variable} onClick={() => { this.handleSelectedFinalMeaning(variable) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>);
          temp.push(finalMeaningTemp);
        temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleNoofOptions} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});

    }
    handleSelectedFinalMeaning(final)
    {
        this.setState({selectedFinalMeaning:final});
    }
    handleNoofOptions(){
      var arr=[];
      for(var i=2;i<13;i++ )
      {
        arr.push(<ListItem key={i} primaryText={i}  onClick={() => { this.handleSelectedNoofOptions(i) }}  style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>);
      }
      var temp=[];
      var key=0;
          temp.push(<Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Cool !! I Am All Set.. Just A Last Query... How Many Options Shall I Generate ?</h4>
                </Card>);
        var optionsTemp=[];
         optionsTemp.push(<List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
         {arr}
          </List>);
          temp.push(optionsTemp);
        temp.push(<RaisedButton label="Proceed" primary={true} disabled={this.state.optionButton} onClick={this.handleDisplay} style={{marginLeft:"45%"}}/>);
        this.setState({displayScreen:temp});

    }
    handleSelectedNoofOptions(no){
      this.setState({noofoptions:no});
    }
    handleDisplay(){
      console.log("final");
    }
    render()
    {
        const styles = {
                  errorStyle: {
                    color: grey900,
                  },
                  underlineStyle: {
                    borderColor: grey900,
                  },
                  floatingLabelStyle: {
                                    color: grey900,
                  },
                  floatingLabelFocusStyle: {
                    color: grey900,
                  },
                };
        return(
        <div>
                <Card style={{height:90,width:"90%",margin:"auto"}}>
                <MediaQuery query='(min-device-width: 1224px)'>
                  <h1 style={{textAlign:"center",paddingTop:20}}>Enter a sample Question (E.g. Who won the first Noble Prize?)</h1>
                 </MediaQuery>
                  <MediaQuery query='(min-device-width: 1824px)'>
                    <h1 style={{textAlign:"center",paddingTop:20,fontSize:20}}>Enter a sample Question (E.g. Who won the first Noble Prize?)</h1>
                  </MediaQuery>
                  <MediaQuery query='(max-width: 1224px)'>
                    <h1 style={{textAlign:"center",paddingTop:20,fontSize:20}}>Enter a sample Question (E.g. Who won the first Noble Prize?)</h1>
                  </MediaQuery>
                </Card>

                <MediaQuery query='(min-device-width: 768px)'>
                <TextField
                hintText="Type your Question Here"
                hintStyle={styles.errorStyle} style={{marginLeft:"5%",width:"70%",marginTop:10}} onChange={this.handleChange}/>
                 <RaisedButton label="Done" secondary={true} onClick={this.handleVariables} style={{marginLeft:"2%"}}/>
                 </MediaQuery>

              <MediaQuery query='(max-device-width: 414px)'>
              <TextField
                hintText="Type your Question Here"
                hintStyle={styles.errorStyle} style={{marginLeft:"5%",width:"90%",marginTop:10}} onChange={this.handleChange}/>
                <RaisedButton label="Done" secondary={true} onClick={this.handleVariables} style={{marginLeft:"35%"}}/>
              </MediaQuery>
              {this.state.displayScreen}
        </div>
        );

    }
}
