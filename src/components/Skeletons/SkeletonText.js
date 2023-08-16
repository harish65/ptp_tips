import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: 0,
    marginBottom: 15,
    // backgroundColor: "white",
    // borderRadius: "4px",
    // border: "1px solid #379239",
  },
});

export default function SkeletonText(props) {
  const classes = useStyles();
  let j=[0,1,2,3,4,5,6,7,8,9]
      // eslint-disable-next-line array-callback-return
  let final = j.map((zone,i)=>{
        if(i<10){
            return(
            <div key={i} className={classes.root} style={{backgroundColor: props.dark ? '#1D1D1C' : 'white', padding:8, borderRadius:10, marginTop:8}}>
                <Skeleton height={30}/>
                <Skeleton animation="pulse" height={13}/>
                <Skeleton animation="wave" height={20}/>
            </div>
            )
        }
    }) 
    return (
        final
  );
}
