import React from 'react';
import ReactDOM from 'react-dom';
import SearchComponent from './Search.jsx';
import DisplayComponent from './Display.jsx';
import $ from 'jquery'; 
export default class Main extends React.Component{

  constructor(){
    super();
    this.state={dataObj:[]};
    this.handleAjaxCall=this.handleAjaxCall.bind(this);
  }

  handleAjaxCall(searchString){
              
      var url='https://www.wikidata.org/w/api.php?action=wbsearchentities&search='+searchString+'&language=en&format=json';
      $.ajax({
        url:url,
        type:'GET',
        dataType:'JSON',
        success:function(data){
          console.log(data);
          this.setState({dataObj:data.itemListElement});
        }.bind(this),
        error:function(err){
          console.log(err);
        }
      });
  }

  render(){
    return(
      <div>
      <SearchComponent onSearch={this.handleAjaxCall}></SearchComponent>
      <DisplayComponent SearchObj={this.state.dataObj}></DisplayComponent>
    </div>
    );
  }
}
