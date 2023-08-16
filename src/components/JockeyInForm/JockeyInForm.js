import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingNew from "../loading/LoadingNew"
import actions from "../../redux/actions/profiles"

class JockeyInForm extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        this.props.dispatch(actions.getInFormJockey({}))
    }
    render() {
        return (
            <div>
                <h1>Jockey In Form</h1>
                {
                    this.props.loading === true ? <LoadingNew /> :
                        this.props.jockeyInForm?.alltime?.length > 0 ?
                            <div>
                                <h2>Today {this.props.jockeyInForm?.today[0]?.runs === 0 ? 'N/A' : this.props.jockeyInForm?.today[0]?.horse_jockey}</h2>
                                {this.props.jockeyInForm?.today[0]?.runs === 0 ? null : <div>
                                    <h4>Runs {" " + this.props.jockeyInForm?.today[0]?.runs} </h4>
                                    <h4>Wins {" " + this.props.jockeyInForm?.today[0]?.wins} </h4>
                                    <h4>Win% {" " + ((this.props.jockeyInForm?.today[0]?.wins / this.props.jockeyInForm?.today[0]?.runs) * 100).toFixed(2)} </h4>
                                </div>}
                                <h2>This Month {" " + this.props.jockeyInForm?.thisMonth[0]?.horse_jockey}</h2>
                                <h4>Runs {" " + this.props.jockeyInForm?.thisMonth[0]?.runs}</h4>
                                <h4>Wins {" " + this.props.jockeyInForm?.thisMonth[0]?.wins}</h4>
                                <h4>Win% {" " + ((this.props.jockeyInForm?.thisMonth[0]?.wins / this.props.jockeyInForm?.thisMonth[0]?.runs) * 100).toFixed(2)}</h4>
                                <h2>All Time {" " + this.props.jockeyInForm?.alltime[0]?.horse_jockey}</h2>
                                <h4>Runs {" " + this.props.jockeyInForm?.alltime[0]?.runs}</h4>
                                <h4>Wins {" " + this.props.jockeyInForm?.alltime[0]?.wins}</h4>
                                <h4>Win% {" " + ((this.props.jockeyInForm?.alltime[0]?.wins / this.props.jockeyInForm.alltime[0]?.runs) * 100).toFixed(2)}</h4>

                            </div>
                            : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    jockeyInForm: state.profilesReducer.jockeyInForm,
    loading: state.profilesReducer.jockeyInFormLoading,
})


export default connect(mapStateToProps)(JockeyInForm)
