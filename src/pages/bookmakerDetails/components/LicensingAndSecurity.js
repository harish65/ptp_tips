

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
   paragraph: {
      fontSize: 15,
      color: '#000000b5',
      marginBottom: 12,
   }
});


export default (data) => {
   const { license_security } = data.data;
   const classes = useStyles();
   return (
      <>
         {license_security && (
            <Card className={`${classes.root} platforms-root`}>
               <CardContent className={classes.content}>
                  <h4 className='section-header'>Legislation, Licensing & Security:</h4>

                  <h5 className="section-sub-header" style={{ marginTop: 12 }}>Legislation</h5>
                  <p className={classes.paragraph}>{license_security?.legislation}</p>

                  <h5 className="section-sub-header" style={{ marginTop: 12 }}>Licensing</h5>
                  <p className={classes.paragraph}>{license_security?.license}</p>

                  <h5 className="section-sub-header" style={{ marginTop: 12 }}>Security</h5>
                  <p className={classes.paragraph}>{license_security?.security}</p>
               </CardContent>
            </Card>
         )}
      </>

   )
}

