import React from 'react';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const styles={
  height: 100,
  width: 500,
  textAlign: 'center',
  margin:'auto'

};

export default class SearchComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleAPICall=this.handleAPICall.bind(this);
  }

  handleAPICall(event){
    var SearchValue=event.target.value;
    this.props.onSearch(SearchValue);
  }

  render(){
    return(
      <div>
    <Paper style={styles} zDepth={1} >
     <TextField
      hintText="anything"
      onChange={this.handleAPICall}
      floatingLabelText="Search"
      floatingLabelFixed={true}
      />
    </Paper>
    </div>
    );
  }
}
