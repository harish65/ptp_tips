import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Grid } from "@material-ui/core";
import 'react-phone-input-2/lib/style.css'
import '../register.scss';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleInputChange = (e) => {
        this.props.setUserDetails(e)
    }

    

    render() {
        return (<>
            <Grid item xs={12}>
                <h3>Contact information</h3>
            </Grid>
            <Grid item xs={12}>
                <h5 style={{color: 'red'}}>{this.props.message}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    First Name
                </div>
                <input
                    required
                    onChange={this.handleInputChange}
                    className="form-control h-auto form-control-solid py-4 px-8"
                    style={{textAlign: 'left'}}
                    type="text"
                    name="firstName" />
            </Grid>

            <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    Last Name
                </div>
                <input
                    onChange={this.handleInputChange}
                    required
                    style={{textAlign: 'left'}}
                    className="form-control h-auto form-control-solid py-4 px-8"
                    type="text"
                    name="lastName" />
            </Grid>

            <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    Email Address
                </div>
                <input
                    required
                    onChange={this.handleInputChange}
                    style={{textAlign: 'left'}}
                    className="form-control h-auto form-control-solid py-4 px-8"
                    type="email"
                    name="email"/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    Password
                </div>
                <input
                    value={this.state.password}
                    required
                    onChange={this.handleInputChange}
                    style={{textAlign: 'left'}}
                    className="form-control h-auto form-control-solid py-4 px-8"
                    type="password"
                    name="password" />
            </Grid>
        </>
        )
    }
}



const mapStateToProps = state => ({

})


export default withRouter(connect(mapStateToProps)(ContactForm));