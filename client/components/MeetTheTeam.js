import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Row,Col,Grid} from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {cyan500,blue500} from 'material-ui/styles/colors';

const styles = {
  style: {
    height: 130,
    width: 120,
    margin: 5,
    fontSize: 12,
    textAlign: 'center',
    display: 'inline-block',
  },
  imageStyle: {
    padding: 5,
    marginTop: -50,
  },
};

const MemberPaper = () => (
  <div>
    <div className="row center-xs">
      <div className="col-xs-6">
        <h1>Meet The Team</h1>
      </div>
    </div>
    <br/>
    <Grid>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>

            <Paper style={styles.style} zDepth={2} rounded={false} >
              <Avatar src="./img/srini.jpg" size={90} style={styles.imageStyle} />
              <h3>Srinivasan</h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>
            </Paper>
            <Paper style={styles.style} zDepth={2} rounded={false} >
              <Avatar src="./img/vishant.jpg" size={90} style={styles.imageStyle} />
              <h3>Vishant Sharma</h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>
            </Paper>

            <Paper style={styles.style} zDepth={2} rounded={false} >
              <Avatar src="./img/kirti.jpg" size={"90"} style={styles.imageStyle} />
              <h3>Kirti Jalan</h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>

            </Paper>
            <Paper style={styles.style} zDepth={2} rounded={false} >
              <Avatar src="./img/nitin.jpg" size={90} style={styles.imageStyle} />
              <h3>Nitin Verma</h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>
            </Paper>

            <Paper style={styles.style} zDepth={2} rounded={false}>
              <Avatar src="./img/dhivya.jpg" size={90} style={styles.imageStyle} />
              <h3>Dhivyalakshmi V </h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>

            </Paper>
            <Paper style={styles.style} zDepth={2} rounded={false} >
              <Avatar src="./img/lal.jpg" size={90} style={styles.imageStyle} />
              <h3>Lal Jose</h3>
              <Row>
                <Col xs>
                    <i className="fa fa-github" backgroundColor={blue500}/>
              </Col>
              <Col xs>
                <i className="fa fa-linkedin"/>
                </Col>
              </Row>

            </Paper>

          </Col>
        </Row>
      </Grid>


  </div>
);

export default MemberPaper;
