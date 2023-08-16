import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row } from "reactstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Image } from 'semantic-ui-react'

const useStyles = makeStyles({
   root: {
      marginBottom: 12,
      padding: 16,
   },
   content: {
      padding: window.innerWidth < 900 ? '0 !important' : '16px !important',
   },
   row: {
      padding: '8px 0',
      border: '1px solid lightgray',
      borderRadius: 4,
      margin: '4px auto',
      maxWidth: 512,
      '&:nth-child(even)': {
         background: '#0000001a',
      }
   },
   h6: {
      marginBottom: 0,
      color: '#000000b5',
      fontSize: window.innerWidth < 900 ? 12 : 14,
      textAlign: 'center'
   },
   img: {
      width: '82px !important',
      border: '1px solid darkslategray',
      borderRadius: '6px !important',
      padding: '4px 4px',
   }
});

export default (data) => {
   const { payment_methods } = data.data;
   const classes = useStyles();
   return (
      <>
         {payment_methods && (
            <Card className={`${classes.root} payment-methods-root`}>
               <CardContent className={classes.content}>
                  <h4 className="section-header">Payment Methods:</h4>
                  <Row>
                     <Col md={12} className="deposit-options">
                        <h5 className="section-sub-header">Deposit Options</h5>
                        <p style={{ fontSize: 15 }}>{payment_methods?.depositContent}</p>
                        {payment_methods.depositOptions.map((item, i) => {
                           const isActive = (typeof item.active === 'boolean' ? item.active : (item?.active === 'true'))
                           return (
                              isActive && (
                                 <Row className={classes.row} key={i}>
                                    <Col xs={5} style={{ margin: "auto" }}> <h6 className={classes.h6}>{item?.type}</h6></Col>
                                    <Col xs={4} style={{ margin: "auto" }}> <Image src={require(`../../../assets/Icons/payments/${item?.icon}`).default} className={classes.img} /></Col>
                                    <Col xs={3} style={{ margin: "auto" }}> <h6 className={classes.h6}>{item?.timeTaken}</h6></Col>
                                 </Row>
                              )
                           )
                        })}
                     </Col>
                     <Col md={12} className="withdrawal-options">
                        <h5 className="section-sub-header" style={{ marginTop: 12 }}>Withdrawal Options</h5>
                        <p style={{ fontSize: 15 }}>{payment_methods?.withdrawalContent}</p>
                        {payment_methods.withdrawalOptions.map((item, i) => {
                           const isActive = (typeof item.active === 'boolean' ? item.active : (item?.active === 'true'))
                           return (
                              isActive && (
                                 <Row className={`${classes.row} `} key={i}>
                                    <Col xs={5} style={{ margin: "auto" }}> <h6 className={classes.h6}>{item?.type}</h6></Col>
                                    <Col xs={4} style={{ margin: "auto" }}> <Image src={require(`../../../assets/Icons/payments/${item?.icon}`).default} className={classes.img} /></Col>
                                    <Col xs={3} style={{ margin: "auto" }}> <h6 className={classes.h6}>{item?.timeTaken}</h6></Col>
                                 </Row>
                              )
                           )
                        })}
                     </Col>
                  </Row>
               </CardContent>
            </Card>
         )}
      </>
   );
};


