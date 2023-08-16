import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Image } from 'semantic-ui-react'
import { Col, Row } from "reactstrap";
import StarRating from '../../../components/StarRating';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
   root: {
      marginBottom: 12,
      padding: 16

   },
   content: {
      padding: window.innerWidth < 900 ? '0 !important' : '16px !important',
   },
   star_rating: {
      marginTop: 18,
      marginBottom: 0
   },
   logo: {
      width: 180,
      height: 90,
      borderRadius: 4,
      margin: '0 auto',
   },
   star_count: {
      fontSize: '2rem',
      fontWeight: 600,
      marginTop: 6
   },
   shortDescription:{
      marginTop:8,
      fontSize:15,
      fontWeight: 500,
      color: '#000000b5'
   },
   button: {
      fontWeight: 600,
      borderRadius: 43,
      fontSize: 14,
      textTransform: 'capitalize',
      background: '#132841',
      fontFamily: 'poppins',
      color: 'white',
      minWidth: 120,
      height: 41,
      backgroundColor: '#44bd32',
      borderColor: '#44bd32',
      '&:hover': {
         color: "#142841 !important",
      }
   }
});


export default (data) => {
   const { basicInfo, rating, shortDescription } = data.data;
   const classes = useStyles();
   return (
      <Card className={`${classes.root} general-info-root`}>
         <CardContent className={classes.content}>
            <h4 className='section-header'>Description & Rating:</h4>
            <Row>
               <Col md={3} style={{ margin: 'auto' }}>
                  <div className="logo-rating-review" style={{ textAlign: "center" }}>
                     <Image className={`${classes.logo}`} src={basicInfo?.logo} alt="" />
                     <div className={`${classes.star_rating}`} >
                        <StarRating rating={rating} />
                        <h4 className={`${classes.star_count}`}>{rating}</h4>
                     </div>
                  </div>
               </Col>
               <Col md={9}>
                  <p className={classes.shortDescription}>{shortDescription}</p>
                  <div style={{ margin: '24px 0 12px' }}>
                     <Button variant="outlined" className={`${classes.button}`} disableElevation onClick={() => window.open(basicInfo?.siteUrl, "_blank")}>
                        Sign Up
                     </Button>
                  </div>
               </Col>
            </Row>
         </CardContent>
      </Card>
   )
}