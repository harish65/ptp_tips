import React from 'react'
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons'

const trackColor = (trackCondition) => {
    switch (trackCondition) {
        case 'F':
            return '#000000'
        case 'G':
            return '#44BD32'
        case 'SO':
            return '#FFA800'
        case 'SY':
            return '#44BD32'
        case 'H':
            return '#F64F60'
        case 'N/A':
            return 'grey'
        case 'ABND':
            return '#FFA800'
        default:
            return 'grey'
    }
}

const splitFC = (val) => {
    switch (val) {
        case 'FIRM':
            return 'FIRM'
        case 'FIRM1':
            return 'FIRM 1'
        case 'FIRM2':
            return 'F2'
        case 'GOOD':
            return 'GOOD'
        case 'GOOD3':
            return 'GOOD 3'
        case 'GOOD4':
            return 'GOOD 4'
        case 'SOFT':
            return 'SOFT'
        case 'SOFT5':
            return 'SOFT 5'
        case 'SOFT6':
            return 'SOFT 6'
        case 'SOFT7':
            return 'SOFT 7'
        case 'HEAVY':
            return 'HEAVY'
        case 'HEAVY8':
            return 'HEAVY 8'
        case 'HEAVY9':
            return 'HEAVY 9'
        case 'HEAVY10':
            return 'HEAVY 10'
        case 'SYNTHETIC':
            return 'SYNTHETIC'
        default:
            return null
    }
}

const conditions = (trackCondition, fullCondition) => {
    switch (trackCondition) {
        case 'F':
            return fullCondition ? splitFC(fullCondition.toUpperCase()) : 'FIRM'
        case 'G':
            return fullCondition ? splitFC(fullCondition.toUpperCase()) : 'GOOD'
        case 'SO':
            return fullCondition ? splitFC(fullCondition.toUpperCase()) : 'SOFT'
        case 'SY':
            return 'SYNTHETIC'
        case 'H':
            return fullCondition ? splitFC(fullCondition.toUpperCase()) : 'HEAVY'
        case 'N/A':
            return 'N/R'
        case 'ABND':
            return 'ABND'
        default:
            return 'GOOD'
    }
}


const renderNames = (val) => {
    /**
     * An exception was thrown for some races with no Jockey's details
     * I surrounded this method with try-catch Block.
     */
    try {

        let formatedName = ""
        var firstSplit = val?.split('-')

        if (firstSplit?.length > 0) {
            formatedName = firstSplit.join(' ')
        }
        else {
            formatedName = val
        }

        var data = formatedName?.split(" ")
        let len = data.length - 1
        let final = ""
        data.forEach((zone, i) => {
            if (i === len) {
                final += zone
                final = final.trim()
                if (final.length > 13) {
                    final = final.substring(0, 12) + "..."
                }
            } else {
                if (zone === '&') {

                }
                if (zone !== 'Ms' && zone !== 'Mr' && zone !== 'Mrs') {
                    final += zone.charAt(0) + " "
                }
            }
        })

        return final
    } catch (error) {
        console.log(error);
    }
}

const colColor = (val, col) => {
    if (val === col) {
        return 'rgba(247,240,175,0.6)'
    } else {
        return 'Transparent'
    }
}

const silkSize = (num) => {
    if (num === 0) {
        return 0
    } else if (num === 1) {
        return -32
    } else {
        return -32 * num
    }
}

const fullTrackCond = (val) => {
    switch (val) {
        case 'Firm':
            return 'F'
        case 'Firm1':
            return 'F1'
        case 'Firm2':
            return 'F2'
        case 'Good':
            return 'G'
        case 'Good3':
            return 'G3'
        case 'Good4':
            return 'G4'
        case 'Soft':
            return 'S'
        case 'Soft5':
            return 'S5'
        case 'Soft6':
            return 'S6'
        case 'Soft7':
            return 'S7'
        case 'Heavy':
            return 'H'
        case 'Heavy8':
            return 'H8'
        case 'Heavy9':
            return 'H9'
        case 'Heavy10':
            return 'H10'
        case 'Synthetic':
            return 'SY'
        default:
            return null
    }
}


const badgeFirts = () => {
    return <div style={{ textAlign: 'center' }}><Badge style={{ minWidth: 'calc(100% - 8px)', backgroundColor: 'rgb(252, 179, 24', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>1st</strong></Badge></div>
}
const badgeSecond = () => {
    return <div style={{ textAlign: 'center' }}><Badge style={{ backgroundColor: 'rgb(9, 106, 179)', minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>2ND</strong></Badge></div>
}
const badgeThird = () => {
    return <div style={{ textAlign: 'center' }}><Badge style={{ backgroundColor: 'rgb(139, 52, 191)', minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>3RD</strong></Badge></div>
}
const badgeFourth = () => {
    return <div style={{ textAlign: 'center' }}><Badge style={{ backgroundColor: 'black', minWidth: 80, marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>4TH</strong></Badge></div>
}
const badgeLost = () => {
    return <div style={{ textAlign: 'center' }}><Badge color="danger" style={{ minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>LOST</strong></Badge></div>
}

const badgeABND = () => {
    return <div style={{ textAlign: 'center' }}><Badge color="warning" style={{ minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'white' }}>ABND</strong></Badge></div>
}

const badgeNA = () => {
    return <div style={{ textAlign: 'center' }}><Badge color="secondary" style={{ minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'red' }}>N/R</strong></Badge></div>
}

const badgeTBA = () => {
    return <div style={{ textAlign: 'center' }}><Badge style={{ minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3 }}><strong style={{ color: 'orange' }}>TBA</strong></Badge></div>
}

const badgePTP = () => {
    return <div style={{ textAlign: 'center', fontSize: 10 }}><Badge color="primary"><FontAwesomeIcon icon={faHorseHead} size="1x" /></Badge></div>
}

const fullTrackCondition = (trackCondition, fullTrackCondistion) => {
    return <Badge style={{ minWidth: 'calc(100% - 8px)', marginRight: 1, marginLeft: 1, padding: 3, background: trackColor(trackCondition), }}>
        <strong style={{ color: 'white' }}>{conditions(trackCondition, fullTrackCondistion)}</strong>
    </Badge>
}

export {
    trackColor,
    conditions,
    fullTrackCond,
    renderNames,
    colColor,
    silkSize,
    badgeFirts,
    badgeSecond,
    badgeThird,
    badgeFourth,
    badgeLost,
    badgeABND,
    badgeNA,
    badgeTBA,
    badgePTP,
    fullTrackCondition
}