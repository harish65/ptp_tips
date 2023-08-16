import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from "reactstrap";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

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
      margin: '6px auto 18px',
      '&:nth-child(even)': {
      }
   },
   avatar: {
      width: 30,
      height: 30,
      display: 'inline-flex',
      background:'#142841',
      color: '#fff',
   },
   h6: {
      marginBottom: 0,
      color: '#142841',
      fontSize: window.innerWidth < 900 ? 12 : 15,
   },
   chip: {
      height: 18,
      margin: 2,
      '& span': {
         fontWeight: 600,
         fontSize: 12,
         padding: '2px 6px',
         background: '#58bd33',
         borderRadius: 4,
         color: '#fff',
         fontFamily: 'Poppins'
      }
   }
});


export default (data) => {
   const { basicInfo, verification_process } = data.data;
   const classes = useStyles();
   return (
      <Card className={`${classes.root} registering-steps-root`}>
         <CardContent className={classes.content}>
            <h4 className='section-header'>Identity Verification Process <a href={basicInfo?.siteUrl}>{basicInfo?.name}</a>:</h4>
            <p className={classes.note}>{verification_process?.verificationContent}</p>
            <h5 className="section-sub-header">To verify Identity, you need :</h5>
               <Row className={classes.row}>
                  <Col xs={2} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><Avatar className={classes.avatar}>{'1'}</Avatar></Col>
                  <Col xs={10} style={{ paddingLeft: 0, margin: 'auto' }}>
                     <h6 className={classes.h6}>{verification_process?.identityConfirmation?.content}</h6>
                  </Col>
                  <Col sm={{ offset: 2, size: 10 }}>
                     {verification_process?.identityConfirmation?.docsRequired.split(",").map((doc, i) => (
                        <Chip label={doc} key={i} className={classes.chip} ></Chip>
                     ))}
                  </Col>
               </Row>
               <Row className={classes.row}>
                  <Col xs={2} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><Avatar className={classes.avatar}>{'2'}</Avatar></Col>
                  <Col xs={10} style={{ paddingLeft: 0, margin: 'auto' }}>
                     <h6 className={classes.h6}>{verification_process?.addressConfirmation?.content}</h6>
                  </Col>
                  <Col sm={{ offset: 2, size: 10 }}>
                     {verification_process?.addressConfirmation?.docsRequired.split(",").map((doc, i) => (
                        <Chip label={doc} key={i} className={classes.chip} ></Chip>
                     ))}
                  </Col>
               </Row>
            <p className={classes.note}>{verification_process?.postVerificationContent}</p>
         </CardContent>
      </Card>
   )
}

