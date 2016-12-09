import React from 'react';
import SearchComponent from './SearchComponent.jsx';
import DisplayComponent from './DisplayComponent.jsx';
import Request from 'superagent';
export default class JeopardyCluesHome extends React.Component{

  constructor(){
    super();
    this.state={dataObj:[]};
    this.handleSearchValue=this.handleSearchValue.bind(this);
  }

  handleSearchValue(SearchValue){
    var tempClues=[];
    Request.post('http://localhost:8081/generateClues')
   .set('Content-type', 'application/json')
   .send({searchValue:SearchValue})
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

  render(){
    return(
      <div>
      <SearchComponent onSearch={this.handleSearchValue}></SearchComponent>
      <DisplayComponent SearchObj={this.state.dataObj}></DisplayComponent>
    </div>
    );
  }
}
