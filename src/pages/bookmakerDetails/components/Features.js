

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from "reactstrap";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles({
   root: {
      marginBottom: 12,
      padding: 16
   },
   content: {
      padding: window.innerWidth < 900 ? '0 !important' : '16px !important',
   },
   icon:{
      color: '#132841'
   }
});


export default (data) => {
   const { salient_features } = data.data;
   const classes = useStyles();
   return (
      <>
         {salient_features?.length > 0 && (
            <Card className={`${classes.root} salient-feature-root`}>
               <CardContent className={classes.content}>
                  <h4 className='section-header'>Salient Features:</h4>
                  <div className="features-list" style={{}}>
                     {salient_features.map((item, i) => (
                        <Row key={i}>
                           <Col xs={1} style={{ paddingRight: 8, textAlign: 'right', margin: 'auto' }}><FontAwesomeIcon icon={faTrophy}  className={classes.icon}/></Col>
                           <Col xs={11} style={{ paddingLeft: 0, margin: 'auto' }}> <h6 style={{ margin: 0 }}>{item?.feature}</h6></Col>
                        </Row>
                     ))}
                  </div>
               </CardContent>
            </Card>
         )}
      </>
   )
}

