import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { verifyAccount } from '../../config/config';
import { signInAfterRegistration, signInCommingFromEmail } from '../../redux/actions/auth'
import moment from 'moment-timezone'

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message : '',
        }
    }

    componentDidMount() {
        this.verify();
      }

    async verify(){
        const { dispatch } = this.props
        await verifyAccount(this.props.match.params.id)
            .then((res) => {
                if(res.status === 200){
                    dispatch(signInAfterRegistration(res.response))
                    let today = moment().tz('Australia/Sydney').format("DD-MM-YYYY")
                    setTimeout(this.props.history.push(`/horse-racing-tips/${today}`) , 500);  
                }else if(res.status === 300){
                    dispatch(signInCommingFromEmail(res.response))
                    let today = moment().tz('Australia/Sydney').format("DD-MM-YYYY")
                    setTimeout(this.props.history.push(`/horse-racing-tips/${today}`) , 500); 
                }
            })
            .catch((err) => {
                this.setState({
                    message: 'An error occurred during the verification process of your account! please try again or contact customer support.'
                });
            });
    }

    render() {
        return (
                <div style={{marginTop: '60px', textAlign: 'center'}}>
                    <h1>Email Verification </h1>
                    {this.state.message === ''?
                        <p>
                            Please wait, we are verifying your email. You will be redirected shortly to the next step.
                        </p> :
                        <p style={{color: 'red'}}>
                            {this.state.message}
                        </p>
                    }
                </div>
        );
    }
}

const mapStateToProps = state => ({
    
})

export default withRouter(connect(mapStateToProps)(Verify))
