import React, { Component } from 'react'
import AnalyticsFilter from '../../components/AnalyticsFilter/AnalyticsFilter'
import JockeyInForm from '../../components/JockeyInForm/JockeyInForm'

export default class Filter extends Component {
    render() {
        return (
            <div style={{ marginTop: "32px" }}>
                <AnalyticsFilter />
                <div style={{ marginTop: "20px" }}>
                    <JockeyInForm />
                </div>
            </div>
        )
    }
}
