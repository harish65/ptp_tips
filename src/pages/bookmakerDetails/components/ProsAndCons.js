import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from "reactstrap";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import check from "../../../assets/Icons/check.svg";
import minus from "../../../assets/Icons/minus.png";

const useStyles = makeStyles({
   root: {
      marginBottom: 12,
      padding: 16
   },
   content: {
      padding: window.innerWidth < 900 ? '0 !important' : '16px 16px  0 !important',
   },
});

export default (data) => {
   const { pros_bs, cons_bs } = data.data;
   const classes = useStyles();
   return (
      <>
         {(pros_bs?.length > 0 || cons_bs?.length > 0) && (
            <Card className={`${classes.root} pros-cons-root`}>
               <CardContent className={classes.content}>
                  <h4 className='section-header'>Pros & Cons:</h4>
                  <Row>
                     <Col md={6} style={{ marginBottom: 18 }}>
                        <Card >
                           <CardContent style={{ padding: 0 }}>
                              <div className="bookmaker-highlights pros">
                                 <img src={check} alt="" />
                                 {pros_bs?.map((item, i) => (
                                    <Row key={i}>
                                       <Col xs={1} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><FontAwesomeIcon icon={faThumbsUp} /></Col>
                                       <Col xs={11} style={{ paddingLeft: 0, margin: 'auto' }}> <h6>{item?.point}</h6></Col>
                                    </Row>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </Col>
                     <Col md={6} style={{ marginBottom: 18 }}>
                        <Card>
                           <CardContent style={{ padding: 0 }}>
                              <div className="bookmaker-highlights cons">
                                 <img src={minus} alt="" />
                                 {cons_bs?.map((item, i) => (
                                    <Row key={i}>
                                       <Col xs={1} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><FontAwesomeIcon icon={faThumbsDown} /></Col>
                                       <Col xs={11} style={{ paddingLeft: 0, margin: 'auto' }}> <h6>{item?.point}</h6></Col>
                                    </Row>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </Col>
                  </Row>
               </CardContent>
            </Card>
         )}
      </>
   )
}