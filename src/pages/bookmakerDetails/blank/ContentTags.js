

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";




const useStyles = makeStyles({
   root: {
      padding: 16
   },
});


export default (data) => {
   // const { id,bookmakerId, name, logo, bonusText, tnCPage, rating, siteUrl,pros,cons } = data.data;
   const classes = useStyles();
   return (
      <div className={classes.root} >
         <h4>Content Tags</h4>
      </div>
   )
}



