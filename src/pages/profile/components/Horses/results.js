import React from "react";
import { Table, Col, Row, Collapse } from "reactstrap";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import GoToIcon from "react-ionicons/lib/MdArrowUp";
import { checkRouteDate } from "../../../../config/utils";

export default class Results extends React.Component {
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
    if (jockeyData) {
      // eslint-disable-next-line array-callback-return
      jockeyData.map(() => {
        jockeyRows.push(false);
      });
    }

    if (venuesData) {
      // eslint-disable-next-line array-callback-return
      venuesData.map(() => {
        venuesRows.push(false);
      });
    }

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

  renderName(val) {
    var data = val?.split(" ");
    var first = "";
    var second = "";
    var third = "";
    var fourth = "";

    if (data?.length === 1) {
      first = data[0];
    } else if (data?.length === 2) {
      first = data[0]?.charAt(0);
      second = data[1];
    } else if (data?.length === 3) {
      first = data[0]?.charAt(0);
      second = data[1]?.charAt(0);
      third = data[2];
    } else if (data?.length === 4) {
      first = data[0]?.charAt(0);
      second = data[1]?.charAt(0);
      third = data[2]?.charAt(0);
      fourth = data[3];
    } else {
      if (data) {
        first = data[0];
        second = data[1];
        third = data[2];
        fourth = data[3];
      }
    }

    if (data) {
      if (data[0] === "Ms") {
        return second + " " + third + " " + fourth;
      } else {
        return first + " " + second + " " + third + " " + fourth;
      }
    }
  }

