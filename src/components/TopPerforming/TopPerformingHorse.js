import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
//Components
import LoadingNew from "../loading/LoadingNew"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead, } from '@fortawesome/free-solid-svg-icons'

//REDUX
import profileActions from "../../redux/actions/profiles"
import "./TopPerformingCard.scss"
import { Link } from 'react-router-dom';

export const TopPerformingHorse = (props) => {
    const [selected, SetSelected] = useState("today")
    const [PTP, SetPTP] = useState(false)
    useEffect(() => {
        props.dispatch(profileActions.bestPerformingHorse({type:"regular",date:"today",user:"horse",limit:"regular"}));
    }, [])
    useEffect(() => {
        getData()
    }, [PTP])
    useEffect(() => {
        getData()
    }, [selected])
    

const getData =()=>{
    let type
    if(PTP===true){
        type='ptp'
    }else{
        type='regular'
    }
    props.dispatch(profileActions.bestPerformingHorse({type:type,date:selected,user:"horse",limit:"regular"}));

}
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {/* {props.bestPerformingHorseLoading === true ? <LoadingNew /> : */}
                    <div className="top_performing_wrapper" style={{ position: "relative" }}>
                        <div style={{ paddingTop: "4px" }}>
                            <div className="bluebgColor" style={{ width: "120px", height: "5px" }}></div>
                            <h2 className="blueColor">Best Performing Horses</h2>
                        </div>

                        {props.bestPerformingHorseLoading===true? <LoadingNew /> :
                        
                            <div>
                            {props.bestPerformingHorse?.data?.length > 0 ?
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ flex: 0.3 }}>

                                        </div>
                                        <div style={{ display: "flex", flex: 0.7 }}>
                                            <div style={styles.allign}>Runs</div>
                                            <div style={styles.allign}>WIN</div>
                                            <div style={styles.allign}>%</div>
                                            <div style={styles.allign}>$</div>
                                            <div style={styles.allign}>PLC</div>
                                            <div style={styles.allign}>%</div>
                                            <div style={styles.allign}>$</div>
                                        </div>
                                    </div>
                                    {props.bestPerformingHorse?.data?.map((zone, i) => {
                                        return (<div style={{ display: "flex" }} key={i}>
                                            <div style={{ display: "flex", flex: 0.3 }}>
                                                <FontAwesomeIcon style={{ color: "#BBC1E1", marginRight: "4px", marginTop: "2px" }} icon={faHorseHead} size="sm" />
                                                <div>{zone?.horse_name}</div>
                                            </div>
                                            <div style={{ display: "flex", flex: 0.7 }}>
                                                <div style={styles.allign}>{zone?.runs}</div>
                                                <div style={styles.allign}>{zone?.won}</div>
                                                <div style={styles.allign}>{((zone?.won / zone?.runs) * 100)?.toFixed(2)}</div>
                                                <div style={styles.allign}>{zone?.winOdd?.toFixed(2)}</div>
                                                <div style={styles.allign}>{zone?.place}</div>
                                                <div style={styles.allign}>{((zone?.place / zone?.runs) * 100)?.toFixed(2)}</div>
                                                <div style={styles.allign}>{zone?.placeOdd?.toFixed(2)}</div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                                : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "35px" }}>
                                    <h3>
                                        No data Available
                                    </h3>
                                </div>}

                        </div>}

                        <div style={styles.optionsPosition} >
                            <div style={styles.radioContainer}>
                                <div className="profileCheckBox" style={{ display: "flex" }}>
                                    <label style={{ marginRight: "4px" }}>{"PTP   "}</label>
                                    <input checked={PTP} onChange={() => { SetPTP(!PTP) }} id='ptp' type="checkbox" className="switch" />
                                </div>
                                <div>
                                    <Link to="/topPerfomingHorse">View more</Link>
                                </div>
                                <div style={styles.options}>
                                    <div style={styles.radio} >
                                        <input checked={selected === "today"} onChange={(e) => { SetSelected(e.target.name)  }} type="radio" name="today"></input>
                                        <label>Today</label>
                                    </div>
                                    <div style={styles.radio} >
                                        <input checked={selected === "last30"} onChange={(e) => { SetSelected(e.target.name) }} type="radio" name="last30"></input>
                                        <label>30 D</label>
                                    </div>
                                    <div style={styles.radio} >
                                        <input checked={selected === "month6"} onChange={(e) => { SetSelected(e.target.name) }} type="radio" name="month6"></input>
                                        <label>6 Mo</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
        </div>
    )
}

const styles = {
    radio: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "4px",
        paddingRight: "4px",
    },

    radioContainer: {
        paddingLeft: "12px",
        paddingRight: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    options: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    optionsPosition: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    allign: {
        flex: "0.15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

const mapStateToProps = (state) => ({
    bestPerformingHorse: state.profilesReducer.bestPerformingHorse,
    bestPerformingHorseLoading: state.profilesReducer.bestPerformingHorseLoading,
})


export default connect(mapStateToProps)(TopPerformingHorse)


