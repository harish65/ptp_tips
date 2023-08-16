import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Box, Grid, Button, CircularProgress } from '@material-ui/core';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StepIcons from "./StepperIcons"
import StepConnector from './StepConnector'

import ContactForm from "./ContactForm";
import PackageForm from "./PackageForm";
import PaymentForm from "./PaymentForm";

//STRIPE
import { CardElement } from "@stripe/react-stripe-js";

//REDUX
import { updateActiveStep, updatePaymentStep, signInAfterRegistration } from '../../../redux/actions/auth'
import { registerStep1, registerStep2, registerStep3 } from '../../../config/config'

const styles = (theme) => ({
    button: {
        marginRight: theme.spacing(1),
        // backgroundColor: "#142841"
    },
    mainBox: {
        position: "relative",
        marginTop: "0px",
        marginBottom: "55px",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
    stepper: {
        height: "calc(10vh - 40px)",
        minHeight: "100px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    buttonWrapper: {
        justifyContent: "flex-end"
    },
});


class Steppers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: this.props.activeStep,
            loading: false,
            notice: false,
            noticeMessage: '',
            message: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            country: 'Australia',
            //region: 'Australian Capital Territory',
            dob: '',
            plan: 'month',
            name: '',
            street_address: '',
            city: '',
            state: '',
            zip_code: '',
            googleMapLink: ''
        }
    }

    async componentDidMount() {
        const { userId, dispatch } = this.props
        if (userId === '') {
            dispatch(updateActiveStep())
        }
    }

    setUser = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    setPhone = (phone) => {
        this.setState({ phone: phone })
    }
    setCountry = (country) => {
        this.setState({ country: country })
    }
    setPlan = (plan) => {
        this.setState({ plan: plan })
    }
    setName = (name) => {
        this.setState({ name: name })
    }
    setStreet = (street) => {
        this.setState({ street_address: street })
    }
    setCity = (city) => {
        this.setState({ city: city })
    }
    setRegion = (region) => {
        this.setState({ state: region })
    }
    setZip = (zip) => {
        this.setState({ zip_code: zip })
    }
    setGoogleMap = (googleMap) => {
        this.setState({ googleMapLink: googleMap })
    }

    closeNotice = () => {
        this.setState({ notice: false })
    }

    handleBack = () => {
        let id = 'activeStep'
        this.setState(prevState => ({
            [id]: prevState[id] - 1,
        }))
        // const {dispatch } = this.props
        // dispatch(updateActiveStep())
    }
    handleReset = () => {
        this.setState({ activeStep: 0 })
    }

    handleNext = async () => {
        const { activeStep } = this.state
        const { dispatch } = this.props
        let id = 'activeStep'

        if (activeStep === 0) {
            this.setState({ loading: true })
            let userDetails = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
            await registerStep1(userDetails).then(response => {
                if (response.status === 200) {
                    this.setState({ loading: false, notice: true, noticeMessage: response.message })
                } else {
                    this.setState({ message: response.message, loading: false })
                }
            })

        } else if (activeStep === 1) {
            // console.log(this.props.userId)
            if (this.state.dob === '' || this.state.phone === '') {
                return this.setState({ notice: true, noticeMessage: 'Year of Birth and Phone number are required' })
            }
            // we have to check if the userId exist at first
            if (this.props.userId !== '') {
                this.setState({ loading: true })
                let userAddress = {
                    id: this.props.userId,
                    phone: this.state.phone,
                    country: this.state.country,
                    dob: this.state.dob,
                    street_address: this.state.street_address,
                    city: this.state.city,
                    state: this.state.state,
                    zip_code: this.state.zip_code,
                    googleMapLink: this.state.googleMapLink
                }
                await registerStep2(userAddress).then(response => {
                    if (response.status === 200) {
                        this.setState(prevState => ({
                            [id]: prevState[id] + 1,
                        })
                        )
                        dispatch(updatePaymentStep())
                        //dispatch(signInAfterRegistration(response.response))
                        this.setState({ loading: false, message: '' })
                    } else {
                        this.setState({ message: response.message })
                        this.setState({ loading: false })
                    }
                })

            } else {
                this.setState({ message: 'Something went wrong, please contact customer support.' })
            }
        } else if (activeStep === 2) {
            // console.log(this.props.userId)
            //STRIPE
            this.setState({ loading: true })
            const { stripe, elements } = this.props
            if (!stripe || !elements) {
                this.setState({ loading: false })
                return;
            }
            const card = elements.getElement(CardElement)
            const result = await stripe.createToken(card)

            if (result.error) {
                return this.setState({ notice: true, noticeMessage: result.error.message, loading: false })
            } else {
                //here we should communicate with the api in order to proceed the activation
                let userDetails = {
                    userId: this.props.userId,
                    plan: this.state.plan,
                    card: result.token,
                }
                await registerStep3(userDetails).then((response) => {
                    if (response.status === 200) {
                        this.setState({ loading: false })
                        if (response.subscription) {
                            console.log(response.subscription)
                        }
                        dispatch(updateActiveStep())
                        dispatch(signInAfterRegistration(response.response))
                        this.props.history.push('/')
                    } else {
                        this.setState({ loading: false, message: response.message })
                    }
                }).catch(err => {
                    this.setState({ notice: true, noticeMessage: 'Error please try again or contact customer support.', loading: false })
                    this.setState({ loading: false })
                })
            }
        }
    }

    render() {
        const { activeStep, loading } = this.state

        return (<>
            <Stepper alternativeLabel className={this.props.classes.stepper} connector={<StepConnector />} activeStep={activeStep}>
                {/* Change the number of loops here based on StepContent */}
                {[1, 2, 3].map(e => (
                    <Step key={e}>
                        <StepLabel StepIconComponent={StepIcons} />
                    </Step>
                ))}
            </Stepper>
            <Box className={this.props.classes.mainBox}>

                <form autoComplete="off" className={this.props.classes.form} onSubmit={e => { e.preventDefault(); this.handleNext() }}>
                    <Grid container spacing={3}>
                        {activeStep === 0 ?
                            <ContactForm setUserDetails={this.setUser} message={this.state.message} /> :
                            activeStep === 1 ?
                                <PackageForm setUserDetails={this.setUser} setUserPhone={this.setPhone} setUserCountry={this.setCountry}
                                    setName={this.setName} setStreet={this.setStreet} setCity={this.setCity} setRegion={this.setRegion}
                                    setZip={this.setZip} setGoogleMap={this.setGoogleMap}
                                    country={this.state.country} region={this.state.region} message={this.state.message}
                                    name={this.state.name} street_address={this.state.street_address} city={this.state.city}
                                    state={this.state.state} zip_code={this.state.zip_code} /> :
                                <PaymentForm plan={this.state.plan} setPlan={this.setPlan} message={this.state.message} />
                        }
                        <Grid container item justify="flex-end">
                            <Button disabled={activeStep === 0 || activeStep === 1} className={this.props.classes.button} onClick={this.handleBack}>
                                Back
                            </Button>
                            {activeStep === 3 ?
                                <Button onClick={this.handleReset} className={this.props.classes.button}>
                                    Reset
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#142841', color: 'white', fontWeight: 'bold' }}
                                    className={this.props.classes.button}
                                    type="submit"
                                    disabled={loading || !this.props.stripe}
                                >
                                    {
                                        loading
                                            ?
                                            <CircularProgress size={24} />
                                            :
                                            activeStep === 2 ? 'Pay' : 'Next'
                                    }
                                </Button>

                            }
                        </Grid>
                    </Grid>
                </form>

                <Modal size="sm" isOpen={this.state.notice} toggle={this.closeNotice}>
                    <ModalHeader toggle={this.closeNotice}>Notice</ModalHeader>
                    <ModalBody>
                        <p>{this.state.noticeMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.closeNotice}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </Box>
        </>
        )
    }
}

const mapStateToProps = state => ({
    activeStep: state.auth.activeStep,
    userId: state.auth.userId,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Steppers)));