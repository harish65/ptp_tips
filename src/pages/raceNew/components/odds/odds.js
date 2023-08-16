import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    // Table,
    // Col, Row,
    Badge, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse
} from 'reactstrap';
// import './horseTable.scoped.scss'
import { silkSize } from '../../../../config/racesUtils';
import Arrow from '../../../../assets/Icons/arrowDes.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHorseHead, faStar } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment-timezone';
import DropDownArrow from 'react-ionicons/lib/MdArrowDropdown'
// import RefreshIcon from 'react-ionicons/lib/IosRefresh'
import ArrowUp from 'react-ionicons/lib/IosArrowUp'
import ArrowDown from 'react-ionicons/lib/IosArrowDown'

import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';

import './Odds.scoped.scss'
import 'react-vis/dist/style.css';


const Odds = (props) => {
    const [lmm, setLmm] = useState(null)
    const [intervalDrop, setIntervalDrop] = useState(false)
    const [interval, setInterval] = useState(1)
    const [openAreas, setOpenAreas] = useState([])

    useEffect(() => {
        lateMM(props.horse, props.trackInfo[0]?.race_time, Number(props.lmmTime))
            .then(response => {
                setLmm(response)
            })
        resetOpenColl()
        return () => {
            setLmm(null)
        } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.horse])

    // console.log(props)

    const getFormatedData = (data) => {
        const formatedData = []
        if (props.trackInfo[0].ub_market_open_time !== null && props.trackInfo[0].ub_market_open_time !== '' && data.ub_open_price_main !== null && data.ub_open_price_main !== 0) {
            formatedData.push({
                time: moment(props.trackInfo[0].ub_market_open_time).format('DD-MM HH:mm'),
                ubOdd: parseFloat(data.ub_open_price_main)?.toFixed(2),
                bbOdd: '',
            })
        }

        if (props.trackInfo[0].sb_market_open_time !== null && props.trackInfo[0].sb_market_open_time !== '' && data.sb_open_price_main !== null && data.sb_open_price_main !== 0) {
            formatedData.push({
                time: moment(props.trackInfo[0].sb_market_open_time).format('DD-MM HH:mm'),
                ubOdd: '',
                bbOdd: parseFloat(data.sb_open_price_main)?.toFixed(2),
            })
        }
        // let s = data.ub_flucs?.odd?.forEach((zone, i) => {
        //     formatedData.push({
        //         time: moment(data.ub_flucs.t[i]).format('DD-MM HH:mm'),
        //         ubOdd: parseFloat(zone)?.toFixed(2),
        //         bbOdd: '',
        //     })
        // })
        // let b = data.sb_flucs?.odd?.forEach((zone, i) => {
        //     formatedData.push({
        //         time: moment(data.sb_flucs.t[i]).format('DD-MM HH:mm'),
        //         ubOdd: '',
        //         bbOdd: parseFloat(zone)?.toFixed(2),
        //     })
        // })


        function sortByDate(a, b) {
            if (a.time < b.time) {
                return 1;
            }
            if (a.time > b.time) {
                return -1;
            }
            return 0;
        }
        const sorted = formatedData.sort(sortByDate);
        let populateData = []
        sorted.forEach((zone, i) => {

            let finalRow = {
                time: zone.time,
                ubOdd: zone.ubOdd,
                bbOdd: zone.bbOdd,
            }
            if (zone.ubOdd === '') {
                for (let j = i; j < sorted.length; j++) {
                    if (sorted[j].ubOdd) {
                        finalRow.ubOdd = sorted[j].ubOdd
                        j = sorted.length + 1
                    }
                }
            }

            if (zone.bbOdd === '') {
                for (let j = i; j < sorted.length; j++) {
                    if (sorted[j].bbOdd) {
                        finalRow.bbOdd = sorted[j].bbOdd
                        j = sorted.length + 1
                    }
                }
            }
            populateData.push(finalRow)
        })

        let populatedDataBackward = []
        for (let i = populateData.length - 1; i >= 0; i--) {
            let dataRow = {
                time: populateData[i].time,
                ubOdd: populateData[i].ubOdd,
                bbOdd: populateData[i].bbOdd,
            }
            if (populateData[i].bbOdd === '') {
                for (let j = populateData.length - 1; j > 0; j--) {
                    if (populateData[j].bbOdd) {
                        dataRow.bbOdd = populateData[j].bbOdd
                        j = -1
                    }
                }
            }

            if (populateData[i].ubOdd === '') {
                for (let j = populateData.length - 1; j > 0; j--) {
                    if (populateData[j].ubOdd) {
                        dataRow.ubOdd = populateData[j].ubOdd
                        j = -1
                    }
                }
            }
            populatedDataBackward.push(dataRow)
        }

        return (populatedDataBackward)
    }

    const lateMM = async (data, time, option) => {
        let tcheck
        tcheck = moment(time, 'HH:mm:ss').subtract(option, 'minute').format('HH:mm:ss')
        let topPercent = 0
        let mmNumber = null
        for (let i = 0; i < data.length; i++) {
            if (data[i].horse_status === 'Starter') {
                var openPrice
                var currentPrrice
                var currentPercent
                var horse_number
                for (let j = 0; j < data[i].ub_flucs?.t.length; j++) {
                    if (moment(data[i].ub_flucs.t[j], 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss') <= tcheck) {
                        openPrice = parseFloat(data[i].ub_flucs.odd[j])
                        currentPrrice = parseFloat(data[i].ub_win)
                        currentPercent = (100 - ((currentPrrice - 1) / (openPrice - 1)) * 100)
                        horse_number = data[i].horse_number
                        j = data[i].ub_flucs.t.length + 1
                    }
                }
                if (currentPercent > topPercent) {
                    topPercent = currentPercent
                    mmNumber = horse_number
                }
            }
        }
        return mmNumber
    }

    const PTP = (horse_number) => {
        return <p key={horse_number + 'PTP'} style={{ fontSize: 10, marginBottom: 2 }}><Badge color="primary"><FontAwesomeIcon icon={faHorseHead} size="1x" /></Badge></p>
    }

    const FAV = (horse_number) => {
        return <p key={horse_number + 'FAV'} style={{ fontSize: 10, marginBottom: 2 }}><Badge color="warning"><FontAwesomeIcon icon={faStar} size="1x" /></Badge></p>
    }

    const MM = (horse_number) => {
        return <p key={horse_number + 'MM'} style={{ fontSize: 10, marginBottom: 2 }}><Badge style={{ backgroundColor: 'rgb(9, 106, 179)', color: 'white', padding: 2.8 }}><img src={Arrow} alt='' width="14px" /></Badge></p>
    }


    const LMM = (horse_number) => {
        return <p key={horse_number + 'LMM'} style={{ fontSize: 10, marginBottom: 2, cursor: 'pointer' }}
        ><Badge color="danger" style={{ color: 'white', padding: 2.6 }}><img src={Arrow} alt='' width="14px" /></Badge></p>

    }

    const renderBadge = (element, maxFirm, maxHeavy, maxSoft, maxGood, maxSynth, ubMinOdd) => {
        let trackCondition = props.trackInfo[0]?.track_condition
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
            finalBadge.push(FAV(element.horse_number))
        }
        if (element.is_market_mover === 1) {
            finalBadge.push(MM(element.horse_number))
        }

        if (!props.currentUser && !props.trackInfo[0]?.result) {
            return null
        }

        if (element?.horse_number === lmm) {
            finalBadge.push(LMM(element.horse_number))
        }


        return finalBadge
    }

    const renderShapeUb = (ub, color) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: 12 }}>
                <span>{ub ? ub : '-'}</span>
            </div>
        )
    }

    const renderShapeSb = (sb, color) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: 12 }}>
                <span>{sb ? sb : '-'}</span>
            </div>
        )
    }
    // console.log(props.trackInfo[0])

    const renderPercentages = (val) => {
        if (props.trackInfo[0]?.is_na === 1 && props.isLoggedIn
            // && !isNaChecked
        ) {
            if (Math.round(val) <= 10 && Math.round(val) !== null) {
                return 10 + "%"
            } else {
                return Math.round(val) + "%"
            }
        } else if (props.isLoggedIn) {
            if (!props.trackInfo[0]?.result && props.isExpired) {
                return <FontAwesomeIcon icon={faLock} color="#3f4254" size="1x" style={{ marginRight: 4 }} />
            } else {
                if (Math.round(val) <= 10 && Math.round(val) !== null) {
                    return 10 + "%"
                } else {
                    return Math.round(val) + "%"
                }
            }
        } else {
            if (props.trackInfo[0]?.result) {
                if (Math.round(val) <= 10 && Math.round(val) !== null) {
                    return 10
                } else {
                    return Math.round(val) + "%"
                }
            } else {
                return <FontAwesomeIcon icon={faLock} color="#3f4254" size="1x" style={{ marginRight: 4 }} />
            }
        }
    }

    const renderSelection = (element) => {
        const trackCond = props.trackInfo[0]?.track_condition

        switch (trackCond) {
            case 'F':
                return renderPercentages(element?.points_per_firm)
            case "G":
                return renderPercentages(element?.points_per_good)
            case "SO":
                return renderPercentages(element?.points_per_soft)
            case "H":
                return renderPercentages(element?.points_per_heavy)
            case "SY":
                return renderPercentages(element?.points_per_synth)
            default:
                return renderPercentages(element?.points_per_good)
        }
    }

    const bookie = (val) => {
        if (val === 'sportsBetting') {
            window.open(`https://www.boombet.com.au/racing/${props.trackInfo[0].sb_venue_id}`, '_blank');
        } else if (val === 'Unibet') {
            window.open(`https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418`, '_blank');
        }
    }

    const mainData = () => {
        const trackCondition = props.trackInfo[0]?.track_condition

        var HorseData

        if (props.currentUser) {
            if (trackCondition === 'F') {
                const fData = props.horse.sort((a, b) => (a.points_per_firm > b.points_per_firm) ? -1 : 1)
                HorseData = fData
            } else if (trackCondition === 'G') {
                const gData = props.horse.sort((a, b) => (a.points_per_good > b.points_per_good) ? -1 : 1)
                HorseData = gData
            } else if (trackCondition === 'SO') {
                const soData = props.horse.sort((a, b) => (a.points_per_soft > b.points_per_soft) ? -1 : 1)
                HorseData = soData
            } else if (trackCondition === 'H') {
                const hData = props.horse.sort((a, b) => (a.points_per_heavy > b.points_per_heavy) ? -1 : 1)
                HorseData = hData
            } else if (trackCondition === 'SY') {
                const syData = props.horse.sort((a, b) => (a.points_per_synth > b.points_per_synth) ? -1 : 1)
                HorseData = syData
            } else {
                HorseData = props.horse
            }
        } else if (!props.isLogged && props.trackInfo[0]?.result) {
            if (trackCondition === 'F') {
                const fData = props.horse.sort((a, b) => (a.points_per_firm > b.points_per_firm) ? -1 : 1)
                HorseData = fData
            } else if (trackCondition === 'G') {
                const gData = props.horse.sort((a, b) => (a.points_per_good > b.points_per_good) ? -1 : 1)
                HorseData = gData
            } else if (trackCondition === 'SO') {
                const soData = props.horse.sort((a, b) => (a.points_per_soft > b.points_per_soft) ? -1 : 1)
                HorseData = soData
            } else if (trackCondition === 'H') {
                const hData = props.horse.sort((a, b) => (a.points_per_heavy > b.points_per_heavy) ? -1 : 1)
                HorseData = hData
            } else if (trackCondition === 'SY') {
                const syData = props.horse.sort((a, b) => (a.points_per_synth > b.points_per_synth) ? -1 : 1)
                HorseData = syData
            } else {
                HorseData = props.horse
            }
        } else {
            HorseData = props.horse
        }
        return HorseData
    }

    const putInterval = (val) => {
        setInterval(val)
    }

    const maxminOdd = (data, type) => {
        if (data != null) {
            let max = parseFloat(data.odd[data.odd.length - 1])
            let min = parseFloat(data.odd[data.odd.length - 1])
            for (let i = 0; i < data.odd.length; i++) {
                if (parseFloat(data.odd[i]) > parseFloat(max)) {
                    max = parseFloat(data.odd[i])
                }
                if (parseFloat(parseFloat(data.odd[i])) < min) {
                    min = parseFloat(data.odd[i])
                }
            }

            if (type === 1) {
                return (max?.toFixed(2))
            } else if (type === 2) {
                return (min?.toFixed(2))
            }
        } else {
            return ('-.--')
        }
    }

    const openSection = (i) => {
        let finalData = []
        openAreas.forEach((zone, index) => {
            if (i === index) {
                finalData.push(!zone)
            } else {
                finalData.push(zone)
            }
        })

        setOpenAreas(finalData)
    };

    const resetOpenColl = () => {
        let closedRow = []
        const horses = mainData()
        horses.forEach((zone) => {
            closedRow.push(false)
        })
        setOpenAreas(closedRow)
    }


    const handleFlucsWithIntervalNew = (data) => {
        let now = moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss')
        let marketCloseDate = props.trackInfo[0]?.meetdate
        let marketCloseTime = props.trackInfo[0]?.race_closed_time

        if (marketCloseTime) {
            let finalTime = moment(marketCloseDate + ' ' + marketCloseTime).format('YYYY-MM-DD HH:mm:ss')
            return checker(data, finalTime)
        } else {
            return checker(data, now)
        }
    }

    const checker = (data, time) => {
        let finalData = data
        for (let i = 1; i < 6; i++) {
            finalData.push({
                time: moment(time).subtract((interval * i), 'minutes').format('DD-MM HH:mm'),
                ubOdd: '',
                bbOdd: ''
            })
        }
        function sortByDate(a, b) {
            if (a.time < b.time) {
                return 1;
            }
            if (a.time > b.time) {
                return -1;
            }
            return 0;
        }
        const sorted = finalData.sort(sortByDate)

        let populateData = []
        sorted.forEach((zone, i) => {
            let finalRow = {
                time: zone.time,
                ubOdd: zone.ubOdd,
                bbOdd: zone.bbOdd,
            }
            if (zone.ubOdd === '') {
                for (let j = i; j < sorted.length; j++) {
                    if (sorted[j].ubOdd) {
                        finalRow.ubOdd = sorted[j].ubOdd
                        j = sorted.length + 1
                    }
                }
            }

            if (zone.bbOdd === '') {
                for (let j = i; j < sorted.length; j++) {
                    if (sorted[j].bbOdd) {
                        finalRow.bbOdd = sorted[j].bbOdd
                        j = sorted.length + 1
                    }
                }
            }
            populateData.push(finalRow)
        })
        let populatedDataBackward = []
        for (let i = populateData.length - 1; i >= 0; i--) {
            let dataRow = {
                time: populateData[i].time,
                ubOdd: populateData[i].ubOdd,
                bbOdd: populateData[i].bbOdd,
            }
            if (populateData[i].bbOdd === '') {
                for (let j = populateData.length - 1; j > 0; j--) {
                    if (populateData[j].bbOdd) {
                        dataRow.bbOdd = populateData[j].bbOdd
                        j = -1
                    }
                }
            }

            if (populateData[i].ubOdd === '') {
                for (let j = populateData.length - 1; j > 0; j--) {
                    if (populateData[j].ubOdd) {
                        dataRow.ubOdd = populateData[j].ubOdd
                        j = -1
                    }
                }
            }
            populatedDataBackward.push(dataRow)
        }

        // console.log('populated',populatedDataBackward)
        const filtered = populatedDataBackward.filter((value) => {
            // const filter1 = moment(time).subtract((interval * 0), 'minutes').format('DD-MM HH:mm');
            // const filter1 = populatedDataBackward[populatedDataBackward.length -1].time
            const filter2 = moment(time).subtract((interval * 1), 'minutes').format('DD-MM HH:mm');
            const filter3 = moment(time).subtract((interval * 2), 'minutes').format('DD-MM HH:mm');
            const filter4 = moment(time).subtract((interval * 3), 'minutes').format('DD-MM HH:mm');
            const filter5 = moment(time).subtract((interval * 4), 'minutes').format('DD-MM HH:mm');
            const filter6 = moment(time).subtract((interval * 5), 'minutes').format('DD-MM HH:mm');
            const finalDataTime = value.time;
            return (
                // finalDataTime.indexOf(filter1) !== -1 ||
                finalDataTime.indexOf(filter2) !== -1 ||
                finalDataTime.indexOf(filter3) !== -1 ||
                finalDataTime.indexOf(filter4) !== -1 ||
                finalDataTime.indexOf(filter5) !== -1 ||
                finalDataTime.indexOf(filter6) !== -1
            );
        });
        // console.log('filtered', filtered)
        return (filtered)
    }


    const renderNames = (val) => {
        /**
         * An exception was thrown for some races with no Jockey's details
         * I surrounded this method with try-catch Block.
         */
        try {

            let formatedName = ""
            var firstSplit = val?.split('-')

            if (firstSplit?.length > 0) {
                formatedName = firstSplit.join(' ')
            }
            else {
                formatedName = val
            }

            var data = formatedName?.split(" ")
            let len = data.length - 1
            let final = ""
            data.forEach((zone, i) => {
                if (i === len) {
                    final += zone
                    final = final.trim()
                    if (final.length > 13) {
                        final = final.substring(0, 12) + "..."
                    }
                } else {
                    if (zone === '&') {

                    }
                    if (zone !== 'Ms' && zone !== 'Mr' && zone !== 'Mrs') {
                        final += zone.charAt(0) + " "
                    }
                }
            })

            return final
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(props.horse)
    const getData = () => {
        let final = []
        var maxFirm = 0
        var maxHeavy = 0
        var maxSoft = 0
        var maxGood = 0
        var maxSynth = 0
        var odds = []
        props.horse.forEach((element) => {
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
        const horses = mainData()
        let rowHandler = []
        horses.map(async (element, i) => {
            if (element.horse_status !== 'Scratched' && element.horse_status !== 'LateScratching') {

                let formatedFlucsData = getFormatedData(element)

                let refinedFlucsdata = []
                formatedFlucsData.forEach(zone => {
                    if (zone.ubOdd !== '') {
                        refinedFlucsdata.push(zone)
                    }
                })
                rowHandler.push(false)

                let formatedFlucs = handleFlucsWithIntervalNew(formatedFlucsData)
                const ubOpen = Number(element?.ub_open_price).toFixed(2)
                const sbOpen = Number(element?.sb_open_price).toFixed(2)

                const ubOpenMain = Number(element?.ub_open_price_main).toFixed(2)
                const sbOpenMain = Number(element?.sb_open_price_main).toFixed(2)

                const sbHigh = Number(maxminOdd(element?.sb_flucs, 1))
                const ubHigh = Number(maxminOdd(element?.ub_flucs, 1))

                const sbLow = Number(maxminOdd(element?.sb_flucs, 2))
                const ubLow = Number(maxminOdd(element?.ub_flucs, 2))

                const sbFluc5 = formatedFlucs[4].bbOdd
                const ubFluc5 = formatedFlucs[4].ubOdd

                const sbFluc4 = formatedFlucs[3].bbOdd
                const ubFluc4 = formatedFlucs[3].ubOdd

                const sbFluc3 = formatedFlucs[2].bbOdd
                const ubFluc3 = formatedFlucs[2].ubOdd

                const sbFluc2 = formatedFlucs[1].bbOdd
                const ubFluc2 = formatedFlucs[1].ubOdd

                const sbFluc1 = formatedFlucs[0].bbOdd
                const ubFluc1 = formatedFlucs[0].ubOdd

                const sbCurrent = Number(element?.sb_win).toFixed(2)
                const ubCurrent = Number(element?.ub_win).toFixed(2)


                final.push(
                    <>

                        <tr key={i} onClick={() => { openSection(i) }} style={{ cursor: "pointer" }} className="tablerow">

                            <th className='sticky-col first-col' >
                                <div style={{ display: 'flex' }} className="tablefirstcol">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <p><strong style={{ fontSize: props.disableButtons ? 18 : 14, color: 'black' }}>{element?.horse_number}</strong></p>
                                        <div style={{ width: 32, height: 32, backgroundImage: "url(" + element?.horse_silksUrl + ")", backgroundPositionX: Number(silkSize(element?.horse_number - 1)), marginTop: -10 }}></div>
                                    </div>


                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8 }}>
                                        <p>
                                            {element?.horse_id !== null ?
                                                <Link style={{ color: "black" }} to={`/profile/horse/${element?.horse_id}/${element?.horse_name.split(" ").join("-")}`}>
                                                    <span style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: window.innerWidth > 700 ? 14 : 11, fontFamily: 'Poppins' }}>
                                                        {element?.horse_name}
                                                    </span>
                                                </Link>
                                                :
                                                <span style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: props.dark ? 18 : 14 }}>
                                                    {element?.horse_name}
                                                </span>}<ArrowDown />
                                        </p>
                                        <div style={{ display: "flex", flexDirection: "column" }}>

                                            <span
                                                style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                                            >
                                                <strong style={{ fontWeight: "bold" }}>J:</strong>{" "}
                                                {renderNames(element?.horse_jockey)}
                                            </span>
                                            <span
                                                style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                                            >
                                                <strong style={{ fontWeight: "bold" }}>T:</strong>{" "}
                                                {renderNames(element?.horse_trainer)}
                                            </span>
                                            <span
                                                style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                                            >
                                                <strong style={{ fontWeight: "bold" }}>SF:</strong>{" "}
                                                {element?.horse_sf}
                                            </span>
                                            <span
                                                style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                                            >
                                                <strong style={{ fontWeight: "bold" }}>W:</strong>{" "}
                                                {Number(element?.horse_weight).toFixed(1)}
                                            </span>
                                        </div>


                                        <div style={{ display: 'flex' }}>
                                            {renderBadge(element, maxFirm, maxHeavy, maxSoft, maxGood, maxSynth, ubMinOdd)}
                                        </div>



                                    </div>
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', fontWeight: '400', color: 'black', fontSize: 14, paddingTop: 20 }}>
                                {renderSelection(element)}
                            </th>

                            <th style={{ border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8, textAlign: 'center', justifyContent: 'center' }}>
                                    <div style={{ backgroundColor: '#e12b80', color: 'white', borderRadius: 4, marginBottom: 2 }}>
                                        <strong style={{ color: 'white', fontStyle: 'italic' }}>BB</strong>
                                    </div>
                                    <div style={{ backgroundColor: 'black', color: 'white', borderRadius: 4 }}>
                                        <img style={{ objectFit: "contain", height: "19px", borderRadius: "5px" }}
                                            src={'https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png'} alt="" />
                                    </div>
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {renderShapeSb(sbOpenMain, 'black')}
                                    {renderShapeUb(ubOpenMain, 'black')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {renderShapeSb(sbOpen, 'black')}
                                    {renderShapeUb(ubOpen, 'black')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {renderShapeSb(sbLow, 'black')}
                                    {renderShapeUb(ubLow, 'black')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {renderShapeSb(sbHigh, 'black')}
                                    {renderShapeUb(ubHigh, 'black')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {sbFluc1 < sbFluc2 ? renderShapeSb(sbFluc1, '#1dd1a1') : sbFluc1 === sbFluc2 ? renderShapeSb(sbFluc1, 'black') : renderShapeSb(sbFluc1, '#ff6b6b')}
                                    {ubFluc1 < ubFluc2 ? renderShapeUb(ubFluc1, '#1dd1a1') : ubFluc1 === ubFluc2 ? renderShapeSb(ubFluc1, 'black') : renderShapeUb(ubFluc1, '#ff6b6b')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {sbFluc2 < sbFluc1 ? renderShapeSb(sbFluc2, '#1dd1a1') : sbFluc2 === sbFluc1 ? renderShapeSb(sbFluc2, 'black') : renderShapeSb(sbFluc2, '#ff6b6b')}
                                    {ubFluc2 < ubFluc1 ? renderShapeUb(ubFluc2, '#1dd1a1') : ubFluc2 === ubFluc1 ? renderShapeSb(ubFluc2, 'black') : renderShapeUb(ubFluc2, '#ff6b6b')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {sbFluc3 < sbFluc2 ? renderShapeSb(sbFluc3, '#1dd1a1') : sbFluc3 === sbFluc2 ? renderShapeSb(sbFluc3, 'black') : renderShapeSb(sbFluc3, '#ff6b6b')}
                                    {ubFluc3 < ubFluc2 ? renderShapeUb(ubFluc3, '#1dd1a1') : ubFluc3 === ubFluc2 ? renderShapeSb(ubFluc3, 'black') : renderShapeUb(ubFluc3, '#ff6b6b')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {sbFluc4 < sbFluc3 ? renderShapeSb(sbFluc4, '#1dd1a1') : sbFluc4 === sbFluc3 ? renderShapeSb(sbFluc4, 'black') : renderShapeSb(sbFluc4, '#ff6b6b')}
                                    {ubFluc4 < ubFluc3 ? renderShapeUb(ubFluc4, '#1dd1a1') : ubFluc4 === ubFluc3 ? renderShapeSb(ubFluc4, 'black') : renderShapeUb(ubFluc4, '#ff6b6b')}
                                </div>
                            </th>

                            <th style={{ textAlign: 'center', paddingTop: 15, border: "2px solid", borderColor: "#eef0f4" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400', color: 'black', fontSize: 14 }}>
                                    {sbFluc5 < sbFluc4 ? renderShapeSb(sbFluc5, '#1dd1a1') : sbFluc5 === sbFluc4 ? renderShapeSb(sbFluc5, 'black') : renderShapeSb(sbFluc5, '#ff6b6b')}
                                    {ubFluc5 < ubFluc4 ? renderShapeUb(ubFluc5, '#1dd1a1') : ubFluc5 === ubFluc4 ? renderShapeSb(ubFluc5, 'black') : renderShapeUb(ubFluc5, '#ff6b6b')}
                                </div>
                            </th>


                            <th style={{ textAlign: 'center', paddingTop: 7 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '400' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
                                        <Button className="odds-button" onClick={() => bookie('sportsBetting')} style={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 0 }} color="default" size="sm">
                                            <div>
                                                {sbFluc5 < sbFluc4 ? <ArrowDown style={{ marginRight: 2 }} fontSize='16' color="#1dd1a1" /> : sbFluc5 === sbFluc4 ? null : <ArrowUp style={{ marginRight: 2 }} fontSize='16' color="#ff6b6b" />}
                                            </div>
                                            <strong style={{ color: 'black' }}>{sbCurrent}</strong>
                                        </Button>

                                        <Button className="odds-button" onClick={() => bookie('Unibet')} style={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 0 }} color="default" size="sm">
                                            <div>
                                                {ubFluc5 < ubFluc4 ? <ArrowDown style={{ marginRight: 2 }} fontSize='16' color="#1dd1a1" /> : ubFluc5 === ubFluc4 ? null : <ArrowUp style={{ marginRight: 2 }} fontSize='16' color="#ff6b6b" />}
                                            </div>
                                            <strong style={{ color: 'black' }}>{ubCurrent}</strong>
                                        </Button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </>
                )
                if (props.isLoggedIn) {
                    final.push(
                        <>
                            <tr key={i + 'expand'}>
                                <td colSpan={13}>
                                    <Collapse isOpen={openAreas[i]} style={{ width: "100%", height: 150 }} >
                                        <ResponsiveContainer width="100%" height={150}>
                                            <AreaChart width={700} height={150} data={refinedFlucsdata}
                                                margin={{ top: 25, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorUb" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#39a634" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#39a634" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorSb" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#e12b80" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#e12b80" stopOpacity={0} />
                                                    </linearGradient>

                                                </defs>
                                                <XAxis dataKey="time" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="bbOdd" stroke="#e12b80" fillOpacity={1} fill="url(#colorSb)" />
                                                <Area type="monotone" dataKey="ubOdd" stroke="#39a634" fillOpacity={1} fill="url(#colorUb)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Collapse>
                                </td>
                            </tr>
                        </>
                    )
                } else {
                    final.push(
                        <>
                            <tr key={i + 'expand'} >
                                <td colSpan={13}>
                                    <Collapse isOpen={openAreas[i]} id="collapse" dimension="width" style={{ textAlign: "center", marginTop: 20, margin: 0, padding: 0 }} >

                                        <div width="100%" style={{ textAlign: "center" }}>

                                            <FontAwesomeIcon icon={faLock} color="#3f4254" size="3x" style={{ marginBottom: 10, marginTop: 10 }} />

                                            <div style={{ fontWeight: 1000, }}>
                                                * Sign In or Register In Order To See Odds Graph *
                                            </div>


                                        </div>

                                    </Collapse>
                                </td>
                            </tr>
                        </>
                    )
                }
            }


        })
        return final
    }




    const renderTrackBadge = () => {
        const trackCondition = props.trackInfo[0]?.track_condition
        switch (trackCondition) {
            case 'F':
                return <Badge color="black">
                    <strong style={{ color: 'white' }}>F %</strong>
                </Badge>
            case 'G':
                return <Badge color="primary">
                    <strong style={{ color: 'white' }}>G %</strong>
                </Badge>
            case 'SO':
                return <Badge color="warning">
                    <strong style={{ color: 'white' }}>SO %</strong>
                </Badge>
            case 'H':
                return <Badge color="danger">
                    <strong style={{ color: 'white' }}>H %</strong>
                </Badge>
            case 'SY':
                return <Badge color="primary">
                    <strong style={{ color: 'white' }}>SY %</strong>
                </Badge>
            case 'N/A':
                return <Badge style={{ backgroundColor: 'grey' }}>
                    <strong style={{ color: 'white' }}>N/R</strong>
                </Badge>
            default:
                return <Badge>Badge %</Badge>
        }

    }

    const handleflucsInterval = () => {
        setIntervalDrop(!intervalDrop)
    }
    return (
        // <div style={{position:'relative', width:'100%' }}>
        <div className="view" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 6 }} >
                <Dropdown isOpen={intervalDrop} toggle={handleflucsInterval} style={{ marginTop: 2 }} >
                    <DropdownToggle>
                        <div style={{ marginLeft: 8, width: '100%', borderRadius: "5px", marginTop: 5, marginBottom: 5 }} className='btn-primary'>
                            <span >
                                Flucs: {interval} {interval === 1 ? 'min' : 'mins'}
                            </span>
                            <DropDownArrow fontSize='18' color="white" />
                        </div>
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem onClick={() => putInterval(1)} >1 Min</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => putInterval(5)}>5 Min</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => putInterval(10)}>10 Min</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => putInterval(30)}>30 min</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => putInterval(60)}>1 Hr</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => putInterval(240)}>4 Hrs</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="wrapper">
                <table style={{ fontFamily: 'Poppins', marginTop: 5 }} >
                    <thead style={{ padding: 0, backgroundColor: '#fff' }} >
                        {/* <th style={{ padding: 2, textAlign: 'center' }} colSpan={1}>
                                <div style={{ padding: 8 }}>
                                    <RefreshIcon fontSize='24' color="grey" />
                                </div>
                            </th> */}
                        <tr>
                            <th className='sticky-col first-col'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span
                                        style={{ marginLeft: 10 }}>
                                        #
                                        <span style={{ marginLeft: 17 }}>
                                            Horse
                                        </span>

                                    </span>

                                    {/* <Dropdown isOpen={intervalDrop} toggle={handleflucsInterval} style={{zIndex:999999}}>
                                <DropdownToggle>
                                    <div style={{ marginLeft: 8, width: '100%' }}>
                                        <span>Fluctuations: {interval} {interval === 1 ? 'min' : 'mins'}</span>
                                        <DropDownArrow fontSize='16' color="grey" />
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem onClick={() => putInterval(1)} >1 Min</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => putInterval(5)}>5 Min</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => putInterval(10)}>10 Min</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => putInterval(30)}>30 min</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => putInterval(60)}>1 Hr</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => putInterval(240)}>4 Hrs</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> */}
                                </div>
                            </th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>{renderTrackBadge()}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>Bookies</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>Open</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>Today</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>Low</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>High</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>-{((5 * interval) / 60).toFixed(1) > 60 ? ((5 * interval) / 60).toFixed(1) : (5 * interval)}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>-{((4 * interval) / 60).toFixed(1) > 60 ? ((4 * interval) / 60).toFixed(1) : (4 * interval)}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>-{((3 * interval) / 60).toFixed(1) > 60 ? ((3 * interval) / 60).toFixed(1) : (3 * interval)}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>-{((2 * interval) / 60).toFixed(1) > 60 ? ((2 * interval) / 60).toFixed(1) : (2 * interval)}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>-{interval}</th>
                            <th style={{ textAlign: 'center', width: '3%', border: "2px solid", borderColor: "#eef0f4" }}>Odds</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'white' }}>
                        {getData()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.raceReducer.loading,
    currentUser: state.auth.currentUser,
    isLoggedIn: state.auth.isLoggedIn,
    horse: state.raceReducer.horsesOpt,
    lmmTime: state.raceReducer.lmmTime,
    trackInfo: state.raceReducer.trackInfoOpt,
})

export default connect(mapStateToProps)(withRouter(Odds));