  renderTable() {
    if (window.innerWidth < 700) {
      return (
        <div>
          <Table striped responsive style={{ marginTop: 24 }}>
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
                <th>Date</th>
                <th>Race Name</th>
              </tr>
            </thead>

            <tbody style={{ textAlign: "center", backgroundColor: "white" }}>
              {this.props.data?.races_result_aap?.map((zone, i) => {
                let data = (
                  <>
                    <tr onClick={() => this.openRow(i)} key={i}>
                      <td>
                        <Link to={`/profile/venue/${zone.TRACKCODE}`}>
                          {zone.venue_fullName}
                        </Link>
                      </td>
                      <td>
                        {moment(zone?.MEETDATE, "YYYY-MM-DD HH:mm:ss").format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td style={{ width: "32%" }}>{zone.RACENAME}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <Collapse
                          isOpen={this.state.openRows[i]}
                          style={{
                            backgroundColor: "#252525",
                            width: "100%",
                            paddingBottom: 8,
                          }}
                        >
                          <Col style={{ padding: 8 }}>
                            <Row
                              style={{
                                color: "white",
                                fontSize: 10,
                                marginBottom: 5,
                                textAlign: "left",
                              }}
                            >
                              <Col xs={3} style={{ marginTop: 4 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Position
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.PLACE}
                                </p>
                              </Col>
                              <Col xs={3} style={{ marginTop: 4 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Barrier
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.BARRIER}
                                </p>
                              </Col>
                              <Col xs={3} style={{ marginTop: 4 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Jockey
                                </p>
                                <Link
                                  to={`/profile/jockey/${
                                    zone?.jockey_id
                                  }/${zone?.real_jockey_name
                                    .split(" ")
                                    .join("-")}`}
                                >
                                  <p style={{ margin: 0, padding: 0 }}>
                                    {this.renderName(zone.jockey_name)}
                                  </p>
                                </Link>
                              </Col>
                              <Col xs={3} style={{ marginTop: 4 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Prize
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.HORSEPRIZE}
                                </p>
                              </Col>
                              <Col xs={3} style={{ marginTop: 8 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Win Margin
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.WPMARGIN}
                                </p>
                              </Col>
                              <Col xs={3} style={{ marginTop: 8 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Runners
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.STARTERS}
                                </p>
                              </Col>
                              <Col xs={3} style={{ marginTop: 8 }}>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  Distance
                                </p>
                                <p style={{ margin: 0, padding: 0 }}>
                                  {zone?.DISTANCE}
                                </p>
                              </Col>
                            </Row>
                          </Col>

                          {zone?.SECTDISTTIME ? (
                            <Col
                              xs={5}
                              style={{
                                marginTop: -8,
                                fontSize: 10,
                                textAlign: "left",
                                color: "white",
                                padding: 8,
                                marginBottom: 0,
                              }}
                            >
                              <p
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                Distance Time
                              </p>
                              <p style={{ margin: 0, padding: 0 }}>
                                {zone?.SECTDISTTIME}
                              </p>
                            </Col>
                          ) : null}
                        </Collapse>
                      </td>
                    </tr>
                  </>
                );
                return data;
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          <Table striped responsive style={{ marginTop: 24 }}>
            <thead
              style={{
                backgroundColor: "#142841",
                color: "white",
                textAlign: "center",
                width: "34%",
              }}
            >
              <tr>
                <th>Position</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Cond</th>
                <th>Distance</th>
                <th>Class</th>
                <th>Jockey</th>
                <th>Odds</th>
              </tr>
            </thead>

            <tbody style={{ textAlign: "center", backgroundColor: "white" }}>
              {this.props.data?.races_result_aap?.map((zone, i) => {
                let data = (
                  <tr key={i}>
                    {
                      <td>{zone.PLACE}</td>
                      /* <td><Link to={`/profile/venue/${zone.TRACKCODE}`}>{zone.venue_fullName}</Link></td>
                                    <td>{moment(zone?.MEETDATE, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY")}</td>
                                    <td>{zone.RACENAME}</td>
                                    <td>{zone.PLACE}</td>
                                    <td>{zone.BARRIER}</td>
                                    <td><Link to={`/profile/jockey/${zone.jockey_id}`}>{zone.jockey_name}</Link></td>
                                    <td>{zone.HORSEPRIZE}</td>
                                    <td>{zone.WPMARGIN}</td>
                                    <td>{zone.STARTERS}</td>
                                    <td>{zone.DISTANCE}</td>
                                    <td>{zone.SECTDISTTIME}</td> */
                    }
                  </tr>
                );
                return data;
              })}
            </tbody>
          </Table>
        </div>
      );
    }
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
                    <th>WIN</th>
                    <th>PLC</th>
                    <th>PLC %</th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingJockey?.map((element, i) => {
                    return (
                      <>
                        <tr
                          onClick={() => this.openJockeys(i)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{element?.jockey_name}</td>
                          <td>{element?.runs}</td>
                          <td>{element?.won}</td>
                          <td>
                            {((element?.won / element?.runs) * 100)?.toFixed(0)}
                            %
                          </td>
                          <td>
                            {element?.avgwin
                              ? "$ " + element?.avgwin.toFixed(2)
                              : "-"}
                          </td>
                          <td>{element?.place}</td>
                          <td>
                            {((element?.place / element?.runs) * 100)?.toFixed(
                              0
                            )}
                            %
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <Collapse
                              isOpen={this.state.openJockeys[i]}
                              style={{ padding: 8, backgroundColor: "#252525" }}
                            >
                              {/* <Col style={{ display: 'flex', color:'white', alignItems:'center', justiyContent:'flex-start'}}>
                                                                <div style={{width:'20%'}}>TRACKCODE</div>
                                                                <div  style={{width:'10%'}}>POS</div>
                                                                <div  style={{width:'16%'}}>DATE</div>
                                                                <div  style={{width:'40%'}}>COND</div>
                                                                <div  style={{width:'16%'}}>DSTNS</div>
                                                                <div  style={{width:'16%'}}>CLASS</div>
                                                                <div  style={{width:'16%'}}>ODD</div>
                                                            </Col> */}
                              {/* {console.log(this.props.data)} */}
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
                                          Place
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.PLACE}
                                        </strong>
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
                                        <strong style={{ fontSize: "12px" }}>
                                          {moment(index?.MEETDATE).format(
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
                                          Cond.
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.TRACKCOND}
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
                                          Dis
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.DISTANCE}M
                                        </strong>
                                      </div>
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
                                          Class
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.CLASS}
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
                                          Track Code
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.TRACKCODE}
                                        </strong>
                                      </div>
                                      <div
                                        style={{
                                          width: "10%",
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
                                          Price
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.PRICESP}
                                        </strong>
                                      </div>
                                      <div
                                        style={{
                                          width: "10%",
                                          marginRight: "5%",
                                          textAlign: "left",
                                          color: "white",
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        {index?.race_nav ? (
                                          <Link
                                            to={`/horse-racing-tips/${checkRouteDate(
                                              moment(index?.race_nav?.meetdate)
                                                .tz("Australia/Sydney")
                                                .format("DD-MM-YYYY")
                                            )}/${
                                              index?.race_nav?.track_name
                                            }/R${index?.race_nav?.race_num}/${
                                              index?.race_nav?.point_id
                                            }`}
                                          >
                                            <strong>
                                              <GoToIcon
                                                style={{ opacity: "50%" }}
                                                className="goto-icon"
                                                fontSize="24"
                                                color="white"
                                              />
                                            </strong>
                                          </Link>
                                        ) : null}
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
                  })}
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
                    <th>AVG WIN</th>
                    <th>PLC</th>
                    <th>PLC %</th>
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingVenues?.map((element, i) => {
                    return (
                      <>
                        <tr
                          onClick={() => this.openRow(i)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{element?.TRACKCODE}</td>
                          <td>{element?.runs}</td>
                          <td>{element?.won}</td>
                          <td>
                            {((element?.won / element?.runs) * 100).toFixed(0)}%
                          </td>
                          <td>
                            {element?.avgwin ? "$ " + element?.avgwin : "-"}
                          </td>
                          <td>{element?.place}</td>
                          <td>
                            {((element?.place / element?.runs) * 100).toFixed(
                              0
                            )}
                            %
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <Collapse
                              isOpen={this.state.openRows[i]}
                              style={{ padding: 8, backgroundColor: "#252525" }}
                            >
                              {element?.details?.map((index, i) => {
                                return (
                                  <Col>
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
                                        marginTop: i === 0 ? 16 : null,
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
                                        style={{ backgroundColor: "white" }}
                                      ></div>
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
                                          Place
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.PLACE}
                                        </strong>
                                      </div>
                                      <div
                                        style={{
                                          width: "16%",
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
                                        <strong style={{ fontSize: "12px" }}>
                                          {moment(index?.MEETDATE).format(
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
                                          Cond.
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.TRACKCOND}
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
                                          Dis.
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.DISTANCE}M
                                        </strong>
                                      </div>
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
                                          Class
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.CLASS}
                                        </strong>
                                      </div>
                                      <div
                                        style={{
                                          width: "16%",
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
                                          Jockey
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {this.renderName(index?.jockey_name)}
                                        </strong>
                                      </div>
                                      <div
                                        style={{
                                          width: "10%",
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
                                          Price
                                        </span>
                                        <strong style={{ fontSize: "12px" }}>
                                          {index?.PRICESP}
                                        </strong>
                                      </div>
                                      {index?.race_nav ? (
                                        <Link
                                          to={`/horse-racing-tips/${checkRouteDate(
                                            moment(index?.race_nav?.meetdate)
                                              .tz("Australia/Sydney")
                                              .format("DD-MM-YYYY")
                                          )}/${index?.race_nav?.track_name}/R${
                                            index?.race_nav?.race_num
                                          }/${index?.race_nav?.point_id}`}
                                        >
                                          <strong>
                                            <GoToIcon
                                              style={{ opacity: "50%" }}
                                              className="goto-icon"
                                              fontSize="24"
                                              color="white"
                                            />
                                          </strong>
                                        </Link>
                                      ) : null}
                                    </Col>
                                  </Col>
                                );
                              })}
                            </Collapse>
                          </td>
                        </tr>
                      </>
                    );
                  })}
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
                      $ WIN
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
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingJockey?.map((element, i) => {
                    return (
                      <>
                        <tr
                          onClick={() => this.openJockeys(i)}
                          style={{ cursor: "pointer", fontSize: 11 }}
                        >
                          <td>{element?.jockey_name}</td>
                          <td>{element?.runs}</td>
                          <td>{element?.won}</td>
                          <td>
                            {((element?.won / element?.runs) * 100)?.toFixed(2)}
                            %
                          </td>
                          <td>
                            {element?.avgwin
                              ? Number(element?.avgwin)?.toFixed(2)
                              : "-"}
                            %
                          </td>
                          <td>{element?.place}</td>
                          <td>
                            {((element?.place / element?.runs) * 100)?.toFixed(
                              2
                            )}
                            %
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <Collapse
                              isOpen={this.state.openJockeys[i]}
                              style={{ padding: 8, backgroundColor: "#252525" }}
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
                                        {index?.PLACE}
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                          padding: 0,
                                        }}
                                      >
                                        {moment(index?.MEETDATE).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </Col>
                                      <Col
                                        xs={3}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.TRACKCODE}
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.DISTANCE}M
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.CLASS}
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.race_nav ? (
                                          <Link
                                            to={`/horse-racing-tips/${checkRouteDate(
                                              moment(index?.race_nav?.meetdate)
                                                .tz("Australia/Sydney")
                                                .format("DD-MM-YYYY")
                                            )}/${
                                              index?.race_nav?.track_name
                                            }/R${index?.race_nav?.race_num}/${
                                              index?.race_nav?.point_id
                                            }`}
                                          >
                                            <strong>
                                              <GoToIcon
                                                style={{ opacity: "50%" }}
                                                className="goto-icon"
                                                fontSize="24"
                                                color="white"
                                              />
                                            </strong>
                                          </Link>
                                        ) : null}
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
                  })}
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
                      $ WIN
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
                  </tr>
                </thead>
                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {this.props.data?.bestPerformingVenues?.map((element, i) => {
                    return (
                      <>
                        <tr
                          onClick={() => this.openRow(i)}
                          style={{ cursor: "pointer", fontSize: 11 }}
                        >
                          <td style={{ textAlign: "center" }}>
                            {element?.TRACKCODE}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {element?.runs}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {element?.won}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {((element?.won / element?.runs) * 100)?.toFixed(2)}
                            %
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {element?.avgwin
                              ? Number(element?.avgwin)?.toFixed(2)
                              : 0.0}
                            %
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {element?.place}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {((element?.place / element?.runs) * 100)?.toFixed(
                              2
                            )}
                            %
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <Collapse
                              isOpen={this.state.openRows[i]}
                              style={{ padding: 8, backgroundColor: "#252525" }}
                            >
                              {element?.details?.map((index, i) => {
                                return (
                                  <Col
                                    xs={12}
                                    style={{ marginTop: 8, padding: 0 }}
                                    key={i}
                                  >
                                    <Row
                                      style={{
                                        backgroundColor: "#3c3c3c",
                                        borderRadius: 2,
                                        padding: 3,
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
                                        {index?.PLACE}
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                          padding: 0,
                                        }}
                                      >
                                        {moment(index?.MEETDATE).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </Col>
                                      <Col
                                        xs={3}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.jockey_name}
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.DISTANCE}M
                                      </Col>
                                      <Col
                                        xs={2}
                                        style={{
                                          color: "white",
                                          fontSize: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index?.CLASS}
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
                                        {index?.race_nav ? (
                                          <Link
                                            to={`/horse-racing-tips/${checkRouteDate(
                                              moment(index?.race_nav?.meetdate)
                                                .tz("Australia/Sydney")
                                                .format("DD-MM-YYYY")
                                            )}/${
                                              index?.race_nav?.track_name
                                            }/R${index?.race_nav?.race_num}/${
                                              index?.race_nav?.point_id
                                            }`}
                                          >
                                            <strong>
                                              <GoToIcon
                                                style={{ opacity: "50%" }}
                                                className="goto-icon"
                                                fontSize="24"
                                                color="white"
                                              />
                                            </strong>
                                          </Link>
                                        ) : null}
                                      </Col>
                                    </Row>
                                  </Col>
                                );
                              })}
                            </Collapse>
                          </td>
                        </tr>
                      </>
                    );
                  })}
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
    return this.renderChecker();
  }
}
