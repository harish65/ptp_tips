import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./style.scss"
import  BestPerformingVenueTable  from './components/BestPerformingVenueTable';

class bestPerformingVenueDetails extends Component {
    render() {
        return (
            <div style={{ marginTop: "20px", padding: 10 }}>
                <div>
                    <div style={styles.headerLine}>

                    </div>
                    <h1 style={styles.header}>
                        Best Performing Venue
                </h1>
                </div>
                <BestPerformingVenueTable/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    bestPerformingVenueDetails: state.profilesReducer.bestPerformingVenueDetails,
    bestPerformingVenueDetailsLoading: state.profilesReducer.bestPerformingVenueDetailsLoading,
})

const styles = {
    header: {
        color: "rgb(20, 40, 65)"
    },
    headerLine: {
        backgroundColor: "rgb(20, 40, 65)",
        width: "120px", height: "5px"
    },
}
export default connect(mapStateToProps)(bestPerformingVenueDetails)
