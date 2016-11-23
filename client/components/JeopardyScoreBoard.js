import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Row,Col,Grid} from 'react-flexbox-grid';
import Gauge from 'react-svg-gauge';
// import Odometer from 'react-odometer';
import OdometerComponent from 'react-odometer';
import RaisedButton from 'material-ui/RaisedButton';


export default class JeopardyScoreBoard extends React.Component{
  render(){
    const styles = {
      coinStyle: {
        height: 40,
        width: 30,
        // margin: 5,
        // fontSize: 12,
        // textAlign: 'center',
        // display: 'inline-block',
      },
      gridStyle:{
        backgroundColor: "white",
        backgroundImage: 'url("./../img/dots.jpg")',
      },
    };
    return(
      <Grid style={styles.gridStyle}>
        <Row center="xs"  middle="xs">
          <Col xs={1} sm={1} md={1} lg={1}>Ranking</Col>
          <Col xs={2} sm={2} md={2} lg={2}>Player</Col>
          <Col xs={3} sm={3} md={3} lg={3}>Score</Col>
          {/* <Col xs={1} sm={1} md={1} lg={1}>Coins</Col> */}
          <Col xs={4} sm={4} md={4} lg={4}> Accuracy</Col>
        </Row>
        <Row center="xs"  middle="xs">
          <Col xs={1} sm={1} md={1} lg={1}>1</Col>
          <Col xs={2} sm={2} md={2} lg={2}><Avatar src="./img/avt1.png" size={90}/></Col>
          <Col xs={3} sm={3} md={3} lg={3}> 23423 <img src="./../img/coin1.png" style={styles.coinStyle} /></Col>
          {/* <Col xs={1} sm={1} md={1} lg={1}><img src="./../img/coin1.png" style={styles.coinStyle} /></Col> */}
          <Col xs={4} sm={4} md={4} lg={4}>
            <div>
               <Gauge value={78} width={100} height={80} label="" color="blue" />
           </div>
          </Col>
        </Row>
        <Row center="xs"  middle="xs">
          <Col xs={1} sm={1} md={1} lg={1}>2</Col>
          <Col xs={2} sm={2} md={2} lg={2}><Avatar src="./img/avt2.png" size={90}/></Col>
          <Col xs={3} sm={3} md={3} lg={3}> 23123<img src="./../img/coin2.png" style={styles.coinStyle}/> </Col>
          {/* <Col xs={1} sm={1} md={1} lg={1}><img src="./../img/coin2.png" style={styles.coinStyle}/></Col> */}
          <Col xs={4} sm={4} md={4} lg={4}>
            <div>
               <Gauge value={91} width={100} height={80} label="" color="green"  />
           </div>
          </Col>
        </Row>
        <Row center="xs"  middle="xs">
          <Col xs={1} sm={1} md={1} lg={1}>3</Col>
          <Col xs={2} sm={2} md={2} lg={2}><Avatar src="./img/avt3.png" size={90}/></Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <OdometerComponent value={234} width={100} height={80} label="" color="blue"/>
            <img src="./../img/coin3.png" style={styles.coinStyle}/>
            {/* React.createElement(OdometerComponent, {value:{234}}) */}
           </Col>
          {/* <Col xs={1} sm={1} md={1} lg={1}><img src="./../img/coin3.png" style={styles.coinStyle}/></Col> */}
          <Col xs={4} sm={4} md={4} lg={4}>
            <div>
               <Gauge value={89} width={100} height={80} label="" color="green" />
           </div>
          </Col>
        </Row>
        <Row center="xs"  middle="xs">
          <Col xs={1} sm={1} md={1} lg={1}>4</Col>
          <Col xs={2} sm={2} md={2} lg={2}><Avatar src="./img/avt4.png" size={90}/></Col>
          <Col xs={3} sm={3} md={3} lg={3}> 20423 <img src="./../img/coin4.png" style={styles.coinStyle}/></Col>
          {/* <Col xs={1} sm={1} md={1} lg={1}><img src="./../img/coin4.png" style={styles.coinStyle}/></Col> */}
          <Col xs={4} sm={4} md={4} lg={4}>
            <div>
               <Gauge value={43} width={100} height={80} label="" color="red" />
           </div>
          </Col>
        </Row>
        <Row center="xs"  middle="xs">
          <Col>
            <RaisedButton
            label="REPLAY"
            primary={true}
            icon={<i className="material-icons">replay</i>}/>
        </Col>
        <Col>
          <RaisedButton
          label="HOME"
          secondary={true}
          icon={<i className="material-icons">home</i>}/>
        </Col>
        </Row>
        <br/>
      </Grid>
    );
  }
}
// const JeopardyScoreBoard = () => {
//   <Grid>
//     <Row>
//       <Col xs={1} sm={1} md={1} lg={1}>1</Col>
//       <Col xs={3} sm={3} md={3} lg={3}><Avatar src="./images/kirti.jpg" size={90}/></Col>
//       <Col xs={4} sm={4} md={4} lg={4}></Col>
//       <Col xs={4} sm={4} md={4} lg={4}></Col>
//     </Row>
//   </Grid>
// }
//
// export default JeopardyScoreBoard;
