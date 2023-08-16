import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import actions from '../../../../redux/actions/blackbook'
import NumberFormat from 'react-number-format';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import Infos from '../../../raceNew/components/head/common/info'




class profileHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bkNoteOpen: false,
            bkNotes: ''
        }
    }

    addToBlackBook = () => {
        this.setState({ bkNoteOpen: true })
    }

    closeBlackBook = () => {
        this.setState({ bkNoteOpen: false })
    }

    addToBlackBookAction = () => {
        this.props.dispatch(actions.addBlackBook({ horse_id: this.props.match.params.horseId, client_id: this.props.currentUser.id, notes: this.state.bkNotes }))
        this.setState({ bkNoteOpen: false })
    }

    render() {
        // console.log(this.props.horseProfile)
        return (
            <>
                <Col lg={12} style={{ backgroundColor: 'white', padding: 0, marginTop: 24, borderTopLeftRadius: 4, borderTopRightRadius: 4, paddingTop: 8, paddingBottom: 8 }}>
                    <Col>
                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                            <Col>
                                <h1 style={{ fontWeight: 'bold', fontSize: 27, textTransform: 'uppercase' }}>{this.props.horseProfile?.horse_name}</h1>
                            </Col>

                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <div>
                                    {this.props.currentUser && <Button size="sm" style={{ backgroundColor: 'transparent', color: '#1f2732',
                                                                fontWeight: 'bold', fontFamily: 'Poppins',
                                                                borderColor: '#1f2732', borderWidth: 2, marginBottom: 5 }}
                                        color="default"
                                        onClick={() => this.addToBlackBook()}>
                                        <FontAwesomeIcon style={{ marginRight: 4 }}
                                            icon={faPlusCircle} size="1x" />
                                            Black Book
                                    </Button>}
                                    <Infos />
                                   
                                </div>
                            </Col>
                        </Row>
                    </Col>


                    <Col style={{ marginTop: 16 }}>
                        <Row>
                            <Col>
                                <span style={{ fontSize: 16 }}> Trainer: <strong>{this.props.horseProfile?.trainer_name}</strong>
                                    <span style={{ marginLeft: 4, marginRight: 4 }}>|</span>
                                Home Track <Link to={'/profile/venue/' + this.props.horseProfile?.trnplace_trackcode}>
                                        <strong>{this.props.horseProfile?.TRNPLACE}</strong></Link>  <span style={{ marginLeft: 4, marginRight: 4 }}>|
                                </span> Age: <strong>{this.props.horseProfile?.AGE}</strong>  <span style={{ marginLeft: 4, marginRight: 4 }}>|</span>
                                 Sex: <strong>{this.props.horseProfile?.SEX}</strong> <span style={{ marginLeft: 4, marginRight: 4 }}>|</span>
                                 Prize Money: <strong><NumberFormat value={this.props.horseProfile?.CAREERPRZ} displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong></span>
                            </Col>
                        </Row>
                    </Col>
                </Col>
                <Modal isOpen={this.state.bkNoteOpen} style={{ marginTop: 80 }}>
                    <ModalBody style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img alt="Logo" src="../../favicon.png" width="40px" className="logo-default max-h-40px" />
                        <p style={{ fontSize: 18, width: '88%', marginTop: 8 }}>
                            Please add below your personal comments if needed:
                        </p>
                        <Input
                            className="form-control h-auto form-control-solid py-4 px-8"
                            style={{ textAlign: 'left' }}
                            onChange={(e) => this.setState({ bkNotes: e.target.value })}
                            placeholder="Notes"
                            defaultValue={this.state.bkNotes} />
                    </ModalBody>
                    <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={() => this.closeBlackBook()} color="primary"><strong>Cancel</strong></Button>{''}
                        <Button onClick={() => this.addToBlackBookAction()} color="primary"><strong>Okay</strong></Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    horseProfile: state.profilesReducer.horseProfile,
    loading: state.profilesReducer.horseProfileLoading,
    currentUser: state.auth.currentUser,
})

export default withRouter(connect(mapStateToProps)(profileHead));
