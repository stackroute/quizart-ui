import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Grid,Row} from 'react-flexbox-grid';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DisplayDialog from './DialogAlert';

export default class CategoryIcon extends React.Component {
 static get propTypes() {
   return {
     category: React.PropTypes.object.isRequired
   };
    this.handleClickTopic=this.handleClickTopic.bind(this);
 }

 handleClickTopic()
 {
   ReactDOM.unmountComponentAtNode(document.getElementById('selectedCategory'));
  ReactDOM.render(<MuiThemeProvider><DisplayDialog category={this.props.categoryName} open={true}/>
  </MuiThemeProvider>,document.getElementById('selectedCategory'));
}


 render() {
   const styles={
     imgAva:{
       height:'80px',
       width:'80px',
       marginTop: '20px'
     },
     nameCat: {
       paddingLeft:'20px'
     }

   }

   return (

     <div>
     <Grid>
       <Row>
         <Avatar style={styles.imgAva} src = {this.props.category.imageUrl} onClick={()=>this.handleClickTopic(this)}/>
       </Row>
       <br/>
       <Row>
         <small style={styles.nameCat}>{this.props.category.name}</small>
       </Row>
     </Grid>
     <div id="selectedCategory">
     </div>
     </div>

     );
 }
}