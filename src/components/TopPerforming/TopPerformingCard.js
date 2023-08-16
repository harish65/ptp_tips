import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'

//CSS
import "./TopPerformingCard.scss"

export const TopPerformingCard = (props) => {
    return (
        <div>
            <div className="top_performing_wrapper">
                <h4>{props.day}</h4>
                {props.data.horsePtp.length > 0 ?
                    <div>
                        <h3>Best PTP Horses</h3>
                        {
                            props.data.horsePtp.map((zone, i) => {
                                if (i < 9) {
                                    return (
                                        <div>
                                            <div><strong>{i + 1}.</strong>{zone.horse_name}</div>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>{zone?.runs}</div>
                                                    <div>RUNS</div>
                                                </Col>
                                                <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>{zone?.won}</div>
                                                    <div>WIN</div>
                                                </Col>
                                                <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>{zone?.place}</div>
                                                    <div>PLC</div>
                                                </Col>
                                                <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>{zone?.winOdd?.toFixed(2)}</div>
                                                    <div>$WIN</div>
                                                </Col>
                                                <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>{zone?.placeOdd?.toFixed(2)}</div>
                                                    <div>$PLC</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                    )
                                } else { return (null) }
                            })
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps)(TopPerformingCard)
