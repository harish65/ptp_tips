import React from 'react';
import {  useDispatch } from "react-redux";
import { CustomInput, Col, } from "reactstrap";

import Next10 from "../../../components/Next10/Next10";
import actions from "../../../redux/actions/selections";

export default (props) => {
   const dispatch = useDispatch();
   const PROPS= props.props;

   const selectCTCN = (e) => {
      dispatch(actions.selectCTCN(e.target.checked));
   };

   const selectNRNext = (e) => {
      dispatch(actions.selectNRNext(e.target.checked));
      dispatch(actions.getNextTen(e.target.checked));
   };


   if (window.innerWidth < 1200) {
      return (
         <Col xs="12" lg="12" xl="2" style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
               <h5
                  style={{
                     backgroundColor: "rgb(20, 40, 65)",
                     height: 32,
                     borderRadius: 4,
                     textAlign: "center",
                     padding: 5,
                     color: "white",
                     fontWeight: "600",
                     margin: 0,
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     width: "300px",
                     marginLeft: "auto",
                     marginRight: "auto",
                  }}
               >
                  <span>NEXT PTP TIPS</span>
                  <CustomInput
                     type="checkbox"
                     id="CTCN"
                     label="CTC"
                     checked={PROPS.showCTCN}
                     onChange={(e) => selectCTCN(e)}
                  />
                  <CustomInput
                     type="checkbox"
                     id="NRNext"
                     label="N/R"
                     checked={PROPS.showNextNR}
                     onChange={(e) => selectNRNext(e)}
                  />
               </h5>
            </div>
            <div
               style={{
                  display: "flex",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  marginBottom: "8px",
               }}
            >
               <Next10 />
            </div>
         </Col>
      );
   } else {
      return (
         <Col xs="12" lg="3" xl="2" style={{ paddingRight: "1px" }}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 5,
                  backgroundColor: "rgb(20, 40, 65)",
                  color: "white",
                  height: 32,
                  paddingTop: "3%",
                  borderRadius: 4,
               }}
            >

               <h5
                  style={{
                     textAlign: "center",
                     color: "white",
                     fontWeight: "600",
                     fontSize: 14,
                  }}
               >
                  NEXT PTP TIPS
               </h5>
               <CustomInput
                  type="checkbox"
                  id="CTCN"
                  label="CTC"
                  checked={PROPS.showCTCN}
                  onChange={(e) => selectCTCN(e)}
               />
               <CustomInput
                  type="checkbox"
                  id="NRNext"
                  label="N/R"
                  checked={PROPS.showNextNR}
                  onChange={(e) => selectNRNext(e)}
               />
            </div>
            <div className="next10">
               <Next10 Open={true} />
            </div>
         </Col>
      );
   }
}






