import React from 'react'
import { connect } from 'react-redux'
//Components

//REDUX
import "./TopPerformingCard.scss"
import TopPerformingHorse from './TopPerformingHorse'
import TopPerformingJockey from './TopPerformingJockey'
import TopPerformingVenue from './TopPerformingVenue'

export const TopPerforming = (props) => {

    return (
        <div style={{ marginTop: "20px" }}>
            <TopPerformingHorse />
            <TopPerformingJockey />
            <TopPerformingVenue />
        </div>
    )
}



const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps)(TopPerforming)
