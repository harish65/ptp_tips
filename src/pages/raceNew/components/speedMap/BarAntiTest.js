import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grow from '@material-ui/core/Grow';
import { Col, Badge } from 'reactstrap';
import './bar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead, faStar } from '@fortawesome/free-solid-svg-icons'
import Arrow from '../../../../assets/Icons/arrowDes.png'
import { connect } from 'react-redux'

import raceAction from '../../../../redux/actions/race';


const styles = ({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
        width: '100%',
    },
    thumb: {
        // height: 40,
        // width: 40,
        // backgroundColor: 'white',
        marginTop: -35,
        marginLeft: -13,
        borderWidth: 100,
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
        transition: '100ms ease-out'
    },
    active: {},
    track: {
        backgroundColor: 'white !important',
        height: 24,
        opacity: '1',
        borderColor: 'white !important',
        transition: '100ms ease-out',
        marginLeft:-8
    },
    rail: {
        color: props => props.color, //coloring(this.props.pace),
        opacity: '16% !important',
        height: 24,
        borderRadius: 4,
        marginRight:4
    },
});

const BarAntiTest = ({ key, maxI, color, barrier, no, horseName, pace, value, horse, silkData,
    classes, maxFirm, maxHeavy, maxSoft,
    maxGood, maxSynth, ubMinOdd, trackCondition, isNa, reset, isLoggedIn, resetSpeedMap }) => {
    const [newValue, setNewValue] = useState(value < 15 ? 20 : value)


    const PTP = (horse_number) => {
        return <p key={horse_number + 'PTP'} style={{ fontSize: 10, marginLeft: 8, zIndex: 100, }}><Badge color="primary"><FontAwesomeIcon icon={faHorseHead} size="1x" /></Badge></p>
    }

    const FAV = (horse_number) => {
        return <p key={horse_number + 'FAV'} style={{ fontSize: 10, zIndex: 100, marginLeft: 8 }}><Badge color="warning" style={{ marginTop: 2 }}><FontAwesomeIcon icon={faStar} size="1x" /></Badge></p>
    }

    const MM = (horse_number) => {
        return <p key={horse_number + 'MM'} style={{ fontSize: 10, marginBottom: -1 }}><Badge style={{ backgroundColor: 'rgb(9, 106, 179)', color: 'white', padding: 2.8 }}><img src={Arrow} width="14px" /></Badge></p>
    }

    const LBMM = (horse_number) => {
        return <p key={horse_number + 'LBMM'} style={{ fontSize: 10, marginBottom: -1 }}><Badge color="danger">LAD</Badge></p>
    }

    // const LMM = (horse_number) => {
    //     if (window.innerWidth > 769) {
    //         return <p key={horse_number + 'LMM'} style={{ fontSize: 10, marginRight: 2 }}><Badge color="danger" style={{ color: 'white', padding: 2.6 }}><img src={Arrow} width="14px" /></Badge></p>
    //     } else {
    //         return <p key={horse_number + 'LMM'} style={{ fontSize: 10, marginBottom: 2 }}><Badge color="danger" style={{ color: 'white', padding: 2.6 }}><img src={Arrow} width="14px" /></Badge></p>
    //     }
    // }

    const renderBadge = (element, maxFirm, maxHeavy, maxSoft, maxGood, maxSynth, ubMinOdd, trackCondition) => {

        let horseOdds = element?.ub_win
        let horseSelection

        let finalBadge = []
        if (trackCondition === 'F') {
            horseSelection = element?.points_per_firm
            if (horseSelection === maxFirm) {
                finalBadge.push(PTP(element.horse_number))
            }
        } else if (trackCondition === 'G') {
            horseSelection = element?.points_per_good
            if (horseSelection === maxGood) {
                finalBadge.push(PTP(element.horse_number))
            }
        } else if (trackCondition === 'H') {
            horseSelection = element?.points_per_heavy
            if (horseSelection === maxHeavy) {
                finalBadge.push(PTP(element.horse_number))
            }
        } else if (trackCondition === 'SO') {
            horseSelection = element?.points_per_soft
            if (horseSelection === maxSoft) {
                finalBadge.push(PTP(element.horse_number))
            }
        } else if (trackCondition === 'SY') {
            horseSelection = element?.points_per_synth
            if (horseSelection === maxSynth) {
                finalBadge.push(PTP(element.horse_number))
            }
        }

        if (horseOdds === ubMinOdd) {
            //render FAV
            finalBadge.push(FAV(element.horse_number))
        }
        if (element.is_market_mover === 1) {
            //render MarketMover
            finalBadge.push(MM(element.horse_number))
        }
        if (element.lb_mm === 1) {
            //render  LADBROKES MarketMover
            finalBadge.push(LBMM(element.horse_number))
        }
        // if (element?.horse_number === this.state.lmm) {
        //   finalBadge.push(LMM(element.horse_number))
        // }


        if (!isLoggedIn || isNa) {
            return null
        }

        return finalBadge
    }


    const Thumb = (props) => {
        return (
            <div style={{ zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', textAlign: 'right', padding: 2, paddingRight: 8 }}>
                    <p style={{ textTransform: 'uppercase', color: 'black' }}>{horseName}</p>
                    <p style={{ marginLeft: 4, fontWeight: 'bold', color: 'black' }}>#{no}</p>
                    {renderBadge(horse, maxFirm, maxHeavy, maxSoft, maxGood, maxSynth, ubMinOdd, trackCondition)}
                </div>
                <span {...props}>
                    <div style={{ width: 32, height: 32 }}>
                        {silkData}
                    </div>
                </span>

            </div>
        );
    }

    useEffect(() => {
        if (reset) {
            setNewValue(value < 15 ? 20 : value)
            resetSpeedMap()
        }
    })

    // console.log(horse, no)

    return (
        <Col lg={12} style={{ marginTop: -28, display: 'flex', flexDirection: 'row', direction: 'rtl' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <div style={{ width: 24, height: 24, backgroundColor: '#e9ecef', borderRadius: 400, marginTop: 12, marginRight: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, opacity: '100%' }}>
                    <strong>{barrier}</strong>
                </div>

                {barrier !== 1 ? <div style={{ backgroundColor: '#e9ecef', height: 24, width: 2, marginLeft: -4 }}></div> : null}
            </div>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 500 } : {})}
            >
                <Slider
                    key={`slider-${key}`}
                    value={newValue}
                    onChange={(e, value) => setNewValue(value)}
                    ThumbComponent={Thumb}
                    getAriaLabel={(index) => (index === 0)}
                    defaultValue={value}
                    step={1}
                    min={0}
                    max={100}
                    track="inverted"
                    classes={{
                        root: classes.root,
                        thumb: classes.thumb,
                        active: classes.active,
                        rail: classes.rail,
                        track: classes.track
                    }}
                />
            </Grow>
        </Col>
    );
}

const mapStateToProps = state => ({
    reset: state.raceReducer.resetSpeedMap,
    isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    resetSpeedMap: () => dispatch(raceAction.resetSpeedMap(false)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BarAntiTest));

