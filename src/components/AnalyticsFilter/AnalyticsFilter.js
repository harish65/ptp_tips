import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Col, Row, Modal } from 'reactstrap';
import moment from 'moment-timezone';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import s from './AnalyticsFilter.scss';
import LoadingNew from "../loading/LoadingNew"

import actions from '../../redux/actions/racesAnalytics';
import { ConvertUTCTimeToLocalTime1 } from '../../config/utils';


class AnalyticsFilter extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayClick2 = this.handleDayClick2.bind(this);
        this.state = {
            PTP: false,
            FAV: false,
            MM: false,
            over7: false,
            NoStarts: false,
            modalOpen: false,
            tracks: false,
            jockey: false,
            horse: false,
            trainer: false,
            date: this.dateSelector(1),
            firstDate: null,
            secondDate: null,
            current: 1,
            selected: [],
            selectedH: [],
            selectedJ: [],
            selectedT: [],
        };
    }

    componentWillMount() {
        this.props.dispatch(actions.getTracksUser({ months: this.state.date }))
    }
    handlePTP = () => {
        this.setState({ PTP: !this.state.PTP })
    }
    handleFAV = () => {
        this.setState({ FAV: !this.state.FAV })
    }
    handleMM = () => {
        this.setState({ MM: !this.state.MM })
    }
    handleOver7 = () => {
        this.setState({ over7: !this.state.over7 })
    }
    handleNoStarts = () => {
        this.setState({ NoStarts: !this.state.NoStarts })
    }
    handleTracks = () => {
        this.setState({ tracks: !this.state.tracks })
    }
    handleHorse = () => {
        this.setState({ horse: !this.state.horse })
    }
    handleJockey = () => {
        this.setState({ jockey: !this.state.jockey })
    }
    handleTrainer = () => {
        this.setState({ trainer: !this.state.trainer })
    }
    handleDate = (event) => {
        if (event.target.value == 9) {
            this.setState({
                modalOpen: true,
                current: 9
            })
        } else {
            this.setState({
                date: event.target.value,
                current: 1
            })
            this.props.dispatch(actions.getTracksUser({ months: event.target.value }))
            this.props.dispatch(actions.getHJTUser({ months: event.target.value, tracks: this.state.tracks, selectedTracks: this.state.selected }))
        }
    }
    handleSubmit = () => {
        this.props.dispatch(actions.getResultsUser({
            months: this.state.date, PTP: this.state.PTP, FAV: this.state.FAV, MM: this.state.MM, over7: this.state.over7,
            noStarts: this.state.NoStarts, horses: this.state.horse, jockeys: this.state.jockey, trainers: this.state.trainer, selectedH: this.state.selectedH,
            tracks: this.state.tracks, selectedTracks: this.state.selected, selectedJ: this.state.selectedJ, selectedT: this.state.selectedT
        }));
    }

    dateSelector = (type) => {
        let date
        let today = moment().tz('Australia/Sydney').format("YYYY-MM-DD")
        let yesterday = moment().tz('Australia/Sydney').subtract(1, 'day').format("YYYY-MM-DD")
        let beforeyesterday = moment().tz('Australia/Sydney').subtract(1, 'day').format("YYYY-MM-DD")
        let thisMonth = moment().tz('Australia/Sydney').format("YYYY-MM-01")
        let lastMonth = moment().tz('Australia/Sydney').subtract(1, 'month').format("YYYY-MM-01")
        let monthminus2 = moment().tz('Australia/Sydney').subtract(2, 'month').format("YYYY-MM-01")
        let monthminus3 = moment().tz('Australia/Sydney').subtract(3, 'month').format("YYYY-MM-01")
        if (type === 1) {
            date = "AND p.meetdate='" + today + "'"
            return (date)
        } else if (type === 2) {
            date = "AND p.meetdate='" + yesterday + "'"
            return (date)
        } else if (type === 3) {
            date = "AND p.meetdate='" + beforeyesterday + "'"
            return (date)
        } else if (type === 4) {
            date = "AND p.meetdate>='" + thisMonth + "'"
            return (date)
        } else if (type === 5) {
            date = "AND p.meetdate>='" + lastMonth + "' AND p.meetdate<'" + thisMonth + "'"
            return (date)
        } else if (type === 6) {
            date = "AND p.meetdate>='" + monthminus2 + "' AND p.meetdate<'" + lastMonth + "'"
            return (date)
        } else if (type === 7) {
            date = "AND p.meetdate>='" + monthminus3 + "' AND p.meetdate<'" + monthminus2 + "'"
            return (date)
        } else if (type === 8) {
            date = "AND p.meetdate>='2020-06-10'"
            return (date)
        } else if (type === 9) {
            // this.setState({modalOpen:true})
            return ("9")
        }
    }

    handleDayClick(day) {
        this.setState({ firstDate: day })
    }
    handleDayClick2(day) {
        this.setState({ secondDate: day })
    }
    handleCustomDate() {
        let today = ConvertUTCTimeToLocalTime1(moment().tz('Australia/Sydney').format("YYYY-MM-DD"))
        if (this.state.firstDate === null || this.state.secondDate === null) {
            this.setState({ date: "AND p.meetdate='" + today + "'" })
            this.setState({ modalOpen: false })
            this.props.dispatch(actions.getTracksUser({ months: "AND p.meetdate='" + today + "'" }))
            this.props.dispatch(actions.getHJTUser({ months: "AND p.meetdate='" + today + "'" }))

        } else {
            let firstDate = ConvertUTCTimeToLocalTime1(moment(this.state.firstDate).tz('Australia/Sydney').format("YYYY-MM-DD"))
            let secondDate = ConvertUTCTimeToLocalTime1(moment(this.state.secondDate).tz('Australia/Sydney').format("YYYY-MM-DD"))
            if (secondDate < firstDate) {
                this.setState({ date: "AND p.meetdate>='" + secondDate + "' AND p.meetdate<='" + firstDate + "'" })
                this.setState({ modalOpen: false })
                this.props.dispatch(actions.getTracksUser({ months: "AND p.meetdate>='" + secondDate + "' AND p.meetdate<='" + firstDate + "'" }))
                this.props.dispatch(actions.getHJTUser({ months: "AND p.meetdate>='" + secondDate + "' AND p.meetdate<='" + firstDate + "'" }))

            } else if (firstDate < secondDate) {
                this.setState({ date: "AND p.meetdate>='" + firstDate + "' AND p.meetdate<='" + secondDate + "'" })
                this.setState({ modalOpen: false })
                this.props.dispatch(actions.getTracksUser({ months: "AND p.meetdate>='" + firstDate + "' AND p.meetdate<='" + secondDate + "'" }))
                this.props.dispatch(actions.getHJTUser({ months: "AND p.meetdate>='" + firstDate + "' AND p.meetdate<='" + secondDate + "'" }))

            } else if (secondDate = firstDate) {
                this.setState({ date: "AND p.meetdate='" + firstDate + "'" })
                this.setState({ modalOpen: false })
                this.props.dispatch(actions.getTracksUser({ months: "AND p.meetdate='" + firstDate + "'" }))
                this.props.dispatch(actions.getHJTUser({ months: "AND p.meetdate='" + firstDate + "'" }))

            }
        }
    }

    renderSelectedPref(loading, data) {
        if (loading == true) {
            return (<LoadingNew />)
        } else {
            if (data.data == false) {
                return (<h1>No Data Available</h1>)
            } else if (data.avgPTP == null) {
                return (<div>
                    <Row>
                        <Col>WON :{data.count}</Col>
                        <Col>TOTAL :{data.tot}</Col>
                        <Col>Strike Rate:{data.avgWinPercent}%</Col>
                        <Col>AVG WIN $:{data.avgWin}$</Col>
                        <Col>AVG PLACE ${data.avgPlace}$</Col>
                    </Row>
                    <Row xl={12} lg={12}>{this.renderResultsList(data, 0)}</Row>
                </div>
                )
            } else {
                return (
                    <div>
                        <Row>
                            <Col>WON :{data.ptpWON}</Col>
                            <Col>TOTAL :{data.tot}</Col>
                            <Col>Strike Rate:{data.avgWinPercent}%</Col>
                            <Col>AVG WIN $:{data.avgWin}$</Col>
                            <Col>AVG PLACE ${data.avgPlace}$</Col>
                            <Col>AVG SELECTION :{data.avgPTP}%</Col>
                        </Row>
                        <Row xl={12} lg={12}>{this.renderResultsList(data, 1)}</Row>
                    </div>
                )
            }
        }
    }

    renderResultsList(data, type) {
        // if(data.details.length>0){ 
        // return(
        //     <BootstrapTable  bordered={false} style={{marginTop:"4px"}} data={data.details} version="4" ref='table'  search 
        //                pagination tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile}` } >
        //                     <TableHeaderColumn dataField="meetdate" thStyle={{ whiteSpace: 'normal' }}   dataSort>
        //                         <span className="fs-sm">Tracks</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="track_name" thStyle={{ whiteSpace: 'normal' }} dataSort>
        //                         <span className="fs-sm">Venue</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="race_num" thStyle={{ whiteSpace: 'normal' }}  dataSort>
        //                         <span className="fs-sm">No.</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="horse_name" thStyle={{ whiteSpace: 'normal' }} dataSort>
        //                         <span className="fs-sm">Horse</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="tab_no" thStyle={{ whiteSpace: 'normal' }}  dataSort>
        //                         <span className="fs-sm">No.</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="ub_win" thStyle={{ whiteSpace: 'normal' }} dataSort>
        //                         <span className="fs-sm">WIN$</span>
        //                     </TableHeaderColumn>

        //                     <TableHeaderColumn dataField="ub_place" thStyle={{ whiteSpace: 'normal' }}  dataSort>
        //                         <span className="fs-sm">PLC$</span>
        //                     </TableHeaderColumn>
        //                     {type==1? <TableHeaderColumn dataField="selec" thStyle={{ whiteSpace: 'normal' }}  dataSort>
        //                         <span className="fs-sm">PTP%</span>
        //                     </TableHeaderColumn>:''}
        //                 </BootstrapTable>
        // )
        // }
        var test = data?.details?.map((element, i) => {
            return (<div key={i} style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div style={{ flex: 0.1 }}>{moment(element?.meetdate).format("DD-MM-YYYY")}</div>
                    <div style={{ flex: 0.2 }}>{element?.track_name}</div>
                    <div style={{ flex: 0.1 }}>{element?.race_num}</div>
                    <div style={{ flex: 0.1 }}>{element?.horse_name}</div>
                    <div style={{ flex: 0.1 }}>{element?.tab_no}</div>
                    <div style={{ flex: 0.1 }}>{element?.horse_jockey}</div>
                    <div style={{ flex: 0.1 }}>{element?.ub_win}$</div>
                    <div style={{ flex: 0.1 }}>{element?.ub_place}$</div>
                    {type == 1 ? <div style={{ flex: 0.1 }}>{element?.selec}%</div> : ''}
                </div>
                <div><hr /></div>
            </div>)
        })
        return (<div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "10px" }}>
                <div style={{ flex: 0.1 }}>Race Date</div>
                <div style={{ flex: 0.2 }}>Race Name</div>
                <div style={{ flex: 0.1 }}>Race Number</div>
                <div style={{ flex: 0.1 }}>Horse Name</div>
                <div style={{ flex: 0.1 }}>Horse Number</div>
                <div style={{ flex: 0.1 }}>Jockey</div>
                <div style={{ flex: 0.1 }}>WIN$</div>
                <div style={{ flex: 0.1 }}>PLACE$</div>
                {type == 1 ? <div style={{ flex: 0.1 }}>PTP TIP</div> : ''}
            </div>
            <div><hr /></div>
            <div>{test}</div>
        </div>)
    }

    render() {
        const { isLoading, result, venues, venuesLoading, horses, jockeys, trainers, hjtLoading } = this.props
        const selectRow = {
            mode: 'checkbox',
            hideSelectColumn: false,
            clickToSelect: true,
            bgColor: 'green',
            onSelect: (row, isSelect, rowIndex, i) => {
                if (isSelect) {
                    this.setState(() => ({ selected: [...this.state.selected, row.track_name] }))
                }
                else {
                    this.setState(() => ({ selected: this.state.selected.filter(e => e !== row.track_name) }))
                }
            },
            onSelectAll: (isSelected, rows, e) => {
                if (isSelected) {
                    let array = []
                    rows.map((zone) => {
                        array.push(zone.track_name)
                    })
                    this.setState(() => ({ selected: array }))
                } else {
                    this.setState(() => ({ selected: [] }))
                }
            }
        };

        const selectRowH = {
            mode: 'checkbox',
            hideSelectColumn: false,
            clickToSelect: true,
            bgColor: 'green',
            onSelect: (row, isSelect, rowIndex, i) => {
                if (isSelect) {
                    this.setState(() => ({ selectedH: [...this.state.selectedH, row.horse_name] }))
                }
                else {
                    this.setState(() => ({ selectedH: this.state.selectedH.filter(e => e !== row.horse_name) }))
                }
            },
            onSelectAll: (isSelected, rows, e) => {
                if (isSelected) {
                    let array = []
                    rows.map((zone) => {
                        array.push(zone.horse_name)
                    })
                    this.setState(() => ({ selectedH: array }))
                } else {
                    this.setState(() => ({ selectedH: [] }))
                }
            }
        };

        const selectRowJ = {
            mode: 'checkbox',
            hideSelectColumn: false,
            clickToSelect: true,
            bgColor: 'green',
            onSelect: (row, isSelect, rowIndex, i) => {
                if (isSelect) {
                    this.setState(() => ({ selectedJ: [...this.state.selectedJ, row.horse_jockey] }))
                }
                else {
                    this.setState(() => ({ selectedJ: this.state.selectedJ.filter(e => e !== row.horse_jockey) }))
                }
            },
            onSelectAll: (isSelected, rows, e) => {
                if (isSelected) {
                    let array = []
                    rows.map((zone) => {
                        array.push(zone.horse_jockey)
                    })
                    this.setState(() => ({ selectedJ: array }))
                } else {
                    this.setState(() => ({ selectedJ: [] }))
                }
            }
        };

        const selectRowT = {
            mode: 'checkbox',
            hideSelectColumn: false,
            clickToSelect: true,
            bgColor: 'green',
            onSelect: (row, isSelect, rowIndex, i) => {
                if (isSelect) {
                    this.setState(() => ({ selectedT: [...this.state.selectedT, row.horse_trainer] }))
                }
                else {
                    this.setState(() => ({ selectedT: this.state.selectedT.filter(e => e !== row.horse_trainer) }))
                }
            },
            onSelectAll: (isSelected, rows, e) => {
                if (isSelected) {
                    let array = []
                    rows.map((zone) => {
                        array.push(zone.horse_trainer)
                    })
                    this.setState(() => ({ selectedT: array }))
                } else {
                    this.setState(() => ({ selectedT: [] }))
                }
            }
        };
        return (
            <div>
                <h1 className="page-title">Race Analitycs Selector</h1>
                <div  >
                    <Row>
                        <Col>
                            <select
                                className="form-control"
                                style={{ fontSize: "12px", width: "150px" }}
                                name="Months"
                                onChange={this.handleDate}
                            >
                                <option value={this.dateSelector(1)} defaultValue>
                                    Today
                    </option>
                                <option value={this.dateSelector(2)}>Yesterday</option>
                                <option value={this.dateSelector(3)}>2 days ago</option>
                                <option value={this.dateSelector(4)}>This month</option>
                                <option value={this.dateSelector(5)}>{moment().tz('Australia/Sydney').subtract(1, 'month').format("MMM YYYY")}</option>
                                <option value={this.dateSelector(6)}>{moment().tz('Australia/Sydney').subtract(2, 'month').format("MMM YYYY")}</option>
                                <option value={this.dateSelector(7)}>{moment().tz('Australia/Sydney').subtract(3, 'month').format("MMM YYYY")}</option>
                                <option value={this.dateSelector(8)}>All Time</option>
                                <option value={this.dateSelector(9)}>Custom date ...</option>
                            </select>

                            {this.state.current === 9 ? <div className="col">
                                <div>From: {moment(this.state.firstDate).format("DD-MM-YYYY")}</div>
                                <div>To: {moment(this.state.secondDate).format("DD-MM-YYYY")}</div>

                            </div> : ''}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col lg={2}>
                            <label>Tracks</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='Tracks' type="checkbox" className={`${s.switch}`} checked={this.state.tracks} onChange={this.handleTracks} />
                            </div>
                        </Col>
                        <Col lg={2}>
                            <label>Horses</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='Horse' type="checkbox" className={`${s.switch}`} checked={this.state.horse} onChange={this.handleHorse} />
                            </div>
                        </Col>
                        <Col lg={2}>
                            <label>Jockeys</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='Jockey' type="checkbox" className={`${s.switch}`} checked={this.state.jockey} onChange={this.handleJockey} />
                            </div>
                        </Col>
                        <Col lg={2}>
                            <label>Trainers</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='Trainer' type="checkbox" className={`${s.switch}`} checked={this.state.trainer} onChange={this.handleTrainer} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col lg={2}>
                            <label>PTP</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='PTP' type="checkbox" className={`${s.switch}`} checked={this.state.PTP} onChange={this.handlePTP} />
                            </div>
                        </Col>

                        <Col lg={2}>
                            <label>FAV</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='FAV' type="checkbox" className={`${s.switch}`} checked={this.state.FAV} onChange={this.handleFAV} />
                            </div>
                        </Col>

                        <Col lg={2}>
                            <label>MM</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='MM' type="checkbox" className={`${s.switch}`} checked={this.state.MM} onChange={this.handleMM} />
                            </div>
                        </Col>

                        <Col lg={2}>
                            <label>+7$</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='over7' type="checkbox" className={`${s.switch}`} checked={this.state.over7} onChange={this.handleOver7} />
                            </div>
                        </Col>
                        <Col lg={2}>
                            <label>No Starts</label>
                            <div className={`${s.profileCheckBox}`}>
                                <input id='NoStarts' type="checkbox" className={`${s.switch}`} checked={this.state.NoStarts} onChange={this.handleNoStarts} />
                            </div>
                        </Col>
                        <Col>
                            <Button className={s.controBtn} color="success" onClick={this.handleSubmit}> SUBMIT</Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.tracks == true ?
                            <Col xl={3} xs={3} md={3} lg={3} >
                                {venuesLoading === true ? <LoadingNew /> : <BootstrapTable bordered={false} style={{ marginTop: "4px" }} data={venues} version="4" ref='table' selectRow={selectRow} search
                                    pagination tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile2}`}>
                                    <TableHeaderColumn dataField="track_name" thStyle={{ whiteSpace: 'normal' }} isKey={true} dataSort>
                                        <span className="fs-sm">Tracks</span>
                                    </TableHeaderColumn>
                                </BootstrapTable>}

                            </Col>
                            : ''}
                        {this.state.horse == true ?
                            <Col xl={3} xs={3} md={3} lg={3} >
                                {hjtLoading === true ? <LoadingNew /> : <BootstrapTable bordered={false} style={{ marginTop: "4px" }} data={horses} version="4" ref='table' selectRow={selectRowH} search
                                    pagination tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile2}`}>
                                    <TableHeaderColumn dataField="horse_name" thStyle={{ whiteSpace: 'normal' }} isKey={true} dataSort>
                                        <span className="fs-sm">Horse</span>
                                    </TableHeaderColumn>
                                </BootstrapTable>}

                            </Col>
                            : ''}
                        {this.state.jockey == true ?
                            <Col xl={3} xs={3} md={3} lg={3} >
                                {hjtLoading === true ? <LoadingNew /> : <BootstrapTable bordered={false} style={{ marginTop: "4px" }} data={jockeys} version="4" ref='table' selectRow={selectRowJ} search
                                    pagination tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile2}`}>
                                    <TableHeaderColumn dataField="horse_jockey" thStyle={{ whiteSpace: 'normal' }} isKey={true} dataSort>
                                        <span className="fs-sm">Jockey</span>
                                    </TableHeaderColumn>
                                </BootstrapTable>}

                            </Col>
                            : ''}

                        {this.state.trainer == true ?
                            <Col xl={3} xs={3} md={3} lg={3} >
                                {hjtLoading === true ? <LoadingNew /> : <BootstrapTable bordered={false} style={{ marginTop: "4px" }} data={trainers} version="4" ref='table' selectRow={selectRowT} search
                                    pagination tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile2}`}>
                                    <TableHeaderColumn dataField="horse_trainer" thStyle={{ whiteSpace: 'normal' }} isKey={true} dataSort>
                                        <span className="fs-sm">Trainer</span>
                                    </TableHeaderColumn>
                                </BootstrapTable>}
                            </Col>
                            : ''}
                    </Row>
                    {result.length == 0 ? "" : this.renderSelectedPref(isLoading, result)}
                </div>



                <Modal isOpen={this.state.modalOpen}>
                    <Row style={{ display: "flex", alignContent: "flex-end", justifyContent: 'flex-end', marginRight: "14px", marginTop: "6px" }}>
                        <FontAwesomeIcon onClick={() => { this.handleCustomDate() }} style={{ color: "black", cursor: "pointer" }} icon={faTimes} size="2x" />
                    </Row>
                    <Row style={{ margin: 'auto' }}>
                        <Col style={{ padding: '0px', margin: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ fontWeight: "600" }}>Start Date</h4>
                            <DayPicker onDayClick={this.handleDayClick}
                                selectedDays={this.state.firstDate}

                            />
                        </Col>
                        <Col style={{ padding: '0px', margin: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ fontWeight: "600" }}>End Date</h4>
                            <DayPicker onDayClick={this.handleDayClick2}
                                selectedDays={this.state.secondDate}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: 'auto', marginBottom: "8px" }}><Button onClick={() => { this.handleCustomDate() }} className={s.controBtn} color="success">Submit</Button></Row>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    result: state.racesAnalyticsReducer.resultsUser,
    isLoading: state.racesAnalyticsReducer.resultsUserLoading,
    venues: state.racesAnalyticsReducer.tracksUser.tracks,
    venuesLoading: state.racesAnalyticsReducer.tracksUserLoading,
    horses: state.racesAnalyticsReducer.hjt.horses,
    jockeys: state.racesAnalyticsReducer.hjt.jockeys,
    trainers: state.racesAnalyticsReducer.hjt.trainers,
    hjtLoading: state.racesAnalyticsReducer.hjtLoading,
})
export default connect(mapStateToProps)(AnalyticsFilter)
