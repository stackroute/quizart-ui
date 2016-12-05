import React from 'react';

export default class SearchComponent extends React.Component{

  constructor(props){
    super(props);
    this.handleAPICall=this.handleAPICall.bind(this, props);
  }

  handleAPICall(props){
    var SearchValue=this.refs.Search.value;
    console.log(SearchValue);
    this.refs.Search.value='';
    this.props.onSearch(SearchValue);
  }

  render(){
    return(
      <div>
     <label>Search Anything:</label><br></br>
     <input type="text" ref="Search" placeholder="Search Anything"></input>
      <br></br>
      <button onClick={this.handleAPICall}> Search </button>
    </div>
    );
  }
}
