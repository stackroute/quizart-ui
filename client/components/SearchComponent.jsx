import React from 'react';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const styles={
  height: 100,
  width: 1500,
  textAlign: 'center',
  margin:'auto'

};

export default class SearchComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleAPICall=this.handleAPICall.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleAPICall(event){
    var SearchValue=this.state.value;
    console.log(SearchValue);
    this.props.onSearch(SearchValue);
  }

  render(){
    return(
      <div>
    <Paper style={styles} zDepth={1} >
      <form >
     <TextField
      hintText="anything"
      style={{width:'1000px'}}
      onChange={this.handleChange}
      floatingLabelText="Search"
      floatingLabelFixed={true}
      />
      <RaisedButton label="Search" primary={true} onClick={this.handleAPICall}/>
    </form>
    </Paper>
    </div>
    );
  }
}
