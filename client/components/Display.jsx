import React from 'react';
import SearchDisplay from './SearchDisplay.jsx';
export default class DisplayComponent extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    var SearchObj=this.props.SearchObj;
    var SearchListArr=SearchObj.map(function(element){
      return(<SearchDisplay ElementObj={element}></SearchDisplay>);
    });

    return(
      <div>
        {SearchListArr}
      </div>
    );
  }

}
