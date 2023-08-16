import React, { useState, useEffect } from 'react';
import actions from '../../redux/actions/selections';
import { connect } from "react-redux";
import { withRouter , Link } from "react-router-dom";

// import Slider from '@material-ui/core/Slider';
// import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import moment from 'moment-timezone';
import { Row, Col } from 'reactstrap'
import LoadingNew from '../../components/loading/LoadingNew';

import Badge from 'reactstrap/lib/Badge';

import Close from '../../assets/Icons/close.svg'
import Warning from '../../assets/Icons/warning.svg'
import Clear from '../../assets/Icons/clear.png'


import './search-filter.scss'
import { isObject } from 'lodash';


export const SearchFilter = (props) => {

    const baseRules = [
        { value: 'ptp%', label: 'PTP%', id: 0 },
        { value: 'diff%', label: 'DIFF%', id: 1 },
        { value: 'horse', label: 'Horse', id: 2 },
        { value: 'jockey', label: 'Jockey', id: 3 },
        { value: 'venue', label: 'Venue', id: 4 },
        { value: 'trackCondition', label: 'Track Condition', id: 5 },
        { value: 'distance', label: 'Distance', id: 6 },
        { value: 'runs', label: 'Runs', id: 7 },
        { value: 'wins', label: 'Wins', id: 8 },
        { value: 'odds', label: 'Odds', id: 9 },
        { value: 'rating', label: 'Rating', id: 10 },
        { value: 'nr', label: 'Show N/R', id: 11 }
    ]

    const conditions = {
        isEqual: [2, 3, 4, 5, 11],
        isBiggerThan: [0, 1, 7, 8,],
        isBetween: [6, 9, 10],
        dropDowns: [2, 3, 4, 5]
    }

    const [ruleOptions, setRuleOptions] = useState([])
    const [activeRules, setActiveRules] = useState([])

    const [addNewRule, setAddNewRule] = useState({
        rule: '',
        condition: '',
        value: '',
        min: '',
        max: ''

    })

    const [addRuleError, setAddRuleError] = useState(false)

    const trackConditions = [
        { value: 'G', label: 'Good' },
        { value: 'SO', label: 'Soft' },
        { value: 'SY', label: 'Synthetic' },
        { value: 'H', label: 'Heavy' },
        { value: 'F', label: 'Firm' },
    ]

    const [showNa, setShowNa] = useState(false)

    useEffect(() => {
        setRuleOptions(baseRules)
        props.getFutureTips()
    }, [1])

    const colourStylesSquare = {
        control: styles => ({ ...styles, border: 'solid 1px #142841', width:'220px' })
    };

    const colourStylesBordered = {
        control: styles => ({ ...styles, borderRadius: '20px', border: 'solid 1px #142841', width: 200 })
    };

    const handleRuleChange = (e) => {
        if (conditions?.isEqual?.includes(e.id) === true) {
            setAddNewRule({ ...addNewRule, condition: 'is equal', rule: e })
        }
        if (conditions?.isBiggerThan?.includes(e.id) === true) {
            setAddNewRule({ ...addNewRule, condition: 'is bigger than', rule: e })
        }
        if (conditions?.isBetween?.includes(e.id) === true) {
            setAddNewRule({ ...addNewRule, condition: 'is between', rule: e })
        }
    }

    const addRule = () => {
        if (!addNewRule.rule || !addNewRule.condition) {
            setAddRuleError(true)
        }

        if (addNewRule.rule && addNewRule.rule.id !== null && addNewRule.rule.id !== 'undefined') {
            if (conditions?.isEqual?.includes(addNewRule.rule.id) === true) {
                if (addNewRule.value !== null && addNewRule.value !== 'undefined' && addNewRule.value !== '') {
                    handleResetAddRule()
                } else {
                    setAddRuleError(true)
                }
            }
            if (conditions?.isBiggerThan?.includes(addNewRule.rule.id) === true) {
                if (addNewRule.value !== null && addNewRule.value !== 'undefined' && addNewRule.value !== '') {
                    handleResetAddRule()
                } else {
                    setAddRuleError(true)
                }
            }
            if (conditions?.isBetween?.includes(addNewRule.rule.id) === true) {
                if (addNewRule.min !== null && addNewRule.max !== null && addNewRule.min !== 'undefined' && addNewRule.max !== 'undefined' && addNewRule.min !== '' && addNewRule.max !== '') {
                    handleResetAddRule()
                } else {
                    setAddRuleError(true)
                }
            }
        } else {
            setAddRuleError(true)
        }
    }

    const handleResetAddRule = () => {
        let finalData = activeRules
        finalData.push(addNewRule)

        let newBaseRules = []
        ruleOptions.map(zone => {
            if (zone.id !== addNewRule.rule.id) {
                newBaseRules.push(zone)
            }
        })
        setActiveRules(finalData)
        setAddRuleError(false)
        setAddNewRule({
            rule: '',
            condition: '',
            value: '',
            min: '',
            max: ''
        })
        setRuleOptions(newBaseRules)
    }

    const handleDropdownOptions = (id) => {
        if (id === 2) {
            return (props?.futureTips?.horses)
        } else if (id === 3) {
            return (props?.futureTips?.jockeys)
        } else if (id === 4) {
            return (props?.futureTips?.venues)
        } else if (id === 5) {
            return (trackConditions)
        }
    }

    const handleRemoveRule = (rule, id) => {
        let newBaseRules = ruleOptions
        newBaseRules.push(rule)

        let finalData = []
        activeRules.map((zone, i) => {
            if (i !== id) {
                finalData.push(zone)
            }
        })
        setActiveRules(finalData)
        setRuleOptions(newBaseRules)
    }

    const handleClearRules = () => {
        setActiveRules([])
        setRuleOptions(baseRules)
    }

    const filter = () => {
        if (activeRules?.length > 0) {
            let finalData = props.futureTips?.races
            activeRules.map((zone) => {
                let percentageData = []
                if (zone.rule.id === 0) {
                    let p = finalData?.map((races) => {
                        if (races?.raceDetails?.length > 0 && races?.raceDetails[0].selection >= Number(zone.value)) {
                            percentageData.push(races)
                        }
                    })
                } else {
                    percentageData = finalData
                }


                let diffrenceData = []
                if (zone.rule.id === 1) {
                    let d = percentageData?.map((races) => {
                        if (races?.raceDetails?.length > 0 && ((races?.raceDetails[0].selection - races?.raceDetails[1].selection) >= Number(zone.value))) {
                            diffrenceData.push(races)
                        }
                    })
                } else {
                    diffrenceData = percentageData
                }

                let trackConditionData = []
                if (zone.rule.id === 5) {
                    let tc = diffrenceData?.map(races => {
                        if (races?.track_condition === zone?.value?.value) {
                            trackConditionData.push(races)
                        }
                    })
                } else {
                    trackConditionData = diffrenceData
                }

                let venueData = []
                if (zone.rule.id === 4) {
                    let v = trackConditionData?.map(races => {
                        if (races.track_name === zone.value) {
                            venueData.push(races)
                        }
                    })
                } else {
                    venueData = trackConditionData
                }

                let horseData = []
                if (zone.rule.id === 2) {
                    let h = venueData?.map(races => {
                        let horseCount = 0
                        let rd = races?.raceDetails?.map(zone1 => {
                            if (zone1.horse_name === zone?.value?.value) {
                                horseCount++
                            }
                        })
                        if (horseCount > 0) {
                            horseData.push(races)
                        }
                    })
                } else {
                    horseData = venueData
                }

                let jockeyData = []
                if (zone.rule.id === 3) {
                    let j = horseData.map(races => {
                        let jockeyCount = 0
                        let rdj = races?.raceDetails?.map(zone1 => {
                            if (zone1.horse_jockey === zone?.value?.value) {
                                jockeyCount++
                            }
                        })
                        if (jockeyCount > 0) {
                            jockeyData.push(races)
                        }
                    })
                } else {
                    jockeyData = horseData
                }

                let distanceData = []
                if (zone.rule.id === 6) {
                    let dt = jockeyData?.map(races => {
                        let formatedDistance = Number(races.track_distance?.split('M')[0])
                        if (formatedDistance >= Number(zone.min) && formatedDistance <= Number(zone.max)) {
                            distanceData.push(races)
                        }
                    })
                } else {
                    distanceData = jockeyData
                }

                let formData = []
                if (zone.rule.id === 7) {
                    let fo = distanceData.map(races => {
                        if (races?.raceDetails?.length > 0) {
                            let formCount = 0
                            let crr = races.raceDetails.map(zone1 => {
                                if (zone1.career) {
                                    let stats = zone1.career.split('-')[0]
                                    let starts = stats.split(':')[0]
                                    if (starts >= Number(zone.value)) {
                                        formCount++
                                    }
                                }
                            })
                            if (races?.raceDetails?.length === formCount) {
                                formData.push(races)
                            }
                        }
                    })

                } else {
                    formData = distanceData
                }

                let wins = []
                if (zone.rule.id === 8) {
                    let fo = formData.map(races => {
                        if (races?.raceDetails?.length > 0) {
                            let formCount = 0
                            let crr = races.raceDetails.map(zone1 => {
                                if (zone1.career) {
                                    let stats = zone1.career.split('-')[0]
                                    let won = stats.split(':')[1]
                                    if (won >= Number(zone.value)) {
                                        formCount++
                                    }
                                }
                            })
                            if (races?.raceDetails?.length === formCount) {
                                wins.push(races)
                            }
                        }
                    })

                } else {
                    wins = formData
                }

                let oddsData = []
                if (zone.rule.id === 9) {
                    let odd = wins.map(races => {
                        if (races?.raceDetails?.length > 0) {
                            if (races?.raceDetails[0]?.ub_win >= parseFloat(zone.min) && races?.raceDetails[0]?.ub_win <= parseFloat(zone.max)) {
                                oddsData.push(races)
                            }
                        }
                    })

                } else {
                    oddsData = wins
                }

                let ratingData = []
                if (zone.rule.id === 10) {
                    oddsData.map(races => {
                        if (races.rating != null && races.rating <= parseFloat(zone.max) && races.rating >= parseFloat(zone.min)) {
                            ratingData.push(races)
                        }
                    })

                } else {
                    ratingData = oddsData
                }

                finalData = ratingData

            })

            return (finalData)
        } else {
            return (props.futureTips?.races)
        }
    }

    var filteredData = filter()
    return (
        <div style={{ marginTop: 14 }}>
            {props.loading === true ?
                <LoadingNew />
                :
                <div>
                <div style={{ backgroundColor: 'white', }}>
                        <div style={{ padding: 12, paddingBottom: 20, borderBottomStyle: 'dashed', borderWidth: '2px' , display:'flex', justifyContent:'space-between' }}>
                            <Row style={{ marginLeft: 20, display: 'flex', alignItems: 'center' }}>
                                <Col xs={12} sm={12} md={1} style={{ fontSize: 13 }}> New Rule : </Col>

                                <Col style={styles.margins}>
                                    <Select
                                        value={addNewRule.rule}
                                        onChange={(e) => { handleRuleChange(e) }}
                                        options={ruleOptions}
                                        isSearchable={false}

                                        styles={colourStylesSquare}
                                        theme={theme => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#142841',
                                                primary25: '#DDE1E5',
                                                neutral20: '#142841',
                                                neutral50: '#142841',
                                                neutral60: '#142841',
                                                neutral80: '#142841',
                                            },
                                        })}
                                    />
                                </Col>

                                <Col style={styles.margins}>
                                    <div style={{
                                        textAlign: 'center',
                                        borderRadius: 20,
                                        border: 'solid 1px #142841',
                                        color: '#142841',
                                        backgroundColor: '#DDE1E5',
                                        padding: 10,
                                        fontWeight: 600,
                                        marginTop:6,
                                        width:'220px'
                                    }}>
                                        {addNewRule.condition ? addNewRule.condition : 'is equal'}
                                    </div>
                                </Col>
                                {
                                    conditions?.isBetween?.includes(addNewRule?.rule?.id) === true ?

                                        <Row style={{ margin:0 , padding:0 , display:'flex', justifyContent:'center'}}>
                                        <Col style={styles.margins}>
                                            <input style={{ padding: 6,
                                                            marginTop:6,
                                                            width:'220px'}} 
                                                 name='min' placeholder='Enter Min Value' type='number'
                                                onChange={(e) => { setAddNewRule({ ...addNewRule, min: e.target.value }) }} value={addNewRule.min} >
                                            </input>
                                            </Col>
                                            <Col style={styles.margins}>
                                            <div style={{
                                                textAlign: 'center',
                                                borderRadius: 20,
                                                border: 'solid 1px #142841',
                                                color: '#142841',
                                                backgroundColor: '#DDE1E5',
                                                padding: 10,
                                                fontWeight: 600,
                                                marginTop:6,
                                                width:'220px'
                                            }}>
                                                and
                                            </div>
                                            </Col>

                                            <Col style={styles.margins}>
                                            <input style={{ padding: 6 ,
                                                            marginTop:6,
                                                            width:'220px'
                                                            }}
                                         name='max' placeholder='Enter Max Value' type='number'
                                                onChange={(e) => { setAddNewRule({ ...addNewRule, max: e.target.value }) }} value={addNewRule.max}>
                                            </input>
                                            </Col>

                                        </Row>

                                        :

                                        <Col style={styles.margins}>
                                            {conditions?.dropDowns?.includes(addNewRule?.rule?.id) === true ?

                                                <Select
                                                    value={addNewRule.value}
                                                    onChange={(e) => { setAddNewRule({ ...addNewRule, value: e }) }}
                                                    options={handleDropdownOptions(addNewRule.rule.id)}
                                                    styles={colourStylesSquare}
                                                    theme={theme => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: '#142841',
                                                            primary25: '#DDE1E5',
                                                            neutral20: '#142841',
                                                            neutral50: '#142841',
                                                            neutral60: '#142841',
                                                            neutral80: '#142841',
                                                        },
                                                    })}
                                                />

                                                :
                                                
                                                <input style={{ padding: 6 , marginTop:6 , width:'200px' }} name='value' placeholder='Enter Value' type='number'
                                                    onChange={(e) => { setAddNewRule({ ...addNewRule, value: e.target.value }) }} value={addNewRule.value}>
                                                </input>
                                            }
                                        </Col>
                                }


                                <Col  style={styles.margins}>
                                    <div style={{
                                        color: 'white',
                                        backgroundColor: '#142841',
                                        borderRadius: 12,
                                        textAlign: 'center',
                                        padding: 6,
                                        cursor: 'pointer' ,
                                        marginTop:6
                                    }}
                                        onClick={() => { addRule() }}
                                    >
                                        + Add Rule
                                    </div>

                                </Col>

                                {addRuleError === true ?   <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
                                <img src={Warning} style={{ height: 20, width: 20 }} />
                                <p style={{ color: 'red', marginLeft: 8 }}>Error Adding Rule please make sure all fields are filled</p>
                            </div>
                            :
                                null
                            }
                            </Row>
                           
                            <img src={Clear} style={{width:22,height:22 , cursor:'pointer'}} onClick={()=>{handleClearRules()}}/>
                        </div>

                        {activeRules.map((zone, i) => {
                            return (
                                <div key={i}>
                                    {i > 0 ? <hr /> : null}
                                    <div style={{ padding: 8, display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginLeft: 8, marginRight: 8, cursor: 'pointer' }} onClick={() => {
                                            handleRemoveRule(zone.rule, i)
                                        }}>
                                            <img src={Close} style={{ width: '12px', height: '12px' }} />
                                        </div>

                                        <div style={{ textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8 }}>
                                            {zone?.rule?.label}
                                        </div>

                                        <div style={{ border: 'solid 2px #142841', padding: '6px 8px 6px 8px', textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8, borderRadius: 20 }}>
                                            {zone?.condition}
                                        </div>

                                        {zone.condition === 'is between' ?
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8 }}>
                                                    {zone?.min}
                                                </div>
                                                <div style={{ border: 'solid 2px #142841', padding: '6px 8px 6px 8px', textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8, borderRadius: 20 }}>
                                                    and
                                                </div>
                                                <div style={{ textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8 }}>
                                                    {zone?.max}
                                                </div>
                                            </div>

                                            :

                                            <div style={{ textAlign: 'center', color: '#142841', marginLeft: 8, marginRight: 8 }}>
                                                {(zone.value !== null && zone.value != 'undefined' && isObject(zone.value) === true) ? zone.value.label : zone.value}
                                            </div>}

                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    
                    <Row style={{padding: 8 , marginLeft:0 , marginRight:0 , display:'flex' , justifyContent:'center' }}>
                                    { filteredData ?  filteredData?.map((element, i) => {
                                        return (
                                            <Link key={i} to={`/horse-racing-tips/${element?.meetdate}/${element?.track_name}/R${element?.race_num}/${element?.point_id}`} style={{marginLeft:8 , marginRight:8}}>
                                                <div  style={{ marginTop: 12, backgroundColor: 'white', padding: 8, borderRadius: 4, minWidth: 300 }}>
                                                    {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')}</Badge>
                                                        <p style={{ marginLeft: 4, color: 'grey' }}>at {element?.race_time?.split(':')[0]}:{element?.race_time?.split(':')[1]}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', marginTop: 8 }}>
                                                        <h3 style={{ color: 'black', fontWeight: 'bold' }}>{element?.track_name} R{element?.race_num}</h3>
                                                        <p>{element?.track_description}</p>
                                                        {/* <p>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</p> */}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }) : <p style={{ marginTop: 24, opacity: '50%' }}>No Upcoming races</p>}
                                </Row>

                </div>
            }
        </div>
    )
}


const styles = {
    margins: {
        marginLeft: 4,
        marginRight: 4 , 
    }
}

const mapStateToProps = state => ({
    futureTips: state.selectionReducer.dataFuture,
    loading: state.selectionReducer.futureTipsLoading
})

const mapDispatchToProps = (dispatch) => ({
    getFutureTips: () => dispatch(actions.getFutureTips()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchFilter));
