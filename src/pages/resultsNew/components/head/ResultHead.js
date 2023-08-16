import React from 'react'
import { connect } from 'react-redux'

import HeadMobile from './HeadMobile'
import HeadDesktop from './HeadDesktop'

export const ResultHead = (props) => {

    const checkHead = () => {
        if (window.innerWidth < 900) {
            return (
                <HeadMobile transferRoute={props.transferRoute}/>
            )
        }
        else {
            return <HeadDesktop transferRoute={props.transferRoute}/>
        }
    }

    return (
        <>
            {checkHead()}
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ResultHead)
