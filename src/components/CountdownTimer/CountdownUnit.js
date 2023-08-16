import React from 'react';

const CountdownUnit = ({ countdownUnit }) => {

  return (
    <div
        style={{display: 'inline-block',
                margin: '10px',
                minWidth: '40px',
                textAlign: 'center',
                backgroundColor: 'rgba(156,217,107, 0.7)',
                borderRadius: '5px',
                height: '40px'}}>
      <div style={{color: 'white', fontSize: '2.2rem'}}>{countdownUnit.value}</div>
      <div style={{color: 'white', marginBottom: '10px', textTransform: 'capitalize' , fontSize: '1rem'}}>{countdownUnit.unit}</div>
    </div>
  );
}

export default CountdownUnit;