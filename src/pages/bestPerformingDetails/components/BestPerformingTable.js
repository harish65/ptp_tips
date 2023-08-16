import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import profileActions from "../../../redux/actions/profiles";
import { Table } from "antd";

import LoadingNew from "../../../components/loading/LoadingNew";
import "../style.scss";

export const BestPerformingTable = (props) => {
  const [selected, SetSelected] = useState("today");
  const [PTP, SetPTP] = useState(false);
  useEffect(() => {
    props.dispatch(
      profileActions.bestPerformingHorse({
        type: "regular",
        date: "today",
        user: "horse",
        limit: "100",
      })
    );
  }, []);
  useEffect(() => {
    getData();
  }, [PTP]);
  useEffect(() => {
    getData();
  }, [selected]);

  const getData = () => {
    let type;
    if (PTP === true) {
      type = "ptp";
    } else {
      type = "regular";
    }
    props.dispatch(
      profileActions.bestPerformingHorse({
        type: type,
        date: selected,
        user: "horse",
        limit: "100",
      })
    );
  };

  const assignData = () => {
    let data = [];
    let c = props?.bestPerformingHorse?.data?.map((zone, i) => {
      data.push({
        key: i,
        horse_name: zone.horse_name,
        runs: zone.runs,
        win: zone.won,
        winPerc: ((zone?.won / zone?.runs) * 100)?.toFixed(2),
        avgWin: zone?.winOdd?.toFixed(2),
        place: zone.place,
        placePerc: ((zone?.place / zone?.runs) * 100)?.toFixed(2),
        avgPlc: zone?.placeOdd?.toFixed(2),
      });
    });
    return data;
  };
  const tableRender = () => {
    const columns = [
      {
        title: "Horse",
        dataIndex: "horse_name",
        width: 90,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                borderBottomColor: "white",
              },
            },
            children: (
              <div
                style={{
                  backgroundColor: "#B6BDC6",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}>
                {text}
              </div>
            ),
          };
        },
      },
      {
        title: "Runs",
        dataIndex: "runs",
        width: 65,
        sorter: {
          compare: (a, b) => a.runs - b.runs,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "Win",
        dataIndex: "win",
        width: 63,
        sorter: {
          compare: (a, b) => a.win - b.win,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "AVG%",
        dataIndex: "winPerc",
        width: 65,
        sorter: {
          compare: (a, b) => a.winPerc - b.winPerc,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "AVG$",
        dataIndex: "avgWin",
        width: 65,
        sorter: {
          compare: (a, b) => a.avgWin - b.avgWin,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },

      {
        title: "Place",
        dataIndex: "place",
        width: 63,
        sorter: {
          compare: (a, b) => a.place - b.place,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "AVG%",
        dataIndex: "placePerc",
        width: 65,
        sorter: {
          compare: (a, b) => a.placePerc - b.placePerc,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "AVG$",
        dataIndex: "avgPlc",
        width: 65,
        sorter: {
          compare: (a, b) => a.avgPlc - b.avgPlc,
        },
        defaultSortOrder: "descend",
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 64,
                backgroundColor: "white",
              },
            },
            children: <div>{text}</div>,
          };
        },
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
        scroll={{ x: "calc(220px + 50%)", y: "510px" }}
        style={{ marginTop: "7px" }}
        sortDirections={["descend", "ascend", "descend"]}
        showSorterTooltip={false}
      />
    );
  };

  return (
    <div>
      <div style={styles.optionsPosition}>
        <div style={styles.radioContainer}>
          <div className="profileCheckBox" style={{ display: "flex" }}>
            <label style={{ marginRight: "4px" }}>{"PTP   "}</label>
            <input
              checked={PTP}
              onChange={() => {
                SetPTP(!PTP);
              }}
              id="ptp"
              type="checkbox"
              className="switch"
            />
          </div>
          <div style={styles.options}>
            <div style={styles.radio}>
              <input
                checked={selected === "today"}
                onChange={(e) => {
                  SetSelected(e.target.name);
                }}
                type="radio"
                name="today"></input>
              <label>Today</label>
            </div>
            <div style={styles.radio}>
              <input
                checked={selected === "last30"}
                onChange={(e) => {
                  SetSelected(e.target.name);
                }}
                type="radio"
                name="last30"></input>
              <label>30 D</label>
            </div>
            <div style={styles.radio}>
              <input
                checked={selected === "month6"}
                onChange={(e) => {
                  SetSelected(e.target.name);
                }}
                type="radio"
                name="month6"></input>
              <label>6 Mo</label>
            </div>
          </div>
        </div>
      </div>
      {props.bestPerformingHorseLoading === true ? (
        <div>
          <LoadingNew />
        </div>
      ) : (
        tableRender()
      )}
    </div>
  );
};

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
  optionsPosition: {},
  allign: {
    flex: "0.15",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const mapStateToProps = (state) => ({
  bestPerformingHorse: state.profilesReducer.bestPerformingHorse,
  bestPerformingHorseLoading: state.profilesReducer.bestPerformingHorseLoading,
});

export default connect(mapStateToProps)(BestPerformingTable);
