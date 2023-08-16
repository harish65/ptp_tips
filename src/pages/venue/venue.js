import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment-timezone';

import LoadingNew from '../../components/loading/LoadingNew'
/* REDUX */
import actions from '../../redux/actions/venue';
import HorseTable from './Components/HorseTable';

class Venue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            innerWidth: window.innerWidth,
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener("resize", this.handleResize);
        const { dispatch } = this.props;
        // dispatch(actions.fetchHome());
        dispatch(actions.getRacesInVenue({ trackName: this.props.match.params.venue, meetdate: moment(this.props.match.params.date, "DD-MM-YYYY").format("YYYY-MM-DD") }))
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }


    handleResize = () => {
        this.setState({ innerWidth: window.innerWidth });
    }

    render() {

        return (
            <div style={{ marginTop: 32 }}>
                {this.props.loading === true ? <LoadingNew /> :
                    this.props.venues?.map((zone, i) => {
                        return (<div style={styles.divisions} key={i}>
                            <HorseTable venues={zone.venues} horses={zone.horses} trackInfo={zone.trackInfo} generationTime={zone.generationTime} />
                        </div>)
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    venues: state.venuesReducer.venues,
    loading: state.venuesReducer.venuesLoading,

})

const styles = {
    divisions: {
        marginTop: 6,
        margiBottom: 6,
    }
}
export default withRouter(connect(mapStateToProps)(Venue));
