import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";


import StarRating from '../../../components/StarRating';
import check from "../../../assets/Icons/check.svg";
import minus from "../../../assets/Icons/minus.png";

const useStyles = makeStyles({
   root: {
      padding: 16
   },
});


export default (data) => {
   const { id, basicInfo, signUpBonus, shortDescription, rating, pros_bs, cons_bs } = data.data;
   const classes = useStyles();
   return (
      <div className={classes.root} >
         <Row>
            <Col md={3} style={{ margin: 'auto' }}>
               <div className="logo-rating-review" style={{ textAlign: "center" }}>
                  <Image className='bookmaker-logo' src={basicInfo?.logo} alt="" />
                  <div className="star-rating">
                     <StarRating rating={rating} />
                     <h4 className='rating-count'>{rating}</h4>
                  </div>
                  <Link to={`/bookmaker/${id}`} className='read-review'>
                     <Button variant="outlined" color="secondary" className='review-btn'>
                        Read Review
                     </Button>
                  </Link>
               </div>
            </Col>
            <Col md={7}>
               <div className="bookmaker-info">
                  <h3 className='b-name'>{basicInfo?.name}</h3>
                  <p className='b-desc'>{shortDescription}</p>
                  <h4 className='highlight-tag'>Highlights</h4>
                  <Row>
                     <Col md={6} style={{ marginTop: 18, marginBottom: 18 }}>
                        <Card >
                           <CardContent style={{ padding: 0 }}>
                              <div className="bookmaker-highlights pros">
                                 <img src={check} alt="" />
                                 {pros_bs?.length > 0 && pros_bs.map((item, i) => (
                                    <Row key={i}>
                                       <Col xs={2} style={{ paddingRight: 0, margin: 'auto' }}><FontAwesomeIcon icon={faThumbsUp} /></Col>
                                       <Col xs={10} style={{ paddingLeft: 0, margin: 'auto' }}> <h6>{item?.point}</h6></Col>
                                    </Row>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </Col>
                     <Col md={6} style={{ marginTop: 18, marginBottom: 18 }}>
                        <Card>
                           <CardContent style={{ padding: 0 }}>
                              <div className="bookmaker-highlights cons">
                                 <img src={minus} alt="" />
                                 {cons_bs?.length > 0 && cons_bs.map((item, i) => (
                                    <Row key={i}>
                                       <Col xs={2} style={{ paddingRight: 0, margin: 'auto' }}><FontAwesomeIcon icon={faThumbsDown} /></Col>
                                       <Col xs={10} style={{ paddingLeft: 0, margin: 'auto' }}> <h6>{item?.point}</h6></Col>
                                    </Row>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </Col>
                  </Row>
               </div>
            </Col>
            <Col md={2} style={{ margin: 'auto' }}>
               <div className="bookmaker-link">
                  <h5 className='bonus-text'>{signUpBonus}</h5>
                  <Button className='btn-bonus' variant="contained" disableElevation onClick={() => window.open(basicInfo?.siteUrl, "_blank")}>
                     Get Bonus
                  </Button>
                  <a className='term-link' href={basicInfo?.tnCPage} target="_blank" rel="noreferrer">Terms & Conditions</a>
               </div>
            </Col>
         </Row>
      </div>
   )
}



