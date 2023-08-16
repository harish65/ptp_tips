import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { seenPromo } from '../../config/config'
import { updatePromo } from '../../redux/actions/auth'
import './header.scss'

class Promo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            slide: 0,
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn === true) {
            if (this.props.currentUser.never_promo === 0) {
                this.setState({isOpen: true})
                this.slideInterval = setInterval(() => {
                    var current = this.state.slide
                    if (current === 0) {
                        this.setState({ slide: 1 })
                    } else if (current === 1) {
                        this.setState({ slide: 2 })
                    } else if (current === 2) {
                        this.setState({ slide: 3 })
                    } else if (current === 3) {
                        this.setState({ slide: 0 })
                    }
                }, 4000)
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.slideInterval);
    }

    swiper = () => {
        if (this.state.slide === 0) {
            return (<div>

                <img style={{ objectFit: "contain", height: "60px", marginLeft: "80px" }} src={'https://www.vhv.rs/file/max/2/29434_3d-balloons-png.png'} alt="" />
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Bonus Backs  <br />After Party Specials <br /> Price Pushes </h4>
                <h4 style={{ color: 'white', textAlign: 'center', marginTop: 8, fontSize: 24 }}>& More</h4>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 12, marginTop: "30px" }}>Conditions Apply</h4>
            </div>)
        } else if (this.state.slide === 1) {
            return (<div>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 24 }}> <p style={{ marginBottom: "10px" }}>Bonus Back </p>If your horse runs 2nd or 3rd <br />At Races 1-3 <br />At Every Metro Meeting</h4>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 12, marginTop: "30px" }}>Conditions Apply</h4>

            </div>)
        } else if (this.state.slide === 2) {
            return (<div>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 24 }}> <p style={{ marginBottom: "15px" }}> After Party Specials </p>5x Bonus Back 2nd or 3rd <br />Races of your choice<br /> On each of the 4 Carnival days </h4>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 12, marginTop: "30px" }}>Conditions Apply</h4>
            </div>)
        } else if (this.state.slide === 3) {
            return (<div>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 24 }}> <p style={{ marginBottom: "15px" }}>Price Push Specials</p> Every day of the Carnival<br /> Our traders will boost the price <br />Of at least one runner </h4>
                <h4 style={{ color: 'white', textAlign: 'center', fontSize: 12, marginTop: "30px" }}>Conditions Apply</h4>
            </div>)

        }
    }

    renderPromo() {
        if (this.props.isLoggedIn === true) {
            if (this.props.currentUser.never_promo === 0) {
                return (
                    <Modal isOpen={this.state.isOpen} style={{ marginTop: 64,marginLeft:"auto",marginRight:"auto" }}>
                        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', flexDirection: 'column', textAlign: "center" }}>
                            <div style={{marginLeft:"330px",marginRight:"20px"}}>
                                <FontAwesomeIcon onClick={() => { this.promoClose() }} style={{ color: "white", cursor: "pointer" }} icon={faTimes} size="2x" />
                            </div>
                            <div onClick={() => { this.promoClicked() }}>
                                <a target="_blanc" href="https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418">
                                    <img src="https://a1s.unicdn.net/polopoly_fs/1.1193254.1560787570!/menu/standard/file/Unibet%20new%20logo%20large1.svg" alt="" width="96px" />
                                </a>
                                <h4 style={{ textAlign: 'center', color: 'white', marginTop: 8 }}><strong style={{ fontSize: 18 }}>Melbourne Cup</strong><br /> <span style={{ fontSize: 13 }}>Carnival Specials</span></h4>
                            </div>

                        </ModalHeader>
                        <div className="boxPromo" style={{ width: "100%", height: 300, marginTop: -4, marginBlock: -32, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            {this.swiper()}
                        </div>
                        <ModalBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        </ModalBody>
                        <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -45, backgroundColor: 'black', borderWidth: 0, flexDirection: 'column' }}>
                            <a target="_blanc" href="https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418">
                                <Button color="primary" onClick={() => { this.promoClicked() }} target="_blanc">
                                    <strong>Register Now</strong>
                                </Button>
                            </a>
                            <p onClick={() => { this.promoNeverShow() }} style={{ color: 'white', cursor: 'pointer' }}>Don't show again.</p>
                        </ModalFooter>
                    </Modal>
                )
            }
        }
    }
    promoClose = async () => {
        const { dispatch } = this.props;
        this.setState({ isOpen: false })
        await seenPromo({ neverPromo: 0, clientId: this.props.currentUser.id, affiliate: 'no' }).then((res) => {
            if (res.status === 200) {
                dispatch(updatePromo(res.response))
                clearInterval(this.slideInterval);
            }
        })
    }
    promoNeverShow = async () => {
        const { dispatch } = this.props;
        this.setState({ isOpen: false })
        await seenPromo({ neverPromo: 1, clientId: this.props.currentUser.id, affiliate: 'no' }).then((res) => {
            if (res.status === 200) {
                dispatch(updatePromo(res.response))
                clearInterval(this.slideInterval);
            }
        })
    }
    promoClicked = async () => {
        const { dispatch } = this.props;
        this.setState({ isOpen: false })
        await seenPromo({ neverPromo: 0, clientId: this.props.currentUser.id, affiliate: 'unibet' }).then((res) => {
            if (res.status === 200) {
                dispatch(updatePromo(res.response))
                clearInterval(this.slideInterval);
            }
        })
    }
    render() {
        return (
            <div>
                {this.renderPromo()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    isLoggedIn: state.auth.isLoggedIn,
    clientSession: state.auth.clientSession,
    errorStatus: state.auth.errorStatus
})

export default withRouter(connect(mapStateToProps)(Promo));