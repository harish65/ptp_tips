import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Image } from 'semantic-ui-react'
import appStore from "../../../assets/Icons/app-store.svg";
import playStore from "../../../assets/Icons/play-store.svg";

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
   },
   link: {
      margin: '0 6px'
   }
});


export default (data) => {
   const { mobile_Apps } = data.data;
   const classes = useStyles();
   return (
      <>
         {mobile_Apps && (
            <Card className={`${classes.root} platforms-root`}>
               <CardContent className={classes.content}>
                  <h4 className='section-header'>Mobile Applications:</h4>
                  <p className={classes.review}>{mobile_Apps?.content}</p>
                  <h5 className='section-sub-header' style={{ textAlign: 'center', margin: '12px 0' }}>Download Application</h5>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <a href={mobile_Apps?.iosAppStoreLink} target="_blank" className={classes.link} rel="noreferrer"><Image src={appStore} alt="" rounded size='small' /></a>
                     <a href={mobile_Apps?.androidPlayStoreLink} target="_blank" className={classes.link} rel="noreferrer"><Image src={playStore} alt="" rounded size='small' /></a>
                  </div>
               </CardContent>
            </Card>
         )}
      </>
   )
}

