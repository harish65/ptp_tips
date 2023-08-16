import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
   review: {
      fontSize: 15,
      color: '#000000b5'
   }
});


export default (data) => {
   const { expertReview } = data.data;
   const classes = useStyles();
   return (
      <>
         {expertReview && (
            <Card className={`${classes.root} detailed-review-root`}>
               <CardContent className={classes.content}>
                  <h4 className='section-header'>Expert Review:</h4>
                  <p className={classes.review}>{expertReview}</p>
               </CardContent>
            </Card>
         )}
      </>
   )
}

