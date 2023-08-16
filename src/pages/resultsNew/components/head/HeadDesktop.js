import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, withRouter, Link } from 'react-router-dom'
import moment from 'moment-timezone'

import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faTrophy, faAward, faSortDown, faThumbsDown, faHorseHead } from '@fortawesome/free-solid-svg-icons'
import LocateIcon from 'react-ionicons/lib/MdLocate'
import Infos from '../../../raceNew/components/head/common/info'

import resultAction from '../../../../redux/actions/results'

export const HeadDesktop = (props) => {
    // const params = useParams()

    const [dropdown, setDropdown] = useState(false)


    const selectVenue = (element, i) => {
        props.setSelectedVenue(i)
        setDropdown(false)
    }

    const getLost = () => {
        var res = 0
        var selec = 0
        var lost = 0
        res = Number(props.dailyPerformance?.won) + Number(props.dailyPerformance?.second) + Number(props.dailyPerformance?.third)
        selec = Number(props.dailyPerformance?.runs)
        lost = selec - res
        return (lost)
    }

    return (
        <div style={{ backgroundColor: 'white', padding: 13, borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingBottom: 0 }}>
            <Row>
                <Col lg={4} md={4} xs={12} style={{ marginBottom: 10 }}>
                    <h1 style={{ textAlign: 'left', fontSize: 22, marginTop: 4, cursor: 'pointer' }}>
                        <strong>{moment(props.transferRoute(), 'DD-MM-YYYY').format("dddd LL")} Results</strong>
                    </h1>
                    <div style={{ backgroundColor: 'grey', height: 2, marginTop: -10, opacity: '50%' }}></div>
                    <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                        <DropdownToggle>
                            <div>
                                <h5 style={{ textAlign: 'left', fontSize: 24, marginTop: 4, cursor: 'pointer' }}>
                                    <strong>{props.results[props.selectedVenue]?.track_name}</strong>
                                    <span style={{ fontSize: 16, color: 'grey' }}><FontAwesomeIcon icon={faSortDown} size="1x" style={{ marginLeft: 4 }} /> </span>
                                </h5>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                            <div style={{ backgroundColor: 'white', width: 800, minHeight: '20%', padding: 8 }}>
                                <Row>
                                    {props.results?.map((element, i) => {
                                        return (
                                            <Col key={'ve-' + i}
                                                onClick={() => selectVenue(element, i)}
                                                xs={3}
                                                style={{ marginTop: 16 }}>
                                                {/* <Paper elevation={0}> */}
                                                <div style={{ backgroundColor: '#eef0f4', padding: 8, borderRadius: 4, cursor: 'pointer' }}>
                                                    <strong>{element?.track_name}</strong>
                                                </div>
                                                {/* </Paper> */}
                                            </Col>
                                        )
                                    })
                                    }
                                </Row>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 15 }}>
                        <img style={{ opacity: '64%' }} src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png" width="17px" height="17px" />
                        <p style={{ fontSize: 12, marginLeft: 3 }}>{props.results[props.selectedVenue]?.venue_location}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                        <Link color="default"
                            style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, color: 'grey', background: "#E0E0E0", borderRadius: 5, maxWidth: 150, minHeight: 30, alignItems: 'center', justifyContent: 'center' }}
                            to={`/profile/venue/${props.results[props.selectedVenue]?.track_condition}`}>
                            <LocateIcon className="action-icon" fontSize='18' color="grey" />
                            <strong className="action-label" style={{ marginLeft: 4 }}>View Venue</strong>
                        </Link>
                        <Infos />
                    </div>
                </Col>
                <Col lg={8} md={8} xs={12}>
                    <Row style={{
                        // cursor: 'pointer',
                        backgroundColor: "#eef0f4",
                        width: '100%',
                        minHeight: 70,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}>
                        <Col xs={12} style={{ display: 'flex' }}>
                            <h2>All {moment(props.transferRoute(), 'DD-MM-YYYY').format("dddd") + " Performance"}</h2>
                        </Col>
                        <Col lg={3} md={3} xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Selections: {props.day_of_week_history?.runs}
                            </p>
                        </Col>
                        <Col lg={3} md={3} xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Win: {props.day_of_week_history?.won} ({(Number(props.day_of_week_history?.won / props.day_of_week_history?.runs) * 100)?.toFixed(2)}%)
                            </p>
                        </Col>
                        <Col lg={3} md={3} xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                AVG: ${props.day_of_week_history?.winOdd?.toFixed(2)}
                            </p>
                        </Col>
                        <Col lg={3} md={3} xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                PLC: {props.day_of_week_history?.place} ({(Number(props.day_of_week_history?.place / props.day_of_week_history?.runs) * 100)?.toFixed(2)}%)
                            </p>
                        </Col>
                    </Row>
                    <Row style={{
                        // cursor: 'pointer',
                        backgroundColor: "#eef0f4",
                        width: '100%',
                        minHeight: 70,
                        borderRadius: 10,
                        paddingTop: 5,
                        marginBottom: 10,
                    }}>
                        <Col xs={12} style={{ display: 'flex'}}>
                            <h2>Daily Performance All Venues</h2>
                        </Col>
                        <Col lg={4} md={4} xs={6}>
                            <Row style={{ margin: 0, padding: 0 }}>
                                <Col xs={4}>
                                    <FontAwesomeIcon style={{ color: "rgb(55, 146, 57)", margin: 0, paddingTop: 5, height: '82%' }} icon={faHorseHead} size="3x" />
                                </Col>
                                <Col xs={8} style={{ marginLeft: 0, paddingLeft: 0, textAlign: 'left' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, margin: 0, padding: 0 }}>{props.dailyPerformance?.runs}</div>
                                    <strong>Selections</strong>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg={2} md={2} xs={6}>
                            <Row style={{ margin: 0, padding: 0 }}>
                                <Col xs={6}>
                                    <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" /><br />
                                    <strong style={{ color: '#ffa800' }}>1st</strong>
                                </Col>
                                <Col xs={6} style={{ marginLeft: 0, paddingLeft: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>{props.dailyPerformance?.won}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>({props.dailyPerformance?.runs ? ((props.dailyPerformance?.won / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2} md={2} xs={6}>
                            <Row style={{ margin: 0, padding: 0 }}>
                                <Col xs={6} style={{ textAlign: 'center' }}>
                                    <FontAwesomeIcon icon={faMedal} size="1x" color="#096ab3" style={{ marginLeft: 5 }} /><br />
                                    <strong style={{ color: '#096ab3' }}>2nd</strong>
                                </Col>
                                <Col xs={6} style={{ marginLeft: 0, paddingLeft: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>{props.dailyPerformance?.second}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>({props.dailyPerformance?.runs ? ((props.dailyPerformance?.second / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2} md={2} xs={6}>
                            <Row style={{ margin: 0, padding: 0 }}>
                                <Col xs={6} style={{ textAlign: 'center' }}>
                                    <FontAwesomeIcon icon={faAward} size="1x" color="#8b34bf" /><br />
                                    <strong style={{ color: '#8b34bf' }}>3rd</strong>
                                </Col>
                                <Col xs={6} style={{ marginLeft: 0, paddingLeft: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>{props.dailyPerformance?.third}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>({props.dailyPerformance?.runs ? ((props.dailyPerformance?.third / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2} md={2} xs={6}>
                            <Row style={{ margin: 0, padding: 0 }}>
                                <Col xs={6} style={{ textAlign: 'center' }}>
                                    <FontAwesomeIcon icon={faThumbsDown} size="1x" color="red" /> <br />
                                    <strong style={{ color: 'red' }}>Lost</strong>
                                </Col>
                                <Col xs={6} style={{ marginLeft: 0, paddingLeft: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center' }}>{getLost()}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>({props.dailyPerformance?.runs ? ((getLost() / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    )
}

const mapStateToProps = (state) => ({
    day_of_week_history: state.resultsReducer.day_of_week_history,
    dailyPerformance: state.resultsReducer.daily_results,
    results: state.resultsReducer.results,
    selectedVenue: state.resultsReducer.selectedVenue
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedVenue: (data) => dispatch(resultAction.setSelectedVenue(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeadDesktop))
