import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetPass, logoutUser, cleanMessages } from '../../redux/actions/auth'
import { Button } from 'reactstrap'


class ForgotPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPass: '',
            confirmPass: '',
            status: '',
        }
    }

    async componentDidMount() {
      const { isLoggedIn, dispatch, currentUser } = this.props
      if(isLoggedIn){
        dispatch(logoutUser(currentUser.email))
      }
      dispatch(cleanMessages())
    }

    onDataChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
      };

    resetPassword = (e) => {
        e.preventDefault();
        const {dispatch} = this.props
        let clientID = this.props.match.params.id
        if (this.state.newPass.length >= 4) {
          if (this.state.newPass === this.state.confirmPass) {
            dispatch(resetPass({ id: clientID, pass: this.state.newPass },this.props.history))
          } else {
            return this.setState({ status: 'Confirmation password does not match, please try again.' })
          }
        } else {
          return this.setState({ status: 'Password length should not be under 4 charachters long' })
        }
      }

    render() {
        return (
                <div className="rounded-top" style={{textAlign: 'center', maxWidth: '400px', margin: 'auto', marginTop: 100}}>
                    <h1>Reset your password </h1>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'red' }}>{this.state.status}</p>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'red' }}>{this.props.forgotError}</p>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'blue' }}>{this.props.forgotMessage}</p>

                    <form onSubmit={this.resetPassword} >
                        <div style={{textAlign: 'left' }}>
                            <label>Password : </label>
                            <input
                            className="form-control rounded-right border-0 text-dark opacity-80 email-field"
                            style={{textAlign: 'left'}}
                            onChange={this.onDataChange}
                            type="password"
                            required
                            value={this.state.newPass}
                            name="newPass"
                            placeholder="New Password"
                            autoComplete="off"
                            />
                        </div>

                        <div style={{ marginTop: 20, textAlign: 'left' }}>
                            <label>Confirm : </label>
                            <input
                            className="form-control rounded-right border-0 text-dark opacity-80 email-field"
                            style={{textAlign: 'left'}}
                            onChange={this.onDataChange}
                            type="password"
                            required
                            value={this.state.confirmPass}
                            name="confirmPass"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            />
                        </div>
                        
                        <div style={{ marginTop: 24 }}>
                        <Button 
                            color="primary" style={{ color: 'white' }} size="md"
                            type="submit">
                                Reset Password
                        </Button>
                        </div>
                       
                        </form>
                </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    forgotError: state.auth.forgotError,
    forgotMessage: state.auth.forgotMessage,
})

export default withRouter(connect(mapStateToProps)(ForgotPass))
