import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Badge } from 'reactstrap'

import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LoadingNew from '../../../components/loading/LoadingNew'
import { changeTheme } from '../../../redux/actions/auth';
import Timer from "../../../components/Timer"
import moment from 'moment-timezone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons'


class NowHead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    trackColor = () => {
        switch (this.props.trackInfo[0]?.track_condition) {
            case 'F':
                return '#000000'
            case 'G':
                return '#44BD32'
            case 'SO':
                return '#FFA800'
            case 'SY':
                return '#44BD32'
            case 'H':
                return '#F64F60'
            case 'N/A':
                return 'grey'
            case 'ABND':
                return 'grey'
            default:
                return 'grey'
        }
    }

    conditions = () => {
        switch (this.props.trackInfo[0]?.track_condition) {
            case 'F':
                return 'FIRM'
            case 'G':
                return 'GOOD'
            case 'SO':
                return 'SOFT'
            case 'SY':
                return 'SYNTHETIC'
            case 'H':
                return 'HEAVY'
            case 'N/A':
                return 'N/A'
            case 'ABND':
                return 'ABND'
            default:
                return 'N/A'
        }
    }


    switchDark = () => {
        const { dispatch } = this.props
        dispatch(changeTheme(!this.props.dark))
    }

    renderTimer = () => {
        var date = moment().tz('Australia/Sydney').format("YYYYMMDD");
        var raceDate = moment(this.props.trackInfo[0]?.meetdate).format("YYYYMMDD")
        if (this.props.trackInfo[0]?.race_status === 'Closed') {
            return <span style={{color: this.props.dark ? 'white' : '#142841'}}><strong>Closed</strong> at {this.props.trackInfo[0]?.race_closed_time?.split(':')[0]}:{this.props.trackInfo[0]?.race_closed_time?.split(':')[1]}</span>
        } else {
            if (date !== raceDate || this.props.trackInfo[0]?.track_condition === 'ABND') {
                return null
            } else {
                var RaceHour = Number(this.props.trackInfo[0]?.race_time?.split(":")[0]) * 60 * 60 * 1000
                var RaceMin = Number(this.props.trackInfo[0]?.race_time?.split(":")[1]) * 60 * 1000
                var RTime = (RaceHour + RaceMin)
                return <Timer raceTimer={RTime} raceTime={this.props.trackInfo[0]?.race_time} status={this.props.trackInfo[0]?.meetdate} />
            }
        }
    }

    render() {
        const IOSSwitch = withStyles((theme) => ({
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: theme.spacing(1),
            },
            switchBase: {
                padding: 1,
                '&$checked': {
                    transform: 'translateX(16px)',
                    color: theme.palette.common.white,
                    '& + $track': {
                        backgroundColor: '#52d869',
                        opacity: 1,
                        border: 'none',
                    },
                },
                '&$focusVisible $thumb': {
                    color: '#52d869',
                    border: '6px solid #fff',
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 26 / 2,
                border: `1px solid ${theme.palette.grey[400]}`,
                backgroundColor: theme.palette.grey[50],
                opacity: 1,
                transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
        }))(({ classes, ...props }) => {
            return (
                <Switch
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    {...props}
                />
            );
        });

        // var RaceHour = Number(this.props.trackInfo[0]?.race_time.split(":")[0]) * 60 * 60 * 1000
        // var RaceMin = Number(this.props.trackInfo[0]?.race_time.split(":")[1]) * 60 * 1000
        // var RTime = (RaceHour + RaceMin)
        // var formatted = moment(this.props.trackInfo[0]?.race_time, "HH:mm").format("HH:mm");
        // var racetime = this.props.trackInfo[0]?.race_time
        // var rStatus = this.props.trackInfo[0]?.race_status

       

        return (
            <div style={{ backgroundColor: this.props.dark ? "black" : "#eef0f4", padding: 16, marginTop: this.props.fullScreen ? -10: 20}}>
                {this.props.trackInfo[0] ?
                    
                        <Row className="withHeader">
                            <Col lg={2} md={12} xs={12} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -24 }}>
                                <div style={{ display: "flex", marginLeft: 15 }}>
                                    <img src={'http://ptptips.com.au/favicon.png'} alt="" width={40} height={40} />
                                    <h2 style={{ color: this.props.dark ? 'white' : '#142841', marginTop: 6, marginLeft: 8, fontFamily: 'poppins', fontWeight: 'bold' }}>PTP TIPS<span style={{ fontSize: 12 }}>.com.au</span></h2>
                                </div>
                            </Col>

                            <Col lg={8} md={12} xs={12}>
                                <Row>
                                    <Col xs={3} style={{display: 'flex', alignItems: 'center'}}>
                                        <h1 style={{color: this.props.dark ? 'white' : '#142841', marginLeft: 15, marginTop: 10, marginRight: 10}}><span style={{color: 'green'}}>O</span>N N<span><FontAwesomeIcon icon={faCircle} size="1x" color={'green'}/></span>W</h1>
                                    </Col>

                                    <Col xs={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <h1 style={{ textAlign: 'center', fontSize: 44, marginTop: 0, cursor: 'pointer ' }}>
                                                {<strong style={{ textTransfom: 'uppercase', color: this.props.dark ? "white" : "black" }}>{this.props.trackInfo[0]?.track_name} R{this.props.trackInfo[0]?.race_num}</strong>}
                                            </h1>
                                            <h3><Badge style={{ textAlign: 'left', backgroundColor: this.trackColor(), marginLeft: 16 }}><strong style={{ color: 'white' }}>{this.conditions()}</strong></Badge></h3>
                                            <div style={{ marginLeft: 8, color: this.props.dark ? 'white' : 'black', marginTop: 0 }}>{this.props.trackInfo[0]?.track_weather}</div>
                                        </div>
                                    </Col>
                                
                                    <Col xs={3} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        {this.props.trackInfo[0]?.race_status !== 'Closed' ?
                                        <>
                                        <FontAwesomeIcon icon={faClock} size="1x" color={this.props.dark ? 'white' : '#142841'}/>
                                        <span style={{color: this.props.dark ? 'white' : '#142841' }}>{moment(this.props.trackInfo[0]?.race_time, "HH:mm").format("HH:mm")}</span>
                                        </> : null}
                                            
                                        {this.renderTimer()}

                                        <FormControlLabel style={{marginTop: 10}}
                                            control={<IOSSwitch checked={this.props.dark} onChange={this.switchDark} name="checkedB" />}
                                             label={<span style={{ color: this.props.dark ? 'white' : 'black' }}>Dark Mode</span>}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            
                        </Row>
                    :
                    <LoadingNew />
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    trackInfo: state.onNowReducer.trackInfo,
    dark: state.auth.dark,
    fullScreen: state.auth.fullScreen,
})

export default withRouter(connect(mapStateToProps)(NowHead));