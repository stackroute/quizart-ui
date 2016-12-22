import React from 'react';
import ReactDOM from 'react-dom';
import SearchComponent from './SearchComponent.jsx';
import DisplayComponent from './DisplayComponent.jsx';
export default class MainComponent extends React.Component{

  constructor(){
    super();
    this.state={dataObj:[]};
    this.handleAjaxCall=this.handleAjaxCall.bind(this);
  }

  handleAjaxCall(SearchValue){
    // alert('entering');
      var url='https://kgsearch.googleapis.com/v1/entities:search?query='+SearchValue+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&limit=10&indent=True';
      $.ajax({
        url:url,
        type:'GET',
        dataType:'JSON',
        success:function(data){
          // console.log(data);
          // alert(data.itemListElement[0].result.image.contentUrl);
          this.setState({dataObj:data.itemListElement});
          // console.log(this.state.dataObj);
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
