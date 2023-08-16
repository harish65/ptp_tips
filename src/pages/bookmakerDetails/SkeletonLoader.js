import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from "reactstrap";

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: 8,
    marginBottom: 15
  },
});

export default ({ dark }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ backgroundColor: dark ? '#1D1D1C' : 'white', marginTop: 8 }}>

      <Row>
        <Col md={3} style={{ margin: 'auto' }}>
          <Skeleton animation="wave" height={100} width={'90%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={60} width={'90%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={40} width={'90%'} style={{ margin: '0 auto' }} />
        </Col>
        <Col md={7}>
          <Skeleton animation="wave" height={60} width={'150'} />
          <Skeleton animation="wave" height={40} width={'100%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={20} width={'100%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={40} width={'100%'} style={{ margin: '0 auto' }} />
          <Row>
            <Col md={6} style={{ marginTop: 18, marginBottom: 18 }}>
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
            </Col>
            <Col md={6} style={{ marginTop: 18, marginBottom: 18 }}>
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
              <Skeleton animation="wave" height={30} width={'100%'} style={{ margin: '0 auto' }} />
            </Col>
          </Row>
        </Col>
        <Col md={2} style={{ margin: 'auto' }}>
          <Skeleton animation="wave" height={40} width={'90%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={60} width={'90%'} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" height={20} width={'90%'} style={{ margin: '0 auto' }} />
        </Col>
      </Row>
    </div>
  )
}
