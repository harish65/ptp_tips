import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from "reactstrap";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
   root: {
      marginBottom: 12,
      padding: 16
   },
   content: {
      padding: window.innerWidth < 900 ? '0 !important' : '16px !important',
   },
   note: {
      fontSize: 15,
      margin: '12px 0'
   },
   row: {
      margin: '4px auto',
   },
   avatar: {
      width: 30,
      height: 30,
      display: 'inline-flex',
   },
   h6: {
      marginBottom: 0,
      color: '#000000b5',
      fontSize: window.innerWidth < 900 ? 14 : 16,
   },
});


export default (data) => {
   const { basicInfo, registration_process } = data.data;
   const classes = useStyles();
   return (
      <Card className={`${classes.root} registering-steps-root`}>
         <CardContent className={classes.content}>
            <h4 className='section-header'>Signing Up with {basicInfo?.name}:</h4>
            <p className={classes.note}>{registration_process?.RegistrationContent}</p>
            <h5 className="section-sub-header">Step by Step Guide to Register an Account with <a href={basicInfo?.siteUrl} target="_blank" rel="noreferrer">{basicInfo?.name} </a>:</h5>
            {registration_process.registrationSteps.map((item, i) => (
               <Row key={i} className={classes.row}>
                  <Col xs={2} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><Avatar className={classes.avatar}>{i + 1}</Avatar></Col>
                  <Col xs={10} style={{ paddingLeft: 0, margin: 'auto' }}> <h6 className={classes.h6}>{item?.step}</h6></Col>
               </Row>
            ))}
            <p className={classes.note}>{registration_process?.postRegistrationContent}</p>
         </CardContent>
      </Card>
   )
}