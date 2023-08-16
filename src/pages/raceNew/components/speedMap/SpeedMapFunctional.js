import React, { useState, useEffect } from 'react'
import { Col, Row, Badge, Spinner, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faHorseHead, faTimes } from '@fortawesome/free-solid-svg-icons'
import './speedMap.scss'

import { loadSingleRace } from "../../../../config/config"
import raceAction from '../../../../redux/actions/race';


import Utils from '../util';

import {
    calcLead,
    calcLeadHandy,
    calcHandy,
    calcHandyMid,
    calcMid,
    calcRear,
    roundPace,
    // assignPace,
    paceRanking,
} from './PaceFormulaCalc';

import Bar from './Bar';
import BarAnti from './BarAnti';

const SpeedMap = (props) => {

    const [selectedDate, setselectedDate] = useState(new Date())
    const [raceInfo, setraceInfo] = useState([])
    const [labelPosition, setlabelPosition] = useState(null)
    const [innerWidth, setinnerWidth] = useState(window.innerWidth)
    const [isClockWise, setisClockWise] = useState(0)

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        loadRace()
        // props.dispatch(raceAction.resetSpeedMap(false))
        if (props.trackInfo[0]?.isClockwise === 0) {
            setisClockWise(0)
            setlabelPosition('flex-start')
        } else {
            setisClockWise(1)
            setlabelPosition('flex-end')
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])


    const handleResize = () => {
        setinnerWidth(window.innerWidth)
    }

    /********************************** Optimize with charbel ****************************************/
    const loadRace = () => {
        props.setLoadingSpeedMap()
        let data = {
            meetdate: props.trackInfo[0]?.meetdate,
            trackcode: props.trackInfo[0]?.trackcode,
            racenum: props.trackInfo[0]?.race_num,
        }
        loadSingleRace(data).then((res) => {
            props.getFormings(res?.data[0])
            props.loadRaceForm(res?.data[0])
            props.setFormingRace(res?.data[0])
        });
    }


    const renderRaceBar = () => {
        const distance = props.trackInfo[0].track_distance
        const distanceValue = distance?.split(' ')[0]

        if (window.innerWidth < 769) {
            if (props.trackInfo[0]?.isClockwise === 0) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Badge style={{ backgroundColor: 'transparent', color: 'white', zIndex: 0, padding: 4 }}>
                                <FontAwesomeIcon icon={faHorseHead} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%'}}/>
                                <span style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>
                                    Start
                                </span>
                            </Badge>
                        </Col>

                        <Col xs={10} md={2} lg={10}
                            style={{
                                height: 32,
                                backgroundColor: 'transparent',
                                paddingLeft: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginTop: 5
                            }}>
                            <div style={{ backgroundColor: 'black', height: 1, opacity: '32%', marginLeft: 6, marginRight: 4 }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Badge color="primary" style={{ backgroundColor: 'white', color: 'grey', width: 80, marginTop: -10, zIndex: 1, padding: 4, fontWeight: '-moz-initial.+' }}>{distanceValue}</Badge>
                            </div>
                        </Col>

                        <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Badge style={{ backgroundColor: 'transparent', zIndex: 0, padding: 4 }}>
                                <span style={{ fontSize: 14, marginRight: 4, color: 'grey', opacity: '80%' }}>
                                    End
                                </span>
                                <FontAwesomeIcon icon={faFlagCheckered} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%' }} />
                            </Badge>
                        </Col>
                    </div>
                )
            } else {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Badge style={{ backgroundColor: 'transparent', color: 'white', zIndex: 0, padding: 4 }}>
                                <FontAwesomeIcon icon={faFlagCheckered} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%' }} />
                                <span style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>
                                    End
                            </span>
                            </Badge>
                        </Col>

                        <Col xs={10} md={2} lg={10}
                            style={{
                                height: 32,
                                backgroundColor: 'transparent',
                                paddingLeft: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginTop: 5
                            }}>
                            <div style={{ backgroundColor: 'black', height: 1, opacity: '32%', marginLeft: 6, marginRight: 4 }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Badge color="primary" style={{ backgroundColor: 'white', color: 'grey', width: 80, marginTop: -10, zIndex: 1, padding: 4, fontWeight: '-moz-initial.+' }}>{distanceValue}</Badge>
                            </div>
                        </Col>

                        <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Badge style={{ backgroundColor: 'transparent', color: 'white', zIndex: 0, padding: 4 }}>
                                <span style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>
                                    Start
                                </span>
                                <FontAwesomeIcon icon={faHorseHead} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%'}}/>
                            </Badge>
                        </Col>
                    </div>
                )
            }
        }

        if (props.trackInfo[0]?.isClockwise === 0) {
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Badge style={{ backgroundColor: 'transparent', color: 'white', zIndex: 0, padding: 4 }}>
                            <FontAwesomeIcon icon={faHorseHead} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%'}}/>
                            <span style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>
                                Start
                            </span>
                        </Badge>
                    </Col>

                    <Col xs={10} md={2} lg={10}
                        style={{
                            height: 32,
                            backgroundColor: 'transparent',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 0,
                            marginTop: 5
                        }}>
                        <div style={{ backgroundColor: 'black', height: 1, opacity: '32%', marginLeft: 6, marginRight: 4 }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Badge color="primary" style={{ backgroundColor: 'white', color: 'grey', width: 80, marginTop: -10, zIndex: 1, padding: 4, fontWeight: '-moz-initial.+' }}>{distanceValue}</Badge>
                        </div>
                    </Col>

                    <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Badge style={{ backgroundColor: 'transparent', zIndex: 0, padding: 4 }}>
                            <span style={{ fontSize: 14, marginRight: 4, color: 'grey', opacity: '80%' }}>End</span>
                            <FontAwesomeIcon icon={faFlagCheckered} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%' }} />
                        </Badge>
                    </Col>
                </div>
            )
        } else {
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Badge style={{ backgroundColor: 'transparent', zIndex: 0, padding: 4 }}>
                            <FontAwesomeIcon icon={faFlagCheckered} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%' }} />
                            <span style={{ fontSize: 14, marginLeft: 4, color: 'grey', opacity: '80%' }}>End</span>
                        </Badge>
                    </Col>

                    <Col xs={10} md={2} lg={10}
                        style={{
                            height: 32,
                            backgroundColor: 'transparent',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 0,
                            marginTop: 5
                        }}>
                        <div style={{ backgroundColor: 'black', height: 1, opacity: '32%', marginLeft: 6, marginRight: 4 }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Badge color="primary" style={{ backgroundColor: 'white', color: 'grey', width: 80, marginTop: -10, zIndex: 1, padding: 4, fontWeight: '-moz-initial.+' }}>{distanceValue}</Badge>
                        </div>
                    </Col>

                    <Col xs={1} md={1} lg={1} style={{ height: 32, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Badge style={{ backgroundColor: 'transparent', color: 'white', zIndex: 1, padding: 4, display: 'flex' }}>
                        <FontAwesomeIcon icon={faHorseHead} color="grey" size="1x" style={{ fontSize: 13, opacity: '32%'}}/>
                            <span style={{ fontSize: 14, marginRight: 4, color: 'grey' }}>Start</span>
                        </Badge>
                    </Col>
                </div>
            )
        }
    }



    const renderReset = () => {
        if (props.trackInfo[0]?.isClockwise === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: -14 }}>
                    <Button onClick={() => resetData()} color="primary" size="sm" style={{ marginTop: 18, backgroundColor: '#e9ecef', borderColor: 'transparent', color: 'black' }}><span style={{ color: 'black', opacity: '82%' }}>Reset</span></Button>
                </div>
            )
        } else {
            return (
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -14 }}>
                    <Button onClick={() => resetData()} color="primary" size="sm" style={{ marginTop: 18, backgroundColor: '#e9ecef', borderColor: 'transparent', color: 'black' }}><span style={{ color: 'black', opacity: '82%' }}>Reset</span></Button>
                </div>
            )
        }
    }


    const renderLegend = () => {
        if (props.trackInfo[0]?.isClockwise === 0 && window.innerWidth < 769) {
            return (
                <>
                    <Row style={{ display: 'flex', flexDirection: 'row', marginTop: 8, padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -24 }}>
                            <   div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('starter'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Starter</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Rear'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Backmarker</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Mid'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Mid</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Handy'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>OnPace</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Lead'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Lead</div>
                            </div>
                        </div>

                    </Row >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {renderReset()}
                    </div>
                </>
            )
        }

        if (props.trackInfo[0]?.isClockwise === 1 && window.innerWidth < 769) {
            return (
                <>
                    <Row style={{ display: 'flex', flexDirection: 'row', marginTop: 8, padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -24 }}>
                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Lead'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Lead</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Handy'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>OnPace</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Mid'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Mid</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Rear'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Backmarker</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('starter'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Starter</div>
                            </div>
                        </div>

                    </Row>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {renderReset()}
                    </div>
                </>
            )
        }

        if (props.trackInfo[0]?.isClockwise === 0 && window.innerWidth > 769) {
            return (
                <Col xs={12} lg={12} style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                    <Col xs={12} lg={6}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -24 }}>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('starter'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>First starter</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Rear'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Backmarker</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Mid'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Mid</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Handy'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>OnPace</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Lead'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Lead</div>
                            </div>
                        </div>
                        <div>
                            {window.innerWidth < 769 ? renderReset() : null}
                        </div>
                    </Col>

                    <Col xs={12} lg={6}>
                        {window.innerWidth > 769 ? renderReset() : null}
                    </Col>
                </Col >
            )
        } else {
            return (
                <Col xs={12} lg={12} style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>

                    <Col xs={12} lg={6}>
                        {window.innerWidth > 769 ? renderReset() : null}
                    </Col>

                    <Col xs={12} lg={6}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 0 }}>
                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Lead'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Lead</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Handy'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>OnPace</div>
                            </div>


                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Mid'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Mid</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('Rear'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>Backmarker</div>
                            </div>

                            <div style={{ marginLeft: 16, marginTop: 24, display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: 11, height: 11, backgroundColor: coloring('starter'), borderRadius: 32, opacity: '50%', marginTop: 4 }}></div>
                                <div style={{ marginLeft: 4 }}>First starter</div>
                            </div>


                        </div>
                        <div>
                            {window.innerWidth < 769 ? renderReset() : null}
                        </div>
                    </Col>
                </Col >
            )
        }
    }

    const closeSpeedMap = () => {
        props.changeTab(0);
    }

    const resetData = () => {
        // console.log(props.resetSpeedMaps)
        if (props.resetSpeedMap === true) {
            props.resetSpeedMap(false)
        } else {
            props.resetSpeedMap(true)
        }
    }

    const coloring = (val) => {
        if (val === 'Mid') {
            //mid
            return '#0000AB'
        } else if (val === 'Handy') {
            //on pace
            return '#1873D3'
        } else if (val === 'Lead/Handy') {
            //on pace
            return '#1873D3'
        } else if (val === "Lead") {
            //Lead
            return '#2ecc71'
        } else if (val === "Handy/Mid") {
            //Mid
            return '#0000AB'
        } else if (val === 'Rear') {
            return 'red'
        } else {
            return 'grey'
        }
    }

    const getI = (horse) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ width: 32, height: 32, backgroundImage: "url(" + horse?.horse_silksUrl + ")", backgroundPositionX: Number(Utils.silkSize(horse?.horse_number - 1)), marginTop: 4 }}></div>
            </div>
        )
    }

    const renderChecker = () => {
        if (props.speedMapLoading) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner style={{ width: '3rem', height: '3rem', color: '#e9ecef', marginTop: 16 }} type="grow" />
                </div>
            )
        } else {
            let formingInfoARR = [];
            let barRows = [];

            const hrsForm = props.hrsForm;
            const formingData = props.formingData;
            const { horses } = props;


            if (hrsForm && formingData) {
                hrsForm.map((item) => {
                    let horse = item;
                    let key = 0;

                    let formingInfo = {
                        no: horse.TABNO,
                        name: horse.HORSENAME,
                        pace: horse.PACE,
                        rpace: '',
                        barrier: horse.BARRIER,
                        rear: 0,
                        mid: 0,
                        handyMid: 0,
                        handy: 0,
                        leadHandy: 0,
                        lead: 0,
                        increment: 0,
                        position: 0,
                    }
                    if (item.SCRATCHED !== "1") {
                        formingData.map((item) => {
                            let forming = item;
                            if (forming.HORSENAME === horse.HORSENAME && forming?.RACENUM === props.raceInfo?.RACENUM && item.CLASSCODE !== "Btria" && key < 3) {

                                switch (horse.PACE) {
                                    case "Lead":
                                        formingInfo.lead += Number(calcLead(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'lead';
                                        break;
                                    case "Lead/Handy":
                                        formingInfo.leadHandy += Number(calcLeadHandy(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'leadHandy';
                                        break;
                                    case "Handy":
                                        formingInfo.handy += Number(calcHandy(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'handy';
                                        break;
                                    case "Handy/Mid":
                                        formingInfo.handyMid += Number(calcHandyMid(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'handyMid';
                                        break;
                                    case "Mid":
                                        formingInfo.mid += Number(calcMid(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'mid';
                                        break;
                                    case "Rear":
                                        formingInfo.rear += Number(calcRear(forming));
                                        formingInfo.position = key;
                                        formingInfo.rpace = 'rear';
                                        break;
                                }

                                formingInfo.increment++;
                                key++;
                            }
                        })

                        formingInfoARR.push(formingInfo);
                    }
                });

                for (let i = 0; i < formingInfoARR.length; i++) {
                    formingInfoARR[i] = roundPace(formingInfoARR[i]);
                }


                formingInfoARR = formingInfoARR.sort((a, b) => {
                    return b.barrier - a.barrier;
                });

            }

            var maxFirm = 0
            var maxHeavy = 0
            var maxSoft = 0
            var maxGood = 0
            var maxSynth = 0
            var odds = []
            props.horses.forEach((element) => {
                if (element.points_per_firm > maxFirm) {
                    maxFirm = element.points_per_firm
                }
                if (element.points_per_heavy > maxHeavy) {
                    maxHeavy = element.points_per_heavy
                }
                if (element.points_per_soft > maxSoft) {
                    maxSoft = element.points_per_soft
                }
                if (element.points_per_good > maxGood) {
                    maxGood = element.points_per_good
                }
                if (element.points_per_synth > maxSynth) {
                    maxSynth = element.points_per_synth
                }
                if (element.ub_win !== 0) {
                    odds.push(Number(element.ub_win))
                }
            })
            var ubMinOdd = Math.min.apply(Math, odds)

            formingInfoARR.map((item, i) => {
                const horse = horses.find(val => val?.horse_number === Number(item.no))
                // console.log('item', item)
                if (props.trackInfo[0]?.isClockwise === 0) {
                    return barRows.push(
                        <div style={{ paddingRight: 24 }} key={`b-${i}`}>
                            <Bar key={i} maxI={hrsForm.length} color={coloring(item.pace)} barrier={item.barrier}
                                no={item.no} horseName={item.name} pace={item.pace} value={paceRanking(item, formingInfoARR)}
                                horse={horse} silkData={getI(horse)}
                                maxFirm={maxFirm} maxHeavy={maxHeavy} maxSoft={maxSoft}
                                maxGood={maxGood} maxSynth={maxSynth} ubMinOdd={ubMinOdd} trackCondition={props.trackInfo[0]?.track_condition}
                                isNa={props.trackInfo[0]?.is_na} />
                        </div>
                    );

                } else {
                    return barRows.push(
                        <div style={{ paddingLeft: 32 }} key={`ba-${i}`}>
                            <BarAnti key={i} maxI={hrsForm.length} color={coloring(item.pace)} barrier={item.barrier}
                                no={item.no} horseName={item.name} pace={item.pace} value={paceRanking(item, formingInfoARR)}
                                horse={horse} silkData={getI(horse)}
                                maxFirm={maxFirm} maxHeavy={maxHeavy} maxSoft={maxSoft}
                                maxGood={maxGood} maxSynth={maxSynth} ubMinOdd={ubMinOdd} trackCondition={props.trackInfo[0]?.track_condition}
                                isNa={props.trackInfo[0]?.is_na} />
                        </div>
                    );
                }
            })

            if (barRows.length > 0) {
                return barRows
            }
        }
    }

    return (
        <div style={{ marginTop: 1, zIndex: 0, marginBottom: 1 }}>
            <Col lg={12} style={{ padding: 0, paddingLeft: 0 }}>
                <Row>
                    <Col lg={12} style={{ backgroundColor: 'white', height: 'auto', borderRadius: 8, paddingBottom: 32 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <FontAwesomeIcon icon={faTimes} color="black" size="1x" style={{ fontSize: 14, opacity: '32%', marginTop: 10, cursor: 'pointer' }} onClick={() => closeSpeedMap()} />
                        </div>
                        <Col xs={12} md={12} lg={12} style={{ marginTop: 16 }} >
                            {renderRaceBar()}
                        </Col>

                        <Col lg={12} style={{ marginTop: 0, padding: 0 }}>
                            <div style={{ padding: 0, marginTop: 16, marginLeft: innerWidth < 500 ? -13 : 16 }}>
                                {renderChecker()}
                            </div>
                            {renderLegend()}
                        </Col>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

const mapStateToProps = state => ({
    raceByDate: state.raceReducer.trackcodes,
    raceData: state.raceReducer.races,
    formingData: state.raceReducer.formings,
    hrsForm: state.raceReducer.raceForm,
    trackInfo: state.raceReducer.trackInfoOpt,
    singleRace: state.raceReducer.singleRace,
    speedMapLoading: state.raceReducer.speedMapLoading,
    horses: state.raceReducer.horsesOpt,
    resetSpeedMaps: state.raceReducer.resetSpeedMap,
    raceInfo: state.raceReducer.raceInfo,
})

const mapDispatchToProps = (dispatch) => ({
    setLoadingSpeedMap: () => dispatch(raceAction.setLoadingSpeedMap()),
    getFormings: (data) => dispatch(raceAction.getFormings(data)),
    loadRaceForm: (data) => dispatch(raceAction.loadRaceForm(data)),
    setFormingRace: (data) => dispatch(raceAction.setFormingRace(data)),
    changeTab: (num) => dispatch(raceAction.changeTab(num)),
    resetSpeedMap: (bool) => dispatch(raceAction.resetSpeedMap(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpeedMap))
