import React from 'react';
import { Loader } from 'semantic-ui-react';
import ReactDelayRender from 'react-delay-render';

const Loading = () => 

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft:" -50px",
        width: "100px",
        height: "100px",}}>
          <Loader 
                  active inline="centered"
           />       
        </div>
    

export default ReactDelayRender({ delay: 300 })(Loading);