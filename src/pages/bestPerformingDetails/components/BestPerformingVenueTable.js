import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import profileActions from "../../../redux/actions/profiles"
import { Table } from 'antd';
import LoadingNew from '../../../components/loading/LoadingNew';
import 'antd/dist/antd.css';
import "../style.scss"



export const BestPerformingVenueTable = (props) => {
    const [selected, SetSelected] = useState("today")

    useEffect(() => {
        props.dispatch(profileActions.bestPerformingVenue({date:"today",limit:"100"}));
    }, [])

    useEffect(() => {
        getData()
    }, [selected])

    const getData =()=>{
        props.dispatch(profileActions.bestPerformingVenue({date:selected,limit:"100"}));
    }

    const  assignData = () => {
        let data = []
        let c = props?.bestPerformingVenue?.data?.map((zone, i) => {
            data.push({
                key: i,
                track_name: zone.track_name,
                runs: zone.runs,
                win: zone.won,
                winPerc: ((zone?.won / zone?.runs) * 100)?.toFixed(2),
                avgWin: zone?.winOdd?.toFixed(2),
                place: zone.place,
                placePerc: ((zone?.place / zone?.runs) * 100)?.toFixed(2),
                avgPlc: zone?.placeOdd?.toFixed(2)
            })
        })
        return (data)
    }

    const tableRender = () => {
        const columns = [
            {
                title: 'Venue',
                dataIndex: 'track_name',
                width: 90,
                render(text, record) {
                    return {
                        props: {
                            style: { textAlign: 'center', fontSize: 11, height: 64, borderBottomColor: 'white' }
                        },
                        children: <div style={{ backgroundColor: '#B6BDC6', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{text}</div>
                    };
                }
            },
            {
                title: 'Runs',
                dataIndex: 'runs',
                width: 65,
                sorter: {
                    compare: (a, b) => a.runs - b.runs,
                },
                defaultSortOrder: 'descend',
                render(text, record) {
                    return {
                        props: {
                            style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                        },
                        children: <div>{text}</div>
                    };
                }
            },
            {
                title: 'Win',
                dataIndex: 'win',
                width: 63,
                sorter: {
                    compare: (a, b) => a.win - b.win,
                },
                defaultSortOrder: 'descend',
                render(text, record) {
                    return {
                        props: {
                            style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                        },
                        children: <div>{text}</div>
                    };
                }
            },
             {
              title: 'AVG%',
              dataIndex: 'winPerc',
              width: 65,
              sorter: {
                compare: (a, b) => a.winPerc - b.winPerc,
            },
            defaultSortOrder: 'descend',
              render(text, record) {
                return {
                  props: {
                    style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                  },
                  children: <div>{text}</div>
                };
              }
            },
            {
              title: 'AVG$',
              dataIndex: 'avgWin',
              width: 65,
              sorter: {
                compare: (a, b) => a.avgWin - b.avgWin,
            },
            defaultSortOrder: 'descend',
              render(text, record) {
                return {
                  props: {
                    style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                  },
                  children: <div>{text}</div>
                };
              }
            },
            
            {
                title: 'Place',
                dataIndex: 'place',
                width: 63,
                sorter: {
                    compare: (a, b) => a.place - b.place,
                },
                defaultSortOrder: 'descend',
                render(text, record) {
                    return {
                        props: {
                            style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                        },
                        children: <div>{text}</div>
                    };
                }
            },
             {
              title: 'AVG%',
              dataIndex: 'placePerc',
              width: 65,
              sorter: {
                compare: (a, b) => a.placePerc - b.placePerc,
            },
            defaultSortOrder: 'descend',
              render(text, record) {
                return {
                  props: {
                    style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                  },
                  children: <div>{text}</div>
                };
              }
            },
            {
              title: 'AVG$',
              dataIndex: 'avgPlc',
              width: 65,
              sorter: {
                compare: (a, b) => a.avgPlc - b.avgPlc,
            },
            defaultSortOrder: 'descend',
              render(text, record) {
                return {
                  props: {
                    style: { textAlign: 'center', fontSize: 11, height: 64, backgroundColor: "white" }
                  },
                  children: <div>{text}</div>
                };
              }
            }, 
        ];

        return (
            <Table
                className="table_style"
                columns={columns}
                bordered
                dataSource={assignData()}
                size="middle"
                pagination={false}
                scroll={{ x: 'calc(220px + 50%)', y: '510px' }}
                style={{ marginTop: "7px"}}
                sortDirections={["descend", "ascend", "descend"]}
                showSorterTooltip={false}
            />
        )
    }
    return (
        <div>
                                 <div style={styles.optionsPosition} >
                            <div style={styles.radioContainer}>
                                <div className="profileCheckBox" style={{ display: "flex" }}>
                                </div>
                                <div style={styles.options}>
                                    <div style={styles.radio} >
                                        <input checked={selected === "today"} onChange={(e) => { SetSelected(e.target.name) }} type="radio" name="today"></input>
                                        <label>Today</label>
                                    </div>
                                    <div style={styles.radio} >
                                        <input checked={selected === "yesterday"} onChange={(e) => { SetSelected(e.target.name) }} type="radio" name="yesterday"></input>
                                        <label>Yesterday</label>
                                    </div>
                                    <div style={styles.radio} >
                                        <input checked={selected === "last7"} onChange={(e) => { SetSelected(e.target.name) }} type="radio" name="last7"></input>
                                        <label>Last7</label>
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
                {props.bestPerformingVenueLoading===true? <div><LoadingNew/></div>:tableRender()}
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
      
    },
    allign: {
        flex: "0.15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}
const mapStateToProps = (state) => ({
    bestPerformingVenue: state.profilesReducer.bestPerformingVenue,
    bestPerformingVenueLoading: state.profilesReducer.bestPerformingVenueLoading,
})

export default connect(mapStateToProps)(BestPerformingVenueTable)
