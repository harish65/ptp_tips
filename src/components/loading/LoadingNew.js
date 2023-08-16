import React from 'react'
import { Spinner } from 'reactstrap';

function LoadingNew() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 24 }}>
          <Spinner  style={{ width: '3rem', height: '3rem', color: '#44bd32', textAlign:"center", justifyContent:"center", alignSelf:"center", alignContent:"center"}} type="grow" />
          <h1 style={{ textAlign: 'center', fontSize: 18, marginTop: 8, opacity: '50%', fontWeight: 400 }}>Loading</h1>
        </div>
    )
}

export default LoadingNew
