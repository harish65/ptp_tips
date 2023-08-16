import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './definition.scss'

/* REDUX */


class Definition extends React.Component {


  render() {
    
    return (
      <div className="col-md-12">
        Definition PAGE
        

      </div>
    );
  }
}

const mapStateToProps = state => ({

})


export default withRouter(connect(mapStateToProps)(Definition));
