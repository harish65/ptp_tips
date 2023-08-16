import React from 'react'
import { connect } from 'react-redux'

import { Badge } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHorseHead, faStar } from '@fortawesome/free-solid-svg-icons'

/* ICONS */
// import Arrow from '../../../assets/Icons/arrowDes.png'

export const Legend = (props) => {

    const renderLegend = () => {
        if (window.innerWidth > 769) {
            return (
                <div style={{ backgroundColor: 'white', height: 32, display: 'flex', padding: 8, marginTop: 0, textAlign: "left" }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 13, padding: 0, color: 'rgb(250, 120, 0)', fontWeight: 600 }}>N/R</p>
                        <strong style={{ marginLeft: 8, padding: 0, fontSize: 13, }}>No Selections Available Due To Insufficient Racing History</strong>
                    </div>

                    <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: 13, padding: 0, color: 'rgb(250, 120, 0)', fontWeight: 600 }}>ABND</p>
                        <strong style={{ marginLeft: 8, padding: 0, fontSize: 13, }}>Abandoned</strong>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ backgroundColor: 'white', padding: 8, marginTop: 0, textAlign: "left" }}>
                    <p style={{ fontSize: 13, }}> <strong style={{ fontSize: 13, padding: 0, color: 'rgb(250, 120, 0)', fontWeight: 600 }}>N/R:</strong> No Selections Available Due To Insufficient Racing History</p>
                    <p style={{ fontSize: 13, }}> <strong style={{ fontSize: 13, padding: 0, color: 'rgb(250, 120, 0)', fontWeight: 600 }}>ABND:</strong> Abandoned </p>
                </div>
                // <div style={{ backgroundColor: 'white', padding: 8, display: 'flex', flexDirection: 'row', marginTop: -4 }}>
                //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                //         <Badge color="primary" style={{ fontSize: 8 }}><FontAwesomeIcon icon={faHorseHead} size="1x" /></Badge>
                //         <strong style={{ marginLeft: 4 }}>PTP TIPS</strong>
                //     </div>
                //     <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                //         <Badge color="warning" style={{ fontSize: 8 }}><FontAwesomeIcon icon={faStar} size="1x" /></Badge>
                //         <strong style={{ marginLeft: 4 }}>FAVOURITE</strong>
                //     </div>
                //     <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                //         <Badge color="primary" style={{ fontSize: 4.5, backgroundColor: 'rgb(9, 106, 179)', marginTop: -4 }}><img src={Arrow} width="14px" /></Badge>
                //         <strong style={{ marginLeft: 4, marginTop: -4 }}>MM</strong>
                //     </div>
                //     <br />
                //     <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                //         <Badge color="danger" style={{ fontSize: 4.5, marginTop: -4 }}><img src={Arrow} width="14px" /></Badge>
                //         <strong style={{ marginLeft: 4, marginTop: -4 }}>LATE MM</strong>
                //     </div>
                // </div>
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
