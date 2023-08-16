import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, withRouter, Link } from 'react-router-dom'
import moment from 'moment-timezone'

import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Paper from '@material-ui/core/Paper';
import { faMedal, faTrophy, faAward, faSortDown, faThumbsDown, faHorseHead } from '@fortawesome/free-solid-svg-icons'
import LocateIcon from 'react-ionicons/lib/MdLocate'
import Infos from '../../../raceNew/components/head/common/info'

import resultAction from '../../../../redux/actions/results'

export const HeadMobile = (props) => {
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
            <Row style={{ padding: 0, margin: 0 }}>
                <Col xs={12} style={{ padding: 0, margin: 0, marginBottom: 10 }}>
                    <h1 style={{ textAlign: 'left', fontSize: 22, marginTop: 4, cursor: 'pointer' }}>
                        <strong>{moment(props.transferRoute(), 'DD-MM-YYYY').format("dddd LL")} Results</strong>
                    </h1>
                    <div style={{ backgroundColor: 'grey', height: 2, marginTop: -5, opacity: '50%' }}></div>
                    <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                        <DropdownToggle>
                            <h5 style={{ fontSize: 32, marginTop: 4, cursor: 'pointer', textAlign: 'left' }}>
                                <div style={{ fontSize: 18, textTransform: 'uppercase' }}>
                                    <strong>
                                        {props.results[props.selectedVenue]?.track_name}
                                    </strong>
                                    <FontAwesomeIcon icon={faSortDown} size="1x" style={{ marginLeft: 4, color: 'grey', width: 16, height: 16 }} />
                                </div>
                            </h5>
                        </DropdownToggle>
                        <DropdownMenu style={{ width: 250, zIndex: 1 }}>
                            <div style={{ backgroundColor: 'white', minHeight: '20%', padding: 8 }}>
                                <Row>
                                    {props.results?.map((element, i) => {
                                        return (
                                            <Col key={'ta-' + i}
                                                onClick={() => selectVenue(element, i)}
                                                lg={3} style={{ marginTop: 16 }}>
                                                <Paper elevation={0}>
                                                    <div style={{ backgroundColor: '#eef0f4', padding: 8, borderRadius: 4, cursor: 'pointer' }}>
                                                        <strong>{element?.track_name}</strong>
                                                    </div>
                                                </Paper>
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
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Link color="default"
                            style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, color: 'grey', background: "#E0E0E0", borderRadius: 5, maxWidth: 150, minHeight: 30, alignItems: 'center', justifyContent: 'center' }}
                            to={`/profile/venue/${props.results[props.selectedVenue]?.track_condition}`}>
                            <LocateIcon className="action-icon" fontSize='18' color="grey" />
                            <strong className="action-label" style={{ marginLeft: 4 }}>View Venue</strong>
                        </Link>
                        <Infos />
                    </div>
                </Col>
                <Col xs={12} style={{ padding: 0, margin: 0 }}>
                    <Row style={{
                        margin: 0, padding: 5,
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
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Selections: {props.day_of_week_history?.runs}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Win: {props.day_of_week_history?.won} ({(Number(props.day_of_week_history?.won / props.day_of_week_history?.runs) * 100)?.toFixed(2)}%)
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                AVG: ${props.day_of_week_history?.winOdd?.toFixed(2)}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                PLC: {props.day_of_week_history?.place} ({(Number(props.day_of_week_history?.place / props.day_of_week_history?.runs) * 100)?.toFixed(2)}%)
                            </p>
                        </Col>
                    </Row>
                    <Row style={{
                        margin: 0, padding: 5,
                        // cursor: 'pointer',
                        backgroundColor: "#eef0f4",
                        width: '100%',
                        minHeight: 70,
                        borderRadius: 10,
                        paddingTop: 5,
                        marginBottom: 10,
                    }}>
                        <Col xs={12}>
                            <h2>Daily Performance All Venues</h2>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Selections: {props.dailyPerformance?.runs}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                Win: {props.dailyPerformance?.won} ({props.dailyPerformance?.runs ? ((props.dailyPerformance?.won / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                2ND: {props.dailyPerformance?.third} ({props.dailyPerformance?.runs ? ((props.dailyPerformance?.third / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>
                                3RD: {props.dailyPerformance?.third} ({props.dailyPerformance?.runs ? ((props.dailyPerformance?.third / props.dailyPerformance?.runs) * 100).toFixed(1) + "%" : "0.00%"})
                            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeadMobile))
