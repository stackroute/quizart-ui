import React from 'react';
import ReactDOM from 'react-dom';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {Card,CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Request from 'superagent';
const styles = {
  slide: {
    padding: 10,
  },
  card: {
    width:"90%",
    margin:"auto",
    textAlign:'center',
    marginTop:10
  },
  buttonNext:
  {
    marginLeft:"40%",
  },
  questionField :
  {
    marginLeft:"5%",
    width:"65%",
    marginTop:10
  },
  buttonDone:{
    marginLeft:"1%",
  }
};
var value=1;
var selectedValue=[],index,selectedOptionValue=[];
export default class QuestionGeneratorHome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={slideIndex: 0,enableVariable:true,enableOption:true,enableVariableMeaning:true,enableOptionMeaning:true,enableFinal:true,enablenoofoptions:true,question:' ',qStringForVariable:'',pIdForOption:'',pIdForVariable:'',qIDForVariable:'',selectedOptionMeaning:[],variables:[],selectedVariable:[],options:[],selectedVariableMeaning:[],selectedFinalMeaning:'',variableMeaning:'',optionMeaning:'',pString:[],noOfOptionsDisplay:[],noofoptions:''};
        this.handleSlide = this.handleSlide.bind(this);
        this.handleVariables = this.handleVariables.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSelectedCheckBox = this.handleSelectedCheckBox.bind(this);
        this.handleVariableMeaning = this.handleVariableMeaning.bind(this);
        this.handleOptionMeaning = this.handleOptionMeaning.bind(this);
    }
    handleVariables()
    {
        value=1;
        this.setState({slideIndex:value});
        this.setState({selectedVariable:[]});
        this.setState({selectedOption:[]});
        this.setState({selectedVariableMeaning:[]});
        this.setState({selectedOptionMeaning:[]});
        console.log(this.state.selectedVariable);
        console.log(this.state.selectedOption);
        var temp=[];
        this.state.question.split(" ").map(variable => temp.push(variable));
        this.setState({variables:temp});

    }
    handleSelectedCheckBox=(e)=>{
        this.setState({enableVariable:false});
      if(e.target.checked) {
        selectedValue.push(e.target.value);
      } else {
      index=selectedValue.indexOf(e.target.value);
      selectedValue.splice(index,1);
      }
    this.setState({selectedVariable:selectedValue.join(" ")});
    };
    handleSelectedOptionCheckBox=(e)=>{
        this.setState({enableOption:false});
      if(e.target.checked) {
        selectedOptionValue.push(e.target.value);
      } else {
      var index=selectedOptionValue.indexOf(e.target.value);
      selectedOptionValue.splice(index,1);
      }
      this.setState({selectedOption:selectedOptionValue.join(" ")});
    };

    handleSlide()
    {
        var generate;
        value++;
        this.setState({slideIndex:value});
        if(this.state.options==''&&this.state.selectedVariable.length!=0)
        {
            this.setState({meaningFlag:true});
              var option=this.state.selectedVariable.split(" ");
             for(var variable in option)
            {
                     var index=this.state.variables.indexOf(option[variable]);
                        this.state.variables.splice(index,1);
            }
    this.setState({options:this.state.variables});
        }
    }

    handleInput(e)
        {
            this.setState({question:e.target.value});
        }
  handleVariableMeaning()
  {
    value++;
    this.setState({slideIndex:value});
     var variableMeaningArray=[];
     Request.post('http://localhost:8081/getVariableMeaning')
    .set('Content-type', 'application/json')
    .send({selectedVariable:this.state.selectedVariable})
    .end((err, res) => {
      if (res.status===200) {
         if(res.body===null){
          res.body = JSON.parse(res.text);
          res.body.search.map(function(data){
            variableMeaningArray.push(data);
          });
          this.setState({selectedVariableMeaning:variableMeaningArray});
      }
    }
     else{

        this.setState({
          err: res.body.message
        });
        return false;
      }
  });
  }
  handleOptionMeaning()
  {
    value++;
    this.setState({slideIndex:value});
    var optionMeaningArray=[],text;
    Request.post('http://localhost:8081/getOptionMeaning')
    .set('Content-type', 'application/json')
    .send({
      selectedOption:this.state.selectedOption
    })
    .end((err, res) => {
      if (res.status===200) {

        if(res.body===null){
    res.body = JSON.parse(res.text);
    res.body.search.map(function(data){
      optionMeaningArray.push(data);

    });
    this.setState({selectedOptionMeaning:optionMeaningArray});
    }
      } else {
        this.setState({
          err: res.body.message
        });
        return false;
      }
    });
  }
  handleSelectedVariableMeaning=(variable,id)=>{
    this.setState({variableMeaning:variable});
    this.setState({qStringForVariable:id});
    this.setState({enableVariableMeaning:false});
  };

  handleVariableMeaningDisplay=()=>{
    value++;
    this.setState({slideIndex:value});
    var tempString=[];
    Request.post('http://localhost:8081/getFinalMeaning')
      .set('Content-type', 'application/json')
      .send({
        id:this.state.qStringForVariable
      })
      .end((err, res) => {
        if (res.status===200) {
          for(var key in res.body)
          {
            tempString.push(res.body[key]);
        }
        this.setState({pString:tempString});
      }
        else {
          console.log("error");
        }
      });
  }
  handleSelectedOptionMeaning=(option,id)=>{
    this.setState({optionMeaning:option});
    this.setState({pIdForOption:id});
    this.setState({enableOptionMeaning:false});
  };
handleNoofOptions=()=>{
  value++;
  this.setState({slideIndex:value});
  var number=[];
  for(var i=2;i<13;i++ )
  {
    number.push(i);
  }
  this.setState({noOfOptionsDisplay:number})
};
handleSelectedFinalMeaning=(pnum,qnum)=>
{
    this.setState({pIdForVariable:pnum});
    this.setState({qIDForVariable:qnum});
    this.setState({enableFinal:false});
};
handleSelectedNoofOptions=(no)=>{
  this.setState({enablenoofoptions:false});
  this.setState({noofoptions:no});
};
handleFinalMeaning=()=>{
  value++;
  this.setState({slideIndex:value});
  var tempString=[];
  Request.post('http://localhost:8081/generateQuestions')
    .set('Content-type', 'application/json')
    .send({
      pIdForVariable:this.state.pIdForVariable,
      qIDForVariable:this.state.qIDForVariable,
      pIdForOption:this.state.pIdForOption,
      numberOfQuestions:20,
      numberofOptions:this.state.noofoptions
    })
    .end((err, res) => {
      if (res.status===200) {
      console.log("done");
    }
      else {
        console.log("error");
      }
    });
}

    render()
    {
        return(
              <div>
                 <Card style={styles.card}>
                      <CardTitle title="Enter a sample Question (E.g. Who won the first Nobel Prize?)"/>
                  </Card>
                  <TextField hintText="Type your Question Here" style={styles.questionField} onChange={this.handleInput}/>
                  <RaisedButton label="Done" secondary={true} onClick={this.handleVariables} style={styles.buttonDone}/>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleSlide} >

                  <div>
                  </div>

                  <div style={styles.slide}>
                  <Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Variable</h4></Card>
                     <List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>{this.state.variables.map(variable => <ListItem key={variable} primaryText={variable} leftCheckbox={<Checkbox value={variable} onCheck={this.handleSelectedCheckBox}/>} style={{backgroundColor:'#FFF8E1',margin:'5px'}}/>)}</List>
                   <RaisedButton label="Next" disabled={this.state.enableVariable} secondary={true} onClick={this.handleSlide} style={styles.buttonNext}/>
                  </div>


                     <div style={styles.slide}>
                    <Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Select The Word(s) Which Shall Act as Option</h4> </Card>
                     <List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
                    {this.state.options.map(variable => <ListItem key={variable} primaryText={variable} leftCheckbox={<Checkbox value={variable} onCheck={this.handleSelectedOptionCheckBox}/>} style={{backgroundColor:'#FFF8E1',margin:'5px'}}/>)}</List>
                  <RaisedButton label="Next" disabled={this.state.enableOption} secondary={true} onClick={this.handleVariableMeaning} style={styles.buttonNext}/>
                    </div>


                 <div style={styles.slide}>
                        <Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Hey! Lemme Know What Did You Mean By "  {this.state.selectedVariable} "</h4> </Card>
                        <List style={{margin:"0% 10% 0% 10%"}}>
                        {this.state.selectedVariableMeaning.map(data=>
                            <ListItem key={data.description} primaryText={data.label+"-"+data.description}
                    onClick={() => {this.handleSelectedVariableMeaning(data.description,data.id)}} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/> )} </List>
                  <RaisedButton label="Next" disabled={this.state.enableVariableMeaning} secondary={true} onClick={this.handleOptionMeaning} style={styles.buttonNext}/>
                </div>


                <div>
                <Card style={{height:80,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Ok! I got that.... Now Which of following best match " {this.state.selectedOption} " in Context of " {this.state.selectedVariable} "</h4></Card>
                <List style={{margin:"0% 10% 0% 10%"}}>
                {this.state.selectedOptionMeaning.map(data=>
             <ListItem key={data.description} primaryText={data.label+"-"+data.description} onClick={() => { this.handleSelectedOptionMeaning(data.label,data.id) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}</List>
             <RaisedButton label="Next" disabled={this.state.enableOptionMeaning} secondary={true} onClick={this.handleVariableMeaningDisplay} style={styles.buttonNext}/>
                </div>

                <div>
                  <Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedVariable} " is... Select The Description Which Matches Best</h4>
                          </Card>
                          {this.state.pString.map(text=>
                            <List style={{margin:"0% 10% 0% 10%"}}>
                              <ListItem key={text.pString+" - "+text.qString} primaryText={text.pString+" - "+text.qString}  onClick={() => { this.handleSelectedFinalMeaning(text.pNum,text.qNum) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/></List>
                          )}
                               <RaisedButton label="Next" disabled={this.state.enableFinal} secondary={true} onClick={this.handleNoofOptions} style={styles.buttonNext}/>
                </div>

                <div>
              <Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Cool !! I Am All Set.. Just A Last Query... How Many Options Shall I Generate ?</h4>
                </Card>
                    <List style={{display: 'flex',flexDirection: 'row',flexWrap: "wrap",marginLeft:"5%"}}>
                    {this.state.noOfOptionsDisplay.map(i=><ListItem key={i} primaryText={i}  onClick={() => { this.handleSelectedNoofOptions(i) }}  style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/>)}
                      </List>
                      <RaisedButton label="Next" disabled={this.state.enablenoofoptions} secondary={true} onClick={this.handleFinalMeaning} style={styles.buttonNext}/>
                </div>

                </SwipeableViews>
              </div>


            );
    }
}
