import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./style.scss"
import BestPerformingTable from "./components/BestPerformingTable"
class bestPerformingHorseDetails extends Component {
    render() {
        return (
            <div style={{ marginTop: "20px", padding: 10 }}>
                <div>
                    <div style={styles.headerLine}>
                    </div>
                    <h1 style={styles.header}>
                        Best Performing Horse
                    </h1>
                </div>
                <BestPerformingTable />
            </div>
        )
    }
}


const styles = {
    header: {
        color: "rgb(20, 40, 65)"
    },
    headerLine: {
        backgroundColor: "rgb(20, 40, 65)",
        width: "120px", height: "5px"
    },
}


  
const mapStateToProps = (state) => ({
    bestPerformingHorseDetails: state.profilesReducer.bestPerformingHorseDetails,
    bestPerformingHorseDetailsLoading: state.profilesReducer.bestPerformingHorseDetailsLoading,
})

export default connect(mapStateToProps)(bestPerformingHorseDetails)
