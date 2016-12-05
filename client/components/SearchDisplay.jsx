import React from 'react';

export default class SearchDisplay extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.ElementObj);
    return(
    <div>
      <p>{this.props.ElementObj.description}</p>
    </div>
  );
}
}
