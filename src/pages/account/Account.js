import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './account.scss'

import 'react-phone-input-2/lib/style.css'
  
import InfoForm from  './components/form';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    const { isLoggedIn } = this.props
    if(!isLoggedIn){
      this.props.history.push('/')
    }
  }

  render() {

    const renderCheck = () => {
      if(this.props.isLoggedIn){
        return <InfoForm/>
      }else{
        return (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:64, flexDirection:'column'}}>
            <h1>You are not Logged In.</h1>
            <p style={{fontSize:15, width:260,textAlign:'center'}}>Please login to your PTP Account to access this page.</p>
          </div>
        )
      }
    }
    return renderCheck()
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser
})


export default withRouter(connect(mapStateToProps)(Account));
