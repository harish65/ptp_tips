import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import TableMobile from './TableMobile'
import TableDesktop from './TableDesktop'

import resultAction from '../../../../redux/actions/results'


export const VenueTable = (props) => {

    const [allABND, setAllABND] = useState(false)
    const [selections, setSelections] = useState(0)
    const [win, setWin] = useState(0)
    const [second, setSecond] = useState(0)
    const [third, setThird] = useState(0)
    const [lost, setLost] = useState(0)

    useEffect(() => {
        setAllABND(false)
        let len = []
        var selec = 0;
        var win = 0;
        var lose = 0;
        var secnd = 0;
        var third = 0;
        let all = props.results[props.selectedVenue]?.venue_details?.length
        let loop = props.results[props.selectedVenue]?.venue_details?.map((zone, i) => {
            if (zone.track_condition === 'ABND') {
                // check if the full venue is abnd
                len.push(true)
            }
            if (zone.is_na !== 1 && zone.track_condition !== "ABND") {
                if (zone.result === "WON") {
                    win = win + 1
                    selec = selec + 1
                }
                else if (zone.result === "LOST") {
                    lose = lose + 1
                    selec = selec + 1
                }
                else if (zone.result === "2ND") {
                    secnd = secnd + 1
                    selec = selec + 1
                }
                else if (zone.result === "3RD") {
                    third = third + 1
                    selec = selec + 1
                }
            }
        })
        setSelections(selec)
        setWin(win)
        setSecond(secnd)
        setThird(third)
        setLost(lose)
        if (len.length === all) {
            setAllABND(true)
        }
        // console.log('VENUE', props.results[props.selectedVenue])
    }, [props.selectedVenue])

    const checkTable = () => {
        if (window.innerWidth < 900) {
            return (
                <TableMobile allABND={allABND}
                    selections={selections}
                    win={win}
                    second={second}
                    third={third}
                    lost={lost}
                />
            )
        }
        else {
            return <TableDesktop allABND={allABND}
                selections={selections}
                win={win}
                second={second}
                third={third}
                lost={lost}
            />
        }
    }

    return (
        <>
            {checkTable()}
        </>
    )
}

const mapStateToProps = (state) => ({
    results: state.resultsReducer.results,
    selectedVenue: state.resultsReducer.selectedVenue,
    dailyPerformance: state.resultsReducer.dailyPerformance
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedVenue: (data) => dispatch(resultAction.setSelectedVenue(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueTable)
