import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Table } from "reactstrap"
import { Helmet } from 'react-helmet';

import moment from 'moment-timezone'
import LoadingNew from '../../components/loading/LoadingNew'
import { checkRouteDate } from '../../config/utils';
/* REDUX */
import profileAction from "../../redux/actions/profiles"
import "./tableStyle.css"


class TrainerProfile extends React.Component {
    constructor(props) {
        super()

    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(profileAction.getProfileTainer({ trainerID: this.props.match.params.trainerId, trainer_name: this.props.match.params.trainer_name }))
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps){
        // console.log(this.props, prevProps)
        if(this.props.match.params?.trainerId !== prevProps.match.params?.trainerId){
            const { dispatch } = this.props;
            dispatch(profileAction.getProfileTainer({ trainerID: this.props.match.params.trainerId,
                trainer_name: this.props.match.params.trainer_name }))
            window.scrollTo(0, 0);
        }
    }

    renderTable() {
        const data = this.props?.trainerProfile?.trackStats?.map((index, i) => {
            return (
                <tr key={i}>
                    <td><Link to={`/profile/venue/${index?.TRACKCODE}`}>{index?.TRACKCODE}</Link></td>
                    <td>{index?.runs}</td>
                    <td>{index?.wins}</td>
                    <td>{index?.secnds}</td>
                    <td>{index?.thirds}</td>
                    <td>{(((index?.wins) / (index?.runs)) * 100).toFixed(2)}</td>
                    <td>{((((index?.wins) + (index?.secnds) + (index?.thirds)) / (index?.runs)) * 100).toFixed(2)}</td>
                    <td>{((index?.wonOdd) / (index?.wins)).toFixed(2)}</td>
                    <td>{((index?.plcOdd) / ((index?.wins) + (index?.secnds) + (index?.thirds))).toFixed(2)}</td>
                </tr>
            )
        });

        return (
            <Table striped responsive className="profile_table_style">
                <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                    <tr>
                        <th>Track</th>
                        <th>Runs</th>
                        <th>Won</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Win%</th>
                        <th>Place%</th>
                        <th>Win$</th>
                        <th>Place$</th>
                    </tr>
                </thead>

                <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    {data}
                </tbody>

            </Table>
        )
    }
    renderTable2() {
        const data = this.props?.trainerProfile?.jockeysStats?.map((index, i) => {
            return (
                <tr key={i}>
                    <td><Link to={`/profile/jockey/${index.jockey_id}/${index?.real_jockey_name?.split(" ").join("-")}`}>
                        {index?.jockey_name}
                    </Link>
                    </td>
                    <td>{index?.runs}</td>
                    <td>{index?.wins}</td>
                    <td>{index?.secnds}</td>
                    <td>{index?.thirds}</td>
                    <td>{(((index?.wins) / (index?.runs)) * 100).toFixed(2)}</td>
                    <td>{((((index?.wins) + (index?.secnds) + (index?.thirds)) / (index?.runs)) * 100).toFixed(2)}</td>
                    <td>{((index?.wonOdd) / (index?.wins)).toFixed(2)}</td>
                    <td>{((index?.plcOdd) / ((index?.wins) + (index?.secnds) + (index?.thirds))).toFixed(2)}</td>
                </tr>
            )
        });

        return (
            <Table striped responsive className="profile_table_style">
                <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                    <tr>
                        <th>Jockey</th>
                        <th>Runs</th>
                        <th>Won</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Win%</th>
                        <th>Place%</th>
                        <th>Win$</th>
                        <th>Place$</th>
                    </tr>
                </thead>

                <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    {data}
                </tbody>

            </Table>
        )
    }
    render() {
        return (
            <div style={styles.page}>

                <h1>TRAINER PROFILE</h1>
                {this.props.loading === true ? <LoadingNew /> :
                    this.props.trainerProfile?.trainer?.length > 0 ?
                        <div>
                             <Helmet>
                <title>
                {this.props?.trainerProfile?.trainer[0]?.trainer_name} | Horse Racing Trainer Profile
                </title>
                <meta
            name="description"
            content="Horse Racing Trainer profile, stats and information about career, track and venues stats !"
          />

                    </Helmet>
                            <Row>
                                <h1>{this.props?.trainerProfile?.trainer[0]?.trainer_name}</h1>
                            </Row>
                            <Row style={styles.card}>
                                <Col>
                                    <div>
                                        Best Horse :<Link to={`/profile/horse/${this.props?.trainerProfile?.bestHorse[0]?.horse_id}/${this.props?.trainerProfile?.bestHorse[0]?.horse_name?.split(" ").join("-")}`}>
                                            {this.props?.trainerProfile?.bestHorse[0]?.horse_name}
                                        </Link>
                                    </div>
                                    <div>
                                        Best Jockey :<Link to={`/profile/jockey/${this.props?.trainerProfile?.bestJockey[0]?.jockey_id}/${this.props?.trainerProfile?.bestJockey[0]?.real_jockey_name?.split(" ").join("-")}`}>
                                            {this.props?.trainerProfile?.bestJockey[0]?.jockey_name}
                                        </Link>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        Showing Data from :{this.props?.trainerProfile?.trainer[0]?.startdate}
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <h2>Career Stats</h2>
                            </Row>
                            <Row style={styles.card}>
                                <Col>
                                    RUNS :{this.props?.trainerProfile?.careerStats[0]?.runs}
                                </Col>
                                <Col>
                                    WON:{this.props?.trainerProfile?.careerStats[0]?.wins}
                                </Col>
                                <Col>
                                    SECOND :{this.props?.trainerProfile?.careerStats[0]?.secnds}
                                </Col>
                                <Col>
                                    THIRD :{this.props?.trainerProfile?.careerStats[0]?.thirds}
                                </Col>
                                <Col>
                                    WIN%:{((this.props?.trainerProfile?.careerStats[0]?.wins / this.props?.trainerProfile?.careerStats[0]?.runs) * 100).toFixed(2)}
                                </Col>
                                <Col>
                                    PLACE%:{((((this.props?.trainerProfile?.careerStats[0]?.wins) + (this.props?.trainerProfile?.careerStats[0]?.secnds) + (this.props?.trainerProfile?.careerStats[0]?.thirds)) / (this.props?.trainerProfile?.careerStats[0]?.runs)) * 100).toFixed(2)}
                                </Col>
                                <Col>
                                    AVGWIN$:{(this.props?.trainerProfile?.careerStats[0]?.wonOdd / this.props?.trainerProfile?.careerStats[0]?.wins).toFixed(2)}
                                </Col>
                                <Col>
                                    AVGPLACE$:{(this.props?.trainerProfile?.careerStats[0]?.plcOdd / ((this.props?.trainerProfile?.careerStats[0]?.wins) + (this.props?.trainerProfile?.careerStats[0]?.secnds) + (this.props?.trainerProfile?.careerStats[0]?.thirds))).toFixed(2)}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <h2>Last 12 Month Stats</h2>
                            </Row>
                            <Row style={styles.card}>
                                <Col>
                                    RUNS :{this.props?.trainerProfile?.last12monthStats[0]?.runs}
                                </Col>
                                <Col>
                                    WON:{this.props?.trainerProfile?.last12monthStats[0]?.wins}
                                </Col>
                                <Col>
                                    Second :{this.props?.trainerProfile?.last12monthStats[0]?.secnds}
                                </Col>
                                <Col>
                                    Third :{this.props?.trainerProfile?.last12monthStats[0]?.thirds}
                                </Col>
                                <Col>
                                    WIN%:{((this.props?.trainerProfile?.last12monthStats[0]?.wins / this.props?.trainerProfile?.last12monthStats[0]?.runs) * 100).toFixed(2)}
                                </Col>
                                <Col>
                                    PLACE%:{((((this.props?.trainerProfile?.last12monthStats[0]?.wins) + (this.props?.trainerProfile?.last12monthStats[0]?.secnds) + (this.props?.trainerProfile?.last12monthStats[0]?.thirds)) / (this.props?.trainerProfile?.last12monthStats[0]?.runs)) * 100).toFixed(2)}
                                </Col>
                                <Col>
                                    AVGWIN$:{(this.props?.trainerProfile?.last12monthStats[0]?.wonOdd / this.props?.trainerProfile?.last12monthStats[0]?.wins).toFixed(2)}
                                </Col>
                                <Col>
                                    AVGPLACE$:{(this.props?.trainerProfile?.last12monthStats[0]?.plcOdd / ((this.props?.trainerProfile?.last12monthStats[0]?.wins) + (this.props?.trainerProfile?.last12monthStats[0]?.secnds) + (this.props?.trainerProfile?.last12monthStats[0]?.thirds))).toFixed(2)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Row style={{ marginTop: "20px" }}>
                                        <h2>Track Stats</h2>
                                    </Row>
                                    <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                        {this.renderTable()}
                                    </Row>
                                </Col>
                                <Col style={{ marginLeft: "12px" }}>
                                    <Row style={{ marginTop: "20px" }}>
                                        <h2>Jockey Stats</h2>
                                    </Row>
                                    <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                        {this.renderTable2()}
                                    </Row>
                                </Col>
                            </Row>
                            {this.props?.trainerProfile?.upcomingRaces?.length > 0 ? <div><Row style={{ marginTop: "20px" }}>
                                <h2>Upcoming Races</h2>
                            </Row>
                                <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                    <Table striped responsive >
                                        <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Track</th>
                                                <th>Number</th>
                                                <th>Condition</th>
                                                <th>description</th>
                                                <th>distance</th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>

                                            {this.props?.trainerProfile?.upcomingRaces?.map((index, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {index?.meetdate}
                                                        </td>
                                                        <td>
                                                            {index?.race_time}
                                                        </td>
                                                        <td>
                                                            <Link to={`/horse-racing-tips/${checkRouteDate(moment(index?.meetdate, "YYYY-MM-DD").format('DD-MM-YYYY'))}/${index?.track_name}/R${index?.race_num}/${index.point_id}`}>
                                                                {index?.track_name}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {index?.race_num}
                                                        </td>
                                                        <td>
                                                            {index?.track_condition}
                                                        </td>
                                                        <td>
                                                            {index?.track_description}
                                                        </td>
                                                        <td>
                                                            {index?.track_distance}
                                                        </td>
                                                    </tr>
                                                )

                                            })
                                            }

                                        </tbody>

                                    </Table>
                                </Row></div> : null}
                            {this.props?.trainerProfile?.runsDetails?.length > 0 ? <div>
                                <Row style={{ marginTop: "20px" }}>
                                    <h2>Runs Details</h2>
                                </Row>
                                <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                    <Table striped responsive >
                                        <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Venue</th>
                                                <th>Race Num</th>
                                                <th>Description</th>
                                                <th>Horse Name</th>
                                                <th>Jockey Name</th>
                                                <th>Position</th>

                                            </tr>
                                        </thead>

                                        <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                            {this.props?.trainerProfile?.runsDetails?.map((index, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {index?.MEETDATE}
                                                        </td>
                                                        <td>
                                                            {index?.TRACKCODE}
                                                        </td>
                                                        <td>
                                                            {index?.RACENUM}
                                                        </td>
                                                        <td>
                                                            {index?.RACENAME}
                                                        </td>
                                                        <td>
                                                            {index?.horse_name}
                                                        </td>
                                                        <td>
                                                            {index?.jockey_name}
                                                        </td>
                                                        <td>
                                                            {index?.PLACE}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Row>
                            </div> : null}

                            {this.props?.trainerProfile?.runsWonDetails?.length > 0 ? <div>
                                <Row style={{ marginTop: "20px" }}>
                                    <h2>Won Races Details</h2>
                                </Row>
                                <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                    <Table striped responsive >
                                        <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Venue</th>
                                                <th>Race Num</th>
                                                <th>Description</th>
                                                <th>Horse Name</th>
                                                <th>Jockey Name</th>
                                                <th>Position</th>

                                            </tr>
                                        </thead>

                                        <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                            {this.props?.trainerProfile?.runsWonDetails?.map((index, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {index?.MEETDATE}
                                                        </td>
                                                        <td>
                                                            {index?.TRACKCODE}
                                                        </td>
                                                        <td>
                                                            {index?.RACENUM}
                                                        </td>
                                                        <td>
                                                            {index?.RACENAME}
                                                        </td>
                                                        <td>
                                                            {index?.horse_name}
                                                        </td>
                                                        <td>
                                                            {index?.jockey_name}
                                                        </td>
                                                        <td>
                                                            {index?.PLACE}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Row>
                            </div> : null}


                            {this.props?.trainerProfile?.ptpRacesDetails?.length > 0 ? <div>
                                <Row style={{ marginTop: "20px" }}>
                                    <h2>PTP Results</h2>
                                </Row>
                                <Row style={styles.card}>
                                    <Col>
                                        Runs :{this.props?.trainerProfile?.ptpStats[0]?.ptpRaces}
                                    </Col>
                                    <Col>
                                        Won:{this.props?.trainerProfile?.ptpStats[0]?.ptpWon}
                                    </Col>
                                    <Col>
                                        Second:{this.props?.trainerProfile?.ptpStats[0]?.ptpscnd}
                                    </Col>
                                    <Col>
                                        Third:{this.props?.trainerProfile?.ptpStats[0]?.ptpThird}
                                    </Col>
                                    <Col>
                                        AVG WIN:%{((this.props?.trainerProfile?.ptpStats[0]?.ptpWon / this.props?.trainerProfile?.ptpStats[0]?.ptpRaces) * 100)?.toFixed(2)}
                                    </Col>
                                    <Col>
                                        AVG PLC:%{(((this.props?.trainerProfile?.ptpStats[0]?.ptpWon + this.props?.trainerProfile?.ptpStats[0]?.ptpscnd + this.props?.trainerProfile?.ptpStats[0]?.ptpThird) / this.props?.trainerProfile?.ptpStats[0]?.ptpRaces) * 100)?.toFixed(2)}
                                    </Col>
                                    <Col>
                                        AVG WIN$:{(this.props?.trainerProfile?.ptpStats[0]?.totWin / this.props?.trainerProfile?.ptpStats[0]?.ptpWon).toFixed(2)}
                                    </Col>
                                    <Col>
                                        AVG PLC$:{(this.props?.trainerProfile?.ptpStats[0]?.totPlace / (this.props?.trainerProfile?.ptpStats[0]?.ptpWon + this.props?.trainerProfile?.ptpStats[0]?.ptpscnd + this.props?.trainerProfile?.ptpStats[0]?.ptpThird)).toFixed(2)}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "8px", maxHeight: "250px", display: 'flex', flexDirection: "column" }}>
                                    <Table striped responsive >
                                        <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Track</th>
                                                <th>Number</th>
                                                <th>Condition</th>
                                                <th>description</th>
                                                <th>distance</th>
                                                <th>position</th>
                                                <th>PTP Result</th>
                                                <th>horse</th>
                                                <th>jockey</th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                            {this.props?.trainerProfile?.ptpRacesDetails?.map((index, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {index?.meetdate}
                                                        </td>
                                                        <td>
                                                            {index?.race_time}
                                                        </td>
                                                        <td>
                                                            <Link to={`/horse-racing-tips/${checkRouteDate(moment(index?.meetdate, "YYYY-MM-DD").format('DD-MM-YYYY'))}/${index?.track_name}/R${index?.race_num}/${index.point_id}`}>
                                                                {index?.track_name}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {index?.race_num}
                                                        </td>
                                                        <td>
                                                            {index?.track_condition}
                                                        </td>
                                                        <td>
                                                            {index?.track_description}
                                                        </td>
                                                        <td>
                                                            {index?.track_distance}
                                                        </td>
                                                        <td>
                                                            {index?.position}
                                                        </td>
                                                        <td>
                                                            {index?.result}
                                                        </td>
                                                        <td>
                                                            {index?.horse_id !== null ? <Link to={`/profile/horse/${index?.horse_id}/${index?.horse_name?.split(" ").join("-")}`}> {index?.horse_name}</Link> : index?.horse_name}
                                                        </td>
                                                        <td>
                                                            {index?.jockey_id !== null ? <Link to={`/profile/jockey/${index?.jockey_id}/${index?.horse_jockey?.split(" ").join("-")}`}>{index?.horse_jockey}</Link> : index?.horse_jockey}
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Row>
                            </div> : null}

                        </div> : null
                }
            </div>
        );
    }
}

const styles = {
    page: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "18px",
        marginRight: "18px",
        paddingBottom: 32,
    },
    card: {
        backgroundColor: "white",
        padding: "22px 12px",
        maxWidth: "900px",
        borderRadius: "8px",
        boxShadow: "10px 10px 5px grey",
    },
}
const mapStateToProps = state => ({
    trainerProfile: state.profilesReducer.trainerProfile,
    loading: state.profilesReducer.trainerProfileLoading,
})
export default withRouter(connect(mapStateToProps)(TrainerProfile));
