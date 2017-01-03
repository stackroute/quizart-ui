import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { red500, orange500, cyan500,purple300, cyan100 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import config from './../config';
import Login from './Login';

const errorMessages = {
  projectName: "Please enter only characters and number.",
  emailError: "Please enter a valid email",
  numericError: "Please provide a password",
  confirmError: "Passwords do not match",
  pwdLength: "Passwords should have atleast 8 characters"
};
const styles = {
  signupStyle: {
    backgroundColor: "#04000000",
    color: 'white'
  },
  textStyle:{
      color:cyan500
  },
  errorStyle: {
    color: 'red'
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
    WebkitAutofill: 'none'
  }
}
var flag = false;
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.state = {
      canSubmit: false,
      open: false,
      err: '',
      loginState: false
    };
  }
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }
  disableButton() {
    this.setState({
      canSubmit: false
    });
  }
  static get contextTypes() {
   return{
     router: React.PropTypes.object.isRequired,
   };
 }
  submitForm(data) {
    console.log("Inside Signup.js ");
    console.log(data);
    Request.post(config.restUrl + '/signin/signin')
      .set('Content-Type', 'application/json')
      .send({
        "userName": data.username,
        "email": data.email,
        "password": data.password
      })
      .end((err, res) => {
        console.log(err)
        console.log(res)
        if (res.status===200) {
          alert("You have been successfully signed in!");
          this.setState({loginState: true});
          // this.context.router.push('/login');
        } else {
          this.setState({
            err: res.body.message
          });
          return false;
        }
      });
  }
  notifyFormError(data) {
    console.error('Form error:', data);
  }
  // loginDisplay(){
  //   this.setState({loginState: true});
  // }
  render() {
    if(this.state.loginState){
      return(
        <div  style={styles.signupStyle}>
          <Grid>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}><Login /></Col>
            </Row>
          </Grid>
        </div>
      );
    }
    return (
       <div className="autofill">
      <Grid>
        <Col lgOffset={2} mdOffset={3} xs={6} sm={6} md={6} lg={8}>
        <Card
              style={ styles.signupStyle }>
          <Row center="xs">
            <Formsy.Form
                         onValid={ this.enableButton }
                         onInvalid={ this.disableButton }
                         onValidSubmit={ this.submitForm }
                         onInvalidSubmit={ this.notifyFormError }>

              <CardText>
                  <Row center="xs"><h2 style={{color:'#FF7885'}}>New User? </h2></Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <FormsyText
                              type="text"
                              name="username"
                              validationError={ errorMessages.userError }
                              required
                              hintText="Enter your User Name"
                              textareaStyle={styles.textStyle}
                              hintStyle={styles.inputStyle}
                              floatingLabelText="User Name"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.inputStyle}
                              updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <FormsyText
                              type="email"
                              name="email"
                              validations="isEmail"
                              validationError={ errorMessages.emailError }
                              required
                              hintText="Enter your Email"
                              textareaStyle={styles.textStyle}
                              hintStyle={styles.inputStyle}
                              floatingLabelText="Email"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.inputStyle}
                              updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <FormsyText
                              type="password"
                              name="password"
                              validations="minLength:8"
                              validationError={ errorMessages.pwdLength }
                              id = "pwd"
                              required
                              hintText="Enter Password"
                              textareaStyle={styles.textStyle}
                              hintStyle={styles.inputStyle}
                              floatingLabelText="Password"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.inputStyle}
                              updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <FormsyText
                              type="password"
                              name="confirmPassword"
                              validations="equalsField:password"
                              validationError={ errorMessages.confirmError }
                              required
                              hintText="Enter Password"
                              textareaStyle={styles.textStyle}
                              hintStyle={styles.inputStyle}
                              floatingLabelText="Confirm Password"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.inputStyle}
                              updateImmediately
                              // onBlur = {this.confirmPassword} validationErrors={this.state.validationErrors}
                            />
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <span style={ styles.errorStyle }>{ this.state.err }</span>
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <RaisedButton
                                type="submit"
                                label="Sign Me Up!"
                                primary={ true }
                                disabled={ !this.state.canSubmit }/>
                                {/* // onClick={this.loginDisplay.bind(this)} */}
                  </Col>
                </Row>
              </CardText>
            </Formsy.Form>
          </Row>
        </Card>
        </Col>
      </Grid>
    </div>
      );
  }
}
