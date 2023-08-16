import React from 'react';
import { CustomInput, Col, } from "reactstrap";
import { useDispatch } from "react-redux";

import Last10 from "../../../components/NextLast/Last10New";
import actions from "../../../redux/actions/selections";


export default (props) => {
  const PROPS = props.props;
  const dispatch = useDispatch();
  const selectNRLast = (e) => {
    dispatch(actions.selectNRLast(e.target.checked));
    dispatch(actions.getLastTen(e.target.checked));
  };
  const selectCTCL = (e) => {
    dispatch(actions.selectCTCL(e.target.checked));
  };

  if (window.innerWidth < 1280) {
    return (
      <Col xs="12" lg="12" xl="2" style={{ marginTop: "24px" }}>
        <h5
          style={{
            backgroundColor: "rgb(20, 40, 65)",
            height: 32,
            borderRadius: 4,
            textAlign: "center",
            color: "white",
            fontWeight: "600",
            margin: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 5,
          }}
        >
          <span>PREV PTP TIPS</span>
          <CustomInput
            type="checkbox"
            id="CTCL"
            label="CTC"
            checked={PROPS.showCTCL}
            onChange={(e) => selectCTCL(e)}
          />
          <CustomInput
            type="checkbox"
            id="NRLast"
            label="N/R"
            checked={PROPS.showLastNR}
            onChange={(e) => selectNRLast(e)}
          />
        </h5>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <Last10 Open={true} />
        </div>
      </Col>
    );
  } else {
    return (
      <Col xs="12" lg="3" xl="2" style={{ paddingLeft: "1px" }}>
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
            PREV PTP TIPS
          </h5>
          <CustomInput
            type="checkbox"
            id="CTCL"
            label="CTC"
            checked={PROPS.showCTCL}
            onChange={(e) => selectCTCL(e)}
          />
          <CustomInput
            type="checkbox"
            id="NRLast"
            label="N/R"
            checked={PROPS.showLastNR}
            onChange={(e) => selectNRLast(e)}
          />
        </div>
        <div className="next10">
          <Last10 Open={true} />
        </div>
      </Col>
    );
  }
}






