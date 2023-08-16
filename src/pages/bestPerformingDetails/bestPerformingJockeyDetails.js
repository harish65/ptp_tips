import React, { Component } from 'react'
import { connect } from 'react-redux'
import profileActions from "../../redux/actions/profiles"
import { Table } from 'antd';

import "./style.scss"
import LoadingNew from '../../components/loading/LoadingNew';
import  BestPerformingJockeyTable  from './components/BestPerformingJockeyTable';

class bestPerformingJockeyDetails extends Component {
    render() {
        return (
            <div style={{ marginTop: "20px", padding: 10 }}>
                <div>
                    <div style={styles.headerLine}>

                    </div>
                    <h1 style={styles.header}>
                        Best Performing Jockey
                </h1>
                </div>
               

               <BestPerformingJockeyTable/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bestPerformingJockeyDetails: state.profilesReducer.bestPerformingJockeyDetails,
    bestPerformingJockeyDetailsLoading: state.profilesReducer.bestPerformingJockeyDetailsLoading,
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
export default connect(mapStateToProps)(bestPerformingJockeyDetails)
