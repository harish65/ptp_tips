import React from 'react'
import { connect } from 'react-redux'

import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead, faStar } from '@fortawesome/free-solid-svg-icons'

/* ICONS */
import Arrow from '../../../../../assets/Icons/arrowDes.png'

export const Legend = (props) => {

    const renderLegend = () => {
        if (window.innerWidth > 769) {
            return (
                <div style={{ backgroundColor: props.dark ? '#1D1D1C' : 'white', height: 32, display: 'flex', padding: 8, marginTop: -16, }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 11, pacity: '100%', padding: 0 }}><Badge color="primary"><FontAwesomeIcon icon={faHorseHead} size="1x" style={{ width: 14 }} /></Badge></p>
                        <strong style={{ marginLeft: 8, color: props.dark ? 'white' : "" }}>PTP TIP</strong>
                    </div>

                    <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 11, pacity: '100%', padding: 0 }}><Badge color="warning"><FontAwesomeIcon icon={faStar} size="1x" style={{ width: 14 }} /></Badge></p>
                        <strong style={{ marginLeft: 8, color: props.dark ? 'white' : "" }}>FAVOURITE</strong>
                    </div>

                    <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 11, pacity: '100%', padding: 0 }}><Badge color="" style={{ backgroundColor: 'rgb(9, 106, 179)', padding: 2, paddingLeft: 8, paddingRight: 8 }}><img alt='Arrow' src={Arrow} width={14} style={{ marginTop: 3 }} size="1x" /></Badge></p>
                        <strong style={{ marginLeft: 8, color: props.dark ? 'white' : "" }}>MARKET MOVER</strong>
                    </div>

                    <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 11, pacity: '100%', padding: 0 }}><Badge color="danger" style={{ padding: 2, paddingLeft: 8, paddingRight: 8 }}><img alt='Arrow' src={Arrow} width={14} style={{ marginTop: 3 }} size="1x" /></Badge></p>
                        <strong style={{ marginLeft: 8, color: props.dark ? 'white' : "" }}>LATE MARKET MOVER</strong>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ backgroundColor: 'white', padding: 8, display: 'flex', flexDirection: 'row', marginTop: -4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Badge color="primary" style={{ fontSize: 8 }}><FontAwesomeIcon icon={faHorseHead} size="1x" /></Badge>
                        <strong style={{ marginLeft: 4 }}>PTP TIP</strong>
                    </div>
                    <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Badge color="warning" style={{ fontSize: 8 }}><FontAwesomeIcon icon={faStar} size="1x" /></Badge>
                        <strong style={{ marginLeft: 4 }}>FAV</strong>
                    </div>
                    <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Badge color="primary" style={{ fontSize: 4.5, backgroundColor: 'rgb(9, 106, 179)', marginTop: -4 }}><img alt='Arrow' src={Arrow} width="14px" /></Badge>
                        <strong style={{ marginLeft: 4, marginTop: -4 }}>MM</strong>
                    </div>
                    <br />
                    <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Badge color="danger" style={{ fontSize: 4.5, marginTop: -4 }}><img alt='Arrow' src={Arrow} width="14px" /></Badge>
                        <strong style={{ marginLeft: 4, marginTop: -4 }}>LATE MM</strong>
                    </div>
                </div>
            )
        }
    }

    return renderLegend()
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
