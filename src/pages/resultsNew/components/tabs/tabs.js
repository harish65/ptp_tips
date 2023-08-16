import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment-timezone'
import { Nav, NavLink, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import { checkRouteDate } from '../../../../config/utils';

import "react-datepicker/dist/react-datepicker.css";

export const Tabs = (props) => {

    const handleWed = () => {
        if (window.innerWidth < 422) {
            return ("Last Wed")
        } else {
            return ("Last Wednesday")
        }
    }

    const handleSat = () => {
        if (window.innerWidth < 422) {
            return ("Last Sat")
        } else {
            return ("Last Saturday")
        }
    }

    const handleChange = (date) => {
        var c = moment(date).tz('Australia/Sydney').format("DD-MM-YYYY")
        props.history.push(`/horse-racing-tips/results/${checkRouteDate(c)}`)
    }

    const goForward = () => {
        var max = moment().tz('Australia/Sydney').format("YYYY-MM-DD")
        var cmp = moment(props.transferRoute(), 'DD-MM-YYYY').format("YYYY-MM-DD")
        if (cmp < max) {
            var nextDay = moment(props.transferRoute(), 'DD-MM-YYYY').tz('Australia/Sydney').add(1, 'day').format('DD-MM-YYYY')
            props.history.push(`/horse-racing-tips/results/${nextDay}`)
        }
    }

    const goBack = () => {
        var max = "2020-06-10"
        var cmp = moment(props.transferRoute(), 'DD-MM-YYYY').format("YYYY-MM-DD")
        if (cmp > max) {
            var lastDay = moment(props.transferRoute(), 'DD-MM-YYYY').tz('Australia/Sydney').subtract(1, 'day').format('DD-MM-YYYY')
            props.history.push(`/horse-racing-tips/results/${lastDay}`)
        }
    }

    const navigateTo = (date) => {
        props.history.push(`/horse-racing-tips/results/${date}`)
    }

    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    var d = moment().tz('Australia/Sydney')
    var f = moment(d, moment.defaultFormat).toDate()
    var g = moment("2020-03-02")
    var c = moment(g, moment.defaultFormat).toDate()

    return (
        <Row style={{ margin: 0, padding: 0, marginTop: 10, marginBottom: 10 }}>
            <Col xl={9} xs={12} style={{
                display: 'flex',
                justifyContent: window.innerWidth < 1200 ? "center" : "start"
            }}>
                <Nav pills >
                    <NavLink active={props.yesterday} >
                        <div onClick={() => navigateTo(`yesterday`)} style={{ color: props.yesterday ? 'white' : '#44BD32', fontWeight: 600, cursor: 'pointer'}}>
                            Yesterday
                        </div>
                    </NavLink>

                    <NavLink active={props.today}>
                        <div onClick={() => navigateTo('today')} style={{ color: props.today ? 'white' : '#44BD32', fontWeight: 600, cursor: 'pointer'}} >
                            Today
                        </div>
                    </NavLink>

                    <NavLink active={props.lastWed} >
                        <div onClick={() => navigateTo(`${props.lwcmp()}`)} style={{ color: props.lastWed ? 'white' : '#44BD32', fontWeight: 600, cursor: 'pointer'}} >
                            {handleWed()}
                        </div>
                    </NavLink>

                    <NavLink active={props.lastSat} >
                        <div onClick={() => navigateTo(`${props.lscmp()}`)} style={{ color: props.lastSat ? 'white' : '#44BD32', fontWeight: 600, cursor: 'pointer'}} >
                            {handleSat()}
                        </div>
                    </NavLink>
                </Nav>
            </Col>

            <Col xl={3} xs={12} style={{ marginTop: "4px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <FontAwesomeIcon className="forward"
                            style={{ marginRight: "10px" }}
                            icon={faAngleLeft}
                            size="2x"
                            onClick={() => goBack()}
                        />
                    </div>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleChange(date)}
                        selected={moment(props.transferRoute(), 'DD-MM-YYYY').toDate()}
                        maxDate={f}
                        minDate={c}
                        className="input"
                    />
                    <div>
                        <FontAwesomeIcon className="forward"
                            style={{ marginLeft: "10px" }}
                            icon={faAngleRight}
                            size="2x"
                            onClick={() => goForward()}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tabs))
