import React from 'react';
import ReactDOM from 'react-dom';
import SearchComponent from './Search.jsx';
import DisplayComponent from './Display.jsx';
import Request from 'superagent';
export default class Main extends React.Component{

  constructor(){
    super();
    this.state={dataObj:[]};
    this.handleAjaxCall=this.handleAjaxCall.bind(this);
  }

  handleAjaxCall(searchString){
      var url='http://www.wikidata.org/w/api.php?action=wbsearchentities&search='+searchString+'&language=en&format=json';
      let that = this;
      Request
        .get(url)
        .end(function(err, res){
          that.setState({
            dataObj:res.body.search
        });
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
