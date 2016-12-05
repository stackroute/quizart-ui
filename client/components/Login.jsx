import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
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

const errorMessages = {
  projectName: "Please enter only characters and number.",
  emailError: "Please enter a valid email",
  numericError: "Please provide a password"
};
const styles = {
  loginStyle: {
    marginTop: window.innerHeight / 4.5,
    marginLeft: "auto",
    marginRight: "auto"
  },
  errorStyle: {
    color: 'red'
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
    console.log("in login js");
    Request.post('http://localhost:8081/users/login/login')
      .set('Content-type', 'application/json')
      .send({
        userName: data.email,
        password: data.password
      })
      .end((err, res) => {
        if (res.status===200) {
          console.log("200 status")
          var loginObj = {'login':'success'};
          localStorage.setItem('loginObj', JSON.stringify(loginObj));
          this.context.router.push('/');
          console.log(res.body.message);
        } else {
          var loginObj = {'login':'fail'};
          localStorage.setItem('loginObj', JSON.stringify(loginObj));
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
        <Col xs={ 12 }>
        <Card
              zDepth={ 2 }
              style={ styles.loginStyle }>
          <Row center="xs">
            <Formsy.Form
                         onValid={ this.enableButton }
                         onInvalid={ this.disableButton }
                         onValidSubmit={ this.submitForm }
                         onInvalidSubmit={ this.notifyFormError }>
              {/* <ActionAccountCircle style={ imageSize.mystyle }  */}

              <CardText>
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
      </Grid>
      );
  }
}
