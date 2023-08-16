import React from "react";
import { Table, Col, Row, Collapse, Badge } from "reactstrap";
import moment from "moment-timezone";
// import { Link } from 'react-router-dom';

export default class ptpResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRows: [],
      openJockeys: [],
    };
  }

  componentWillMount() {
    const jockeyData = this.props?.data?.bestPerformingJockey;
    const venuesData = this.props?.data?.bestPerformingVenues;
    var jockeyRows = [];
    var venuesRows = [];
      // eslint-disable-next-line array-callback-return
    jockeyData?.map(() => {
      jockeyRows.push(false);
    });
      // eslint-disable-next-line array-callback-return
    venuesData?.map(() => {
      venuesRows.push(false);
    });
    this.setState({ openJockeys: jockeyRows, openRow: venuesRows });
  }

  openRow(i) {
    const values = this.state.openRows;
    values[i] = !this.state.openRows[i];
    this.setState({ openRows: values });
  }

  openJockeys(i) {
    const values = this.state.openJockeys;
    values[i] = !this.state.openJockeys[i];
    this.setState({ openJockeys: values });
  }

  closeRow(i) {}

  getOpenStatus(i) {
    var data = this.state.openRows;
    var theData = data.find((element) => element?.i === i);
    return theData?.open;
  }

  renderTableAll() {
    return (
      <div>
        <Col style={{ marginTop: 32 }}>
          <Row>
            <Col>
              <h2>Best Performing Jockeys</h2>
              <Table style={{ marginTop: 16 }} responsive striped>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                  }}
                >
                  <tr>
                    <th>Jockey</th>
                    <th>Runs</th>
                    <th>WIN</th>
                    <th>WIN %</th>
                    <th>WIN$</th>
                    <th>PLC</th>
                    <th>PLC %</th>
                    <th>PLC$</th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingJockeysPtp?.map(
                    (element, i) => {
                      return (
                        <>
                          <tr
                            key={i}
                            onClick={() => this.openJockeys(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{element?.horse_jockey}</td>
                            <td>{element?.runs}</td>
                            <td>{element?.won}</td>
                            <td>
                              %
                              {((element?.won / element?.runs) * 100)?.toFixed(
                                2
                              )}
                            </td>
                            <td>
                              {element?.avg_win?.toFixed(2)
                                ? "$ " + element?.avg_win?.toFixed(2)
                                : "-"}
                            </td>
                            <td>
                              {element?.won + element?.second + element?.third}
                            </td>
                            <td>
                              %
                              {(
                                ((element?.won +
                                  element?.second +
                                  element?.third) /
                                  element?.runs) *
                                100
                              ).toFixed(0)}
                            </td>
                            <td>
                              {element?.avg_place?.toFixed(2)
                                ? "$ " + element?.avg_place?.toFixed(0)
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={8}
                              style={{ padding: 0, backgroundColor: "#252525" }}
                            >
                              <Collapse
                                isOpen={this.state.openJockeys[i]}
                                style={{ backgroundColor: "#252525" }}
                              >
                                {element?.details?.map((index, i) => {
                                  return (
                                    <Col key={i}>
                                      {i !== 0 ? (
                                        <Col
                                          style={{
                                            backgroundColor: "white",
                                            opacity: "50%",
                                            height: 1,
                                            padding: 0,
                                            marginTop: 16,
                                            marginBottom: 16,
                                          }}
                                        ></Col>
                                      ) : null}
                                      <Col
                                        style={{
                                          backgroundColor: "trans[transparent",
                                          height: 24,
                                          textAlign: "left",
                                          marginTop: i === 0 ? 16 : 0,
                                          display: "flex",
                                          alignItems: "center",
                                          borderRadius: 4,
                                          borderColor: "white",
                                          padding: 4,
                                          marginBottom:
                                            i === element?.details?.length - 1
                                              ? 16
                                              : null,
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "5%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Position
                                          </span>
                                          <strong>{index?.position}</strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "18%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Date
                                          </span>
                                          <strong>
                                            {moment(index?.meetdate).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "5%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            TrCode.
                                          </span>
                                          <strong>{index?.trackcode}</strong>
                                        </div>
                                        {/* <div style={{ width: '5%', marginRight: '5%', textAlign: 'left', color: 'white', display: 'flex', flexDirection: "column" }}>
                                                                               <span style={{ fontSize: 11, opacity: '60%' }}>PLC</span>
                                                                               <strong>{index?.PLACE}</strong>
                                                                           </div> */}
                                        <div
                                          style={{
                                            width: "6%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Cond.
                                          </span>
                                          <strong>
                                            {index?.track_condition}
                                          </strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "15%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Dist.
                                          </span>
                                          <strong>
                                            {
                                              index?.track_distance?.split(
                                                " "
                                              )[0]
                                            }
                                            M
                                          </strong>
                                        </div>
                                        {/* <div style={{ width: '10%', marginRight: '5%', textAlign: 'left', color: 'white', display: 'flex', flexDirection: "column" }}>
                                                                               <span style={{ fontSize: 11, opacity: '60%' }}>Class</span>
                                                                               <strong>{index?.CLASS}</strong>
                                                                           </div>
                                                                           <div style={{width: '18%', marginRight: '5%', textAlign: 'left', color: 'white', display: 'flex', flexDirection: "column" }}>
                                                                       <span style={{ fontSize: 11, opacity: '60%' }}>Price</span>
                                                                           <strong>{index?.PRICESP}</strong>
                                                                       </div> */}
                                      </Col>
                                    </Col>
                                  );
                                })}
                              </Collapse>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Col>
            <Col>
              <h2>Best Performing Venues</h2>
              <Table style={{ marginTop: 16 }} responsive striped>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                  }}
                >
                  <tr>
                    <th>Venue</th>
                    <th>Runs</th>
                    <th>WIN</th>
                    <th>WIN %</th>
                    <th>WIN %</th>
                    <th>PLC</th>
                    <th>PLC %</th>
                    <th>PLC %</th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingVenuesPtp?.map(
                    (element, i) => {
                      return (
                        <>
                          <tr
                            key={i}
                            onClick={() => this.openRow(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{element?.trackcode}</td>
                            <td>{element?.runs}</td>
                            <td>{element?.won}</td>
                            <td>
                              %
                              {((element?.won / element?.runs) * 100)?.toFixed(
                                0
                              )}
                            </td>
                            <td>
                              {element?.avg_win?.toFixed(2)
                                ? "$ " + element?.avg_win?.toFixed(2)
                                : "-"}
                            </td>
                            <td>
                              {element?.won + element?.second + element?.third}
                            </td>
                            <td>
                              %
                              {(
                                ((element?.won +
                                  element?.second +
                                  element?.third) /
                                  element?.runs) *
                                100
                              ).toFixed(0)}
                            </td>
                            <td>
                              {element?.avg_place?.toFixed(2)
                                ? "$ " + element?.avg_place?.toFixed(2)
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={8}
                              style={{ padding: 0, backgroundColor: "#252525" }}
                            >
                              <Collapse
                                isOpen={this.state.openRows[i]}
                                style={{
                                  padding: 0,
                                  backgroundColor: "#252525",
                                }}
                              >
                                {element?.details?.map((index, i) => {
                                  return (
                                    <Col key={i}>
                                      {i !== 0 ? (
                                        <Col
                                          style={{
                                            backgroundColor: "white",
                                            opacity: "50%",
                                            height: 1,
                                            padding: 0,
                                            marginTop: 16,
                                            marginBottom: 16,
                                          }}
                                        ></Col>
                                      ) : null}
                                      <Col
                                        style={{
                                          backgroundColor: "trans[transparent",
                                          height: 24,
                                          textAlign: "left",
                                          marginTop: i === 0 ? 16 : 0,
                                          display: "flex",
                                          alignItems: "center",
                                          borderRadius: 4,
                                          borderColor: "white",
                                          padding: 4,
                                          marginBottom:
                                            i === element?.details?.length - 1
                                              ? 16
                                              : null,
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "5%",
                                            marginRight: "5%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Pos.
                                          </span>
                                          <strong>{index?.position}</strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "18%",
                                            marginRight: "10%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Date
                                          </span>
                                          <strong>
                                            {moment(index?.meetdate).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "5%",
                                            marginRight: "10%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Jockey
                                          </span>
                                          <strong>{index?.horse_jockey}</strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "5%",
                                            marginRight: "10%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Cond.
                                          </span>
                                          <strong>
                                            {index?.track_condition}
                                          </strong>
                                        </div>
                                        <div
                                          style={{
                                            width: "6%",
                                            marginRight: "10%",
                                            textAlign: "left",
                                            color: "white",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: 11,
                                              opacity: "60%",
                                            }}
                                          >
                                            Dist.
                                          </span>
                                          <strong>
                                            {
                                              index?.track_distance.split(
                                                " "
                                              )[0]
                                            }
                                            M
                                          </strong>
                                        </div>
                                      </Col>
                                    </Col>
                                  );
                                })}
                              </Collapse>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        {/* {this.renderTable()} */}
      </div>
    );
  }

  renderTableMobile() {
    return (
      <div>
        <Col style={{ marginTop: 32, padding: 0 }}>
          <Row style={{ padding: 0 }}>
            <Col>
              <h2>Best Performing Jockeys</h2>
              <Table style={{ marginTop: 16 }} responsive striped>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                    height: 40,
                  }}
                >
                  <tr style={{ fontSize: 11 }}>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      Jockey
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      RNS
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      WIN
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      W %
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      $WIN
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      PLC
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      P%
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      $PLC
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingJockeysPtp?.map(
                    (element, i) => {
                      return (
                        <>
                          <tr
                            key={i}
                            onClick={() => this.openJockeys(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{element?.horse_jockey}</td>
                            <td>{element?.runs}</td>
                            <td>{element?.won}</td>
                            <td>
                              %
                              {((element?.won / element?.runs) * 100)?.toFixed(
                                2
                              )}
                            </td>
                            <td>
                              {element?.avg_win?.toFixed(2)
                                ? "$ " + element?.avg_win?.toFixed(2)
                                : "-"}
                            </td>
                            <td>
                              {element?.won + element?.second + element?.third}
                            </td>
                            <td>
                              %
                              {(
                                ((element?.won +
                                  element?.second +
                                  element?.third) /
                                  element?.runs) *
                                100
                              ).toFixed(2)}
                            </td>
                            <td>
                              {element?.avg_place?.toFixed(2)
                                ? "$ " + element?.avg_place?.toFixed(2)
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={8} style={{ padding: 0 }}>
                              <Collapse
                                isOpen={this.state.openJockeys[i]}
                                style={{
                                  padding: 8,
                                  backgroundColor: "#252525",
                                }}
                              >
                                {element?.details?.map((index, i) => {
                                  return (
                                    <Col
                                      xs={12}
                                      style={{ marginTop: 8, padding: 0 }}
                                    >
                                      <Row
                                        style={{
                                          backgroundColor: "#3c3c3c",
                                          borderRadius: 2,
                                          padding: 3,
                                          marginRight: 4,
                                          marginLeft: 4,
                                        }}
                                      >
                                        <Col
                                          xs={1}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.position
                                            ? index?.position
                                            : "-"}
                                        </Col>
                                        <Col
                                          xs={3}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            padding: 0,
                                          }}
                                        >
                                          {moment(index?.meetdate).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </Col>
                                        <Col
                                          xs={4}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.trackcode}
                                        </Col>
                                        <Col
                                          xs={2}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.track_distance?.split("M")[0]}
                                          M
                                        </Col>
                                        <Col
                                          xs={2}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {
                                            index?.track_distance?.split(
                                              "M "
                                            )[1]
                                          }
                                        </Col>
                                        <Col
                                          xs={1}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "left",
                                            paddingLeft: 0,
                                          }}
                                        >
                                          {/* {this.state.insideOpenArea[i]?.[ind] ?
                                                                                <FontAwesomeIcon icon={faMinusCircle} size="1x" />
                                                                                :
                                                                                <FontAwesomeIcon icon={faPlusCircle} size="1x" />} */}
                                          {/* <FontAwesomeIcon icon={faMinusCircle} size="1x" /> */}
                                        </Col>
                                      </Row>
                                      {/* <Col style={{ padding: 0 }}>
                                                                            <Collapse isOpen={true} style={{ backgroundColor: 'red', height: 32 }}></Collapse>
                                                                        </Col> */}
                                    </Col>
                                  );
                                })}
                              </Collapse>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Col>
            <Col>
              <h2>Best Performing Venues</h2>
              <Table style={{ marginTop: 16 }} responsive striped>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                    height: 100,
                  }}
                >
                  <tr style={{ fontSize: 11 }}>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      Jockey
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      RNS
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      WIN
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      W %
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      $WIN
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      PLC
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      P%
                    </th>
                    <th
                      style={{
                        padding: 0,
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      $PLC
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingVenuesPtp?.map(
                    (element, i) => {
                      return (
                        <>
                          <tr
                            key={i}
                            onClick={() => this.openRow(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{element?.trackcode}</td>
                            <td>{element?.runs}</td>
                            <td>{element?.won}</td>
                            <td>
                              %
                              {((element?.won / element?.runs) * 100)?.toFixed(
                                2
                              )}
                            </td>
                            <td>
                              {element?.avg_win?.toFixed(2)
                                ? "$ " + element?.avg_win?.toFixed(2)
                                : "-"}
                            </td>
                            <td>
                              {element?.won + element?.second + element?.third}
                            </td>
                            <td>
                              %
                              {(
                                ((element?.won +
                                  element?.second +
                                  element?.third) /
                                  element?.runs) *
                                100
                              ).toFixed(2)}
                            </td>
                            <td>
                              {element?.avg_place?.toFixed(2)
                                ? "$ " + element?.avg_place?.toFixed(2)
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={8} style={{ padding: 0 }}>
                              <Collapse
                                isOpen={this.state.openRows[i]}
                                style={{
                                  padding: 8,
                                  backgroundColor: "#252525",
                                }}
                              >
                                {element?.details?.map((index, i) => {
                                  return (
                                    <Col
                                      xs={12}
                                      style={{ marginTop: 8, padding: 0 }}
                                    >
                                      <Row
                                        style={{
                                          backgroundColor: "#3c3c3c",
                                          borderRadius: 2,
                                          padding: 3,
                                          marginRight: 4,
                                          marginLeft: 4,
                                        }}
                                      >
                                        <Col
                                          xs={1}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.position
                                            ? index?.position
                                            : "-"}
                                        </Col>
                                        <Col
                                          xs={3}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            padding: 0,
                                          }}
                                        >
                                          {moment(index?.meetdate).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </Col>
                                        <Col
                                          xs={4}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.horse_jockey}
                                        </Col>
                                        <Col
                                          xs={2}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {index?.track_distance?.split("M")[0]}
                                          M
                                        </Col>
                                        <Col
                                          xs={2}
                                          style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                          }}
                                        >
                                          {
                                            index?.track_distance?.split(
                                              "M "
                                            )[1]
                                          }
                                        </Col>
                                      </Row>
                                      {/* <Col style={{ padding: 0 }}>
                                                                            <Collapse isOpen={true} style={{ backgroundColor: 'red', height: 32 }}></Collapse>
                                                                        </Col> */}
                                    </Col>
                                  );
                                })}
                              </Collapse>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }

  renderChecker() {
    if (window.innerWidth > 700) {
      return this.renderTableAll();
    } else {
      return this.renderTableMobile();
    }
  }

  render() {
    return (
      <div>
        <Table responsive style={{ marginTop: 16 }}>
          <thead
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              height: "34%",
            }}
          >
            <th>
              <Badge>
                <strong>Runs</strong>
              </Badge>
            </th>
            <th>
              <Badge color="warning">
                <strong style={{ color: "white" }}>1st</strong>
              </Badge>
            </th>
            <th>
              <Badge
                style={{ backgroundColor: "rgb(9, 106, 179)", color: "white" }}
                color="default"
              >
                <strong>2nd</strong>
              </Badge>
            </th>
            <th>
              <Badge
                style={{ backgroundColor: "rgb(139, 52, 191)", color: "white" }}
                color="default"
              >
                <strong>3rd</strong>
              </Badge>
            </th>
            <th>
              <Badge>
                <strong>AVG W</strong>
              </Badge>
            </th>
            <th>
              <Badge>
                <strong>AVG P</strong>
              </Badge>
            </th>
          </thead>
          <tbody style={{ textAlign: "center", backgroundColor: "white" }}>
            <td>{this.props.data?.ptpStats?.runs}</td>
            <td>{this.props.data?.ptpStats?.won}</td>
            <td>{this.props.data?.ptpStats?.second}</td>
            <td>{this.props.data?.ptpStats?.third}</td>
            <td>
              {this.props.data?.ptpStats?.avg_win
                ? this.props.data?.ptpStats?.avg_win.toFixed(2)
                : "-"}
            </td>
            <td>
              {this.props.data?.ptpStats?.avg_place
                ? this.props.data?.ptpStats?.avg_place.toFixed(2)
                : "-"}
            </td>
          </tbody>
        </Table>

        {this.renderChecker()}
      </div>
    );
  }
}
