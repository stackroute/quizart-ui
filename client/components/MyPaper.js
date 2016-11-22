import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from './../../node_modules/material-ui/Card';
import Paper from './../../node_modules/material-ui/Paper';
import {deepOrange300, purple500, greenA400, grey100, black, blueGrey400, cyan900, white, indigo500} from './../../node_modules/material-ui/styles/colors';
import {Tabs, Tab} from './../../node_modules/material-ui/Tabs';
import {Table, TableBody, TableRow, TableHeader, TableRowColumn, TableHeaderColumn} from './../../node_modules/material-ui/Table';
import Avatar from './../../node_modules/material-ui/Avatar';
import LinearProgress from './../../node_modules/material-ui/LinearProgress';
import {Grid, Row, Col} from './../../node_modules/react-flexbox-grid';

const styles = {
  paperStyle:{
  height: 629,
  width: 700,
  background: deepOrange300,
  // marginLeft: '10%',
  display: 'inline-block',
  },
  pieChartPaperStyle: {
    height:'40%',
    width: '50%',
    // marginLeft: '20%',
  },
  cardPaperStyle: {
    height:400,
    width: 600,
  },

  cardStyle:{
    height: 629,
    width: 700,
    // marginLeft: '20%',
    background: greenA400,
    display: 'inline-block',
  },
  tableHeaderStyle:{
    background: indigo500,
  },
  tableBodyStyle:{
    background: cyan900,
  }
};

const MyCard= () => (
  <Grid>
    <Row center='xs'>
      <Col xs={12} sm={12} md={6} lg={6}>
<Card style={styles.cardStyle}>

  <CardHeader  titleColor={white} titleStyle={{fontSize:22}} style={{fontFamily: 'Krona One', textTransform: 'uppercase' }}
      title="LeaderBoard"

    />

  <Paper style={styles.paperStyle}>
  <Tabs tabTemplateStyle={{background:{deepOrange300}}}>
    <Tab label="jeopardy" style={{fontFamily: 'Krona One', textTransform: 'uppercase'} }>
      <Table style={{ color:white}}>
          <TableHeader displaySelectAll={ false } adjustForCheckbox={false} style={styles.tableHeaderStyle}>
              <TableRow>
                  <TableHeaderColumn style={{fontSize:25,fontWeight:700,color:white}}>289</TableHeaderColumn>
                  <TableHeaderColumn  style={{width:40}}>
                      <Avatar color={deepOrange300} backgroundColor={purple500} size={50}>
                          A
                      </Avatar>
                  </TableHeaderColumn>
                  <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />chris evans</TableHeaderColumn>
                  <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>12899</TableHeaderColumn>
              </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={ false } style={styles.tableBodyStyle}>
              <TableRow style={{border:0}}>
                  <TableRowColumn style={{fontSize:20,fontWeight:700,color:white}}>1</TableRowColumn>
                  <TableRowColumn  style={{width:40}}>
                      <Avatar color={deepOrange300} backgroundColor={purple500} size={50}>
                          A
                      </Avatar>
                  </TableRowColumn>
                  <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />russel crew</TableHeaderColumn>
                  <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39999</TableHeaderColumn>
              </TableRow>
              <TableRow style={{border:0}}>
                  <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                  <TableRowColumn style={{width:40}}>
                      {< Avatar
                      color = {
                          deepOrange300
                      }
                      backgroundColor = {
                          purple500
                      }
                      size = {
                          50
                      } > A < /Avatar>}


                  </TableRowColumn>
                  <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                  <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                 </TableRow>
                 <TableRow  style={{border:0}}>
                     <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                     <TableRowColumn style={{width:40}}>
                         {< Avatar
                         color = {
                             deepOrange300
                         }
                         backgroundColor = {
                             purple500
                         }
                         size = {
                             50
                         } > A < /Avatar>}


                     </TableRowColumn>
                     <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                     <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                    </TableRow>
                    <TableRow style={{border:0}}>
                        <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                        <TableRowColumn style={{width:40}}>
                            {< Avatar
                            color = {
                                deepOrange300
                            }
                            backgroundColor = {
                                purple500
                            }
                            size = {
                                50
                            } > A < /Avatar>}


                        </TableRowColumn>
                        <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                       </TableRow>
                       <TableRow style={{border:0}}>
                           <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                           <TableRowColumn style={{width:40}}>
                               {< Avatar
                               color = {
                                   deepOrange300
                               }
                               backgroundColor = {
                                   purple500
                               }
                               size = {
                                   50
                               } > A < /Avatar>}


                           </TableRowColumn>
                           <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                           <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                          </TableRow>
                          <TableRow style={{border:0}}>
                              <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                              <TableRowColumn style={{width:40}}>
                                  {< Avatar
                                  color = {
                                      deepOrange300
                                  }
                                  backgroundColor = {
                                      purple500
                                  }
                                  size = {
                                      50
                                  } > A < /Avatar>}


                              </TableRowColumn>
                              <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                              <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                             </TableRow>
                             <TableRow style={{border:0}}>
                                 <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                                 <TableRowColumn style={{width:40}}>
                                     {< Avatar
                                     color = {
                                         deepOrange300
                                     }
                                     backgroundColor = {
                                         purple500
                                     }
                                     size = {
                                         50
                                     } > A < /Avatar>}


                                 </TableRowColumn>
                                 <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                                 <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                                </TableRow>
                                <TableRow style={{border:0}}>
                                    <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                                    <TableRowColumn style={{width:40}}>
                                        {< Avatar
                                        color = {
                                            deepOrange300
                                        }
                                        backgroundColor = {
                                            purple500
                                        }
                                        size = {
                                            50
                                        } > A < /Avatar>}


                                    </TableRowColumn>
                                    <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                                   </TableRow>
                                   <TableRow style={{border:0}}>
                                       <TableRowColumn style={{ fontSize:20,fontWeight:700,color:white}}>2</TableRowColumn>
                                       <TableRowColumn style={{width:40}}>
                                           {< Avatar
                                           color = {
                                               deepOrange300
                                           }
                                           backgroundColor = {
                                               purple500
                                           }
                                           size = {
                                               50
                                           } > A < /Avatar>}


                                       </TableRowColumn>
                                       <TableHeaderColumn  style={{width:400, fontSize:12, color:white, textTransform:'uppercase', fontFamily: 'Krona One'}}><LinearProgress mode="indeterminate" />david gandy</TableHeaderColumn>
                                       <TableHeaderColumn style={{fontSize:15,color: white, padding:0}}>39876</TableHeaderColumn>
                                      </TableRow>
          </TableBody>
      </Table>
    </Tab>
    <Tab label="Classical" style={{fontFamily: 'Krona One', textTransform: 'uppercase'} }></Tab>
    <Tab label="Adaptive" style={{fontFamily: 'Krona One', textTransform: 'uppercase'}}></Tab>
  </Tabs>
</Paper>

</Card>
</Col>
  
</Row>
</Grid>
);
export default MyCard;
