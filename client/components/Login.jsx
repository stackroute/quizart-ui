import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import {red500, orange500, cyan500,purple300, cyan100} from 'material-ui/styles/colors';
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

const errorMessages = {
  projectName: "Please enter only characters and number.",
  emailError: "Please enter a valid email",
  numericError: "Please provide a password"
};


const styles = {
  loginStyle: {
    // marginTop: window.innerHeight / 4.5,
    // marginLeft: "auto",
    // marginRight: "auto",
    backgroundColor: "#04000000",
    color: 'white'
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
  }
}
var flag = false;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.state = {
      canSubmit: false,
      open: false,
      err: ''
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
    Request.post('/login')
      .set('Content-type', 'application/json')
      .send({
        userName: data.email,
        password: data.password
      })
      .end((err, res) => {
        if (res.status===200) {
          if(res.body.isValid)
          {
          var token = res.body.message;
          console.log(jwt_decode(token));
          console.log(jwt_decode(token).role);
          localStorage.setItem('token', JSON.stringify(token));
          this.context.router.push('/');
        }
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
  render() {
    return (
      <Grid>
        <Row xs="center">
        <Col xs={ 6 }>
        <Card
              style={ styles.loginStyle }>
          <Row center="xs">
            <Formsy.Form
                         onValid={ this.enableButton }
                         onInvalid={ this.disableButton }
                         onValidSubmit={ this.submitForm }
                         onInvalidSubmit={ this.notifyFormError }>
              <CardText>
                <Row center="xs"><h2>Already a user?</h2> </Row>
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
                              floatingLabelText="Email"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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
                              required
                              hintText="Enter Password"
                              floatingLabelText="Password"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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
                                label="Login"
                                primary={ true }
                                disabled={ !this.state.canSubmit } />
                  </Col>
                </Row>
              </CardText>
            </Formsy.Form>
          </Row>
        </Card>
        </Col>
      </Row>
      </Grid>
      );
  }
}
