import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from "moment-timezone"
import Badge from 'reactstrap/lib/Badge';
import { Row, Col } from 'reactstrap';


function ExpandableCard(props) {

    const [isOpen, setOpen] = useState(false)
    return (
                <Col xs={9} sm={6} md={4} lg={3} style={{ backgroundColor: 'white', borderRadius: 10, marginRight: 16, padding: 0, paddingTop: 8, paddingBottom: 8 }} onClick={()=>{setOpen(!isOpen)}}>
                                            <Col lg={12} style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding:0 }}>

                                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', padding: 0, marginLeft:8}}>
                                                    <strong>{props?.stats?.runs +" Runs"}</strong>
                                                </div>


                                            
                                                <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0 ,marginRight:8}}>
                                                    <Badge style={{ backgroundColor: '#44bd32', color: 'white' }}> <strong>{moment(props?.stats.meetdate).format("ddd D")}</strong> <span>{moment(props?.stats.meetdate).format("MMM YYYY")}</span></Badge>
                                                </div>

                                            </Col>

                                            <Col xs={12} md={12} lg={12} style={{ width: '100%', marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                                                <Row>
                                                    <Col style={styles.selectionRateCol}>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{props?.stats?.won}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>WIN</span>
                                                        </div>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{props?.stats?.place}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>PLACE</span>
                                                        </div>
                                                    </Col>

                                                    <Col style={styles.selectionRateCol}>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{((props?.stats?.won / props?.stats?.runs) * 100)?.toFixed(2) + '%'}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>WIN%</span>
                                                        </div>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{((props?.stats?.place / props?.stats?.runs) * 100)?.toFixed(2) + '%'}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>PLACE%</span>
                                                        </div>
                                                    </Col>

                                                    <Col style={styles.selectionRateCol}>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{props?.stats.winOdd?.toFixed(2)}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>WIN$</span>
                                                        </div>
                                                        <div style={styles.selectionRateValueContainer}>
                                                            <strong style={{ fontSize: 16 }}>{props?.stats.placeOdd?.toFixed(2)}</strong>
                                                            <span style={{ marginTop: -4, fontSize: 11 }}>PLACE$</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            {/* <Collapse isOpen={isOpen}>
                    <CardBody style={{ padding: 1 }} >
                        <Table striped responsive>
                            <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                <tr>
                                    <th>date</th>
                                    <th>number</th>
                                    <th>result</th>
                                    <th>track cond</th>
                                    <th>track desc</th>
                                    <th>track distance</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                {props.stats?.details?.map((zone, i) => {
                                    let data = <tr key={i}>
                                        <td>{moment(zone.meetdate+' '+zone.race_time).format('DD-MM-YYYY HH:mm')}</td>
                                        <td><Link to={`/horse-racing-tips/${checkRouteDate(moment(zone.meetdate, "YYYY-MM-DD").format("DD-MM-YY"))}/${zone.track_name}/R${zone.race_num}/${zone.point_id}`}>{zone.race_num}</Link></td>
                                        <td>{zone.result}</td>
                                        <td>{zone.track_condition}</td>
                                        <td>{zone.track_description}</td>
                                        <td>{zone.track_distance}</td>
                                    </tr>
                                    return (data)
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Collapse> */}
                    </Col>     
    )
}

const styles = {
    mobileSlider: {
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'auto',
        marginTop: 16
    },
    selectionRateCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    selectionRateValueContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

}
const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps)(ExpandableCard)
