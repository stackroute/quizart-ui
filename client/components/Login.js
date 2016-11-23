import React from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, cyan500,purple300, cyan100} from 'material-ui/styles/colors';
import {Row,Col,Grid} from 'react-flexbox-grid';


const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: cyan100,
  },
  floatingLabelFocusStyle: {
    color: cyan500,
  },
  inputStyle:{
    color: cyan100,
  },
};
class Login extends React.Component{
  constructor(props){
      super(props);
      this.changeLoginStatus = this.changeLoginStatus.bind(this);
  }
  changeLoginStatus(){
    console.log(this.props);
    this.props.checkedLoggedIn(true);
    this.props.router.replace('/');
  }
render(){ return(
  <Grid><Row>
  <Col xs={12}>
    <Row center="xs">
      <Col xs={6}>
        <div>
          <TextField
            hintText="Enter your User Name"
            hintStyle={styles.floatingLabelStyle}
            floatingLabelText="User Name"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            inputStyle={styles.inputStyle}
          />
          <br />
          <TextField
            hintText="Enter your Password"
            floatingLabelText="Password"
            type="password"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            inputStyle={styles.inputStyle}
          />
        <br /><br />
        <RaisedButton
            href="#"
            label="Log In"
            primary={true}
            onClick={this.changeLoginStatus}
            icon={<i className="material-icons">people</i>}
          />
          <br/>
        </div>
      <br/>
      </Col>
    </Row>
  </Col>
</Row>
</Grid>
);
}
}
export default Login;
