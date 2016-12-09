  import React from 'react';
  import SwipeableViews from 'react-swipeable-views';
  import Request from 'superagent';
  import {Grid, Row, Col} from 'react-flexbox-grid';
  import TextField from 'material-ui/TextField';
  import Paper from 'material-ui/Paper';
  import RaisedButton from 'material-ui/RaisedButton';
  import {Card,CardTitle} from 'material-ui/Card';
  import {List, ListItem} from 'material-ui/List';
  import Checkbox from 'material-ui/Checkbox';
  import SearchDisplay from './SearchDisplay.jsx';
  const styles={
    paperStyle:{
    height: '100%',
    width: 900,
    textAlign: 'center',
    margin:20,
    padding:20,
    backgroundColor:'#c2efd9'
  },
  textFieldStyle:{
    marginLeft:"5%",
    width:"65%",
    marginTop:10
  },
  imageStyle:{
    height: 250,
    width: 300
  },
  buttonNext:
  {
    marginLeft:"40%",
  },
  };
  var value=1;
  export default class JeopardyClues extends React.Component{

    constructor(){
      super();
      this.state={enableChoose:true,enableSubjectMeaning:true,enableSelectedSubjectContext:true,jeopardyClues:[],generatedSubjects:[],pandqString:[],pIdForSubject:'',qIdForSubject:'',slideIndex: 0,dataObj:[],input: '',selectedSubject:'',selectedSubjectMeaning:[],subjectMeaning:'',qStringForSubject:''};
    }
    handleChange=(event)=>{
      value=1;
      this.setState({slideIndex:value})
      this.setState({input: event.target.value});
      this.setState({enableChoose:false});
    };
    handleClick=()=>{
      var tempClues=[];
      Request.post('http://localhost:8081/generateClues')
     .set('Content-type', 'application/json')
     .send({searchValue:this.state.input})
     .end((err, res) => {
       if (res.status===200) {
         if(res.body===null){
     res.body = JSON.parse(res.text);
     res.body.itemListElement.map(function(data){
       tempClues.push(data);
     });
     console.log(tempClues);
     this.setState({dataObj:tempClues});
     }
   }
      else{
         return false;
       }
    });
    }

  handleSubject=(input)=>
  {
    value++;
    this.setState({slideIndex:value});
    this.setState({selectedSubject:input});
    var variableMeaningArray=[];
    Request.post('http://localhost:8081/getVariableMeaning')
   .set('Content-type', 'application/json')
   .send({selectedVariable:input})
   .end((err, res) => {
     if (res.status===200) {
        if(res.body===null){
         res.body = JSON.parse(res.text);
         res.body.search.map(function(data){
           variableMeaningArray.push(data);
         });
         this.setState({selectedSubjectMeaning:variableMeaningArray});
     }
   }
    else{

       this.setState({
         err: res.body.message
       });
       return false;
     }
 });
  };

  handleSelectedSubjectMeaning=(variable,id)=>{
    this.setState({subjectMeaning:variable});
    this.setState({qStringForSubject:id});
    this.setState({enableSubjectMeaning:false});
  };

  handleSubjectContext=()=>
  {
    value++;
    this.setState({slideIndex:value});
    var tempString=[];
    Request.post('http://localhost:8081/getFinalMeaning')
      .set('Content-type', 'application/json')
      .send({
        id:this.state.qStringForSubject
      })
      .end((err, res) => {
        if (res.status===200) {
          for(var key in res.body)
          {
            tempString.push(res.body[key]);
        }
        this.setState({pandqString:tempString});
      }
        else {
        return false;
        }
      });
  };
  handleSelectedSubjectContext=(pnum,qnum)=>
  {
      this.setState({pIdForSubject:pnum});
      this.setState({qIDForSubject:qnum});
      this.setState({enableSelectedSubjectContext:false});
  };
  handleListOfSubject=()=>{
    var tempSubject=[];
    value++;
    this.setState({slideIndex:value});
    Request.post('http://localhost:8081/generateSubject')
      .set('Content-type', 'application/json')
      .send({
        pIdForSubject:this.state.pIdForSubject,
        qIDForSubject:this.state.qIDForSubject,
      })
      .end((err, res) => {
        var questions=[];
        if (res.status===200) {
          if(res.body===null){
      res.body = JSON.parse(res.text);
      res.body.itemListElement.map(function(data){
        temp.push(data);
      });
      console.log(temp);
      this.setState({jeopardyClues:temp});
    }
    }
  });
  };
  handleClueDisplay=()=>{
    value++;
    this.setState({slideIndex:value});
    var  temp=[];
    console.log("hh");
    Request.post('http://localhost:8081/generateJeopardyClues')
   .set('Content-type', 'application/json')
   .send({generatedSubjects:this.state.generatedSubjects})
   .end((err, res) => {
     if (res.status===200) {
       if(res.body===null){
   res.body = JSON.parse(res.text);
   res.body.itemListElement.map(function(data){
     temp.push(data);
   });
   console.log(temp);
   this.setState({jeopardyClues:temp});
   }
 }
    else{
       return false;
     }
  });
  };
    render(){
      return(
        <div>
          <Paper style={styles} zDepth={1} >
           <TextField
            style={styles.textFieldStyle}
            onChange={this.handleChange}
            floatingLabelText="Search Here"
            />
          <RaisedButton label="Search" primary={true} onClick={this.handleClick} style={{margin:'2%'}}/>
          </Paper>

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlide} >

        <div></div>
      <div>
      {this.state.dataObj.map(element=>
      <Row center='xs'>
      <Paper style={styles.paperStyle} zDepth={1}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
            <img src={element.result.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
        </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
          <h1 style={{margin:2,color:'#1A237E'}}>{element.result.name}</h1>
       <RaisedButton label="Choose" disabled={this.state.enableChoose} secondary={true} onTouchTap={() => this.handleSubject(element.result.name)}/>
        </Col>
      </Row>
        </div>
        </Paper>
      </Row>
    )}
      </div>


      <div>
        <Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Hey! Lemme Know What Did You Mean By "  {this.state.selectedSubject} "</h4> </Card>
        <List style={{margin:"0% 10% 0% 10%"}}>
        {this.state.selectedSubjectMeaning.map(data=>
            <ListItem key={data.description} primaryText={data.label+"-"+data.description}
    onClick={() => {this.handleSelectedSubjectMeaning(data.description,data.id)}} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/> )} </List>
  <RaisedButton label="Next" disabled={this.state.enableSubjectMeaning} secondary={true} onClick={this.handleSubjectContext} style={styles.buttonNext}/>
      </div>

      <div>
        <Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedSubject} " is... Select The Description Which Matches Best</h4>
                </Card>
                {this.state.pandqString.map(text=>
                  <List style={{margin:"0% 10% 0% 10%"}}>
                    <ListItem key={text.pString+" - "+text.qString} primaryText={text.pString+" - "+text.qString}  onClick={() => { this.handleSelectedSubjectContext(text.pNum,text.qNum) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/></List>
                )}
                     <RaisedButton label="Next" disabled={this.state.enableSelectedSubjectContext} secondary={true} onClick={this.handleListOfSubject} style={styles.buttonNext}/>
      </div>

      <div>
        {this.state.jeopardyClues.map(function(element){
          return(<SearchDisplay ElementObj={element}></SearchDisplay>);
        })}
           <RaisedButton label="Next" disabled={this.state.enableSelectedSubjectContext} secondary={true} onClick={this.handleListOfSubject} style={styles.buttonNext}/>
      </div>
    </SwipeableViews>
  </div>
      );
    }
  }
