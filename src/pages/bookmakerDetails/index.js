import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SkeletonLoader from "./SkeletonLoader";
import "./BookmakerDetail.scss";
import { toast } from "react-toastify";

import {
  GeneralInfo,
  Features,
  ProsAndCons,
  CustomerSupport,
  Review,
  Website,
  MobileApps,
  LicensingAndSecurity,
  PaymentMethods,
  RegistrationSteps,
  VerificationSteps,
} from "./components";

const BookmakerDetails = (props) => {
  const history = useHistory();
  let { bookmakerId } = useParams();
  const [isLoading, setLoading] = React.useState(true);
  let bookmakerData;

  if (!props.allBookmakerData) {
    history.push("/bookmakers");
  } else {
    const currentBookmaker = props.allBookmakerData?.filter((x) => {
      return x.id == bookmakerId;
    });
    if (!currentBookmaker[0]) {
      history.push("/bookmakers");
      toast.error("Invalid Bookmaker");
    }
    bookmakerData = currentBookmaker[0];
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(!!bookmakerData ? false : true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmakerId]);

  return (
    <>
      <div style={{ marginTop: 18 }}>
        <Helmet>
          <title>Australian Bookmakers</title>
        </Helmet>
        <section className="bookmaker-details-root">
          <Row>
            <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}></Col>
            <Col xl={8} lg={6} style={{ padding: 0 }}>
              <Col xs={12} style={{ marginTop: 20 }}>
                <h1 style={{ textAlign: "center", marginBottom: "36px" }}>
                  {bookmakerData?.basicInfo?.name}
                </h1>
                {isLoading ? (
                  [0, 0, 0].map((item, i) => (
                    <div key={i}>
                      <SkeletonLoader dark={props.dark} />
                    </div>
                  ))
                ) : (
                  <>
                    <GeneralInfo data={bookmakerData} />
                    <Features data={bookmakerData} />
                    <ProsAndCons data={bookmakerData} />
                    <CustomerSupport data={bookmakerData} />
                    <Review data={bookmakerData} />
                    <Website data={bookmakerData} />
                    <MobileApps data={bookmakerData} />
                    <LicensingAndSecurity data={bookmakerData} />
                    <PaymentMethods data={bookmakerData} />
                    {bookmakerData?.registration_process && (
                      <RegistrationSteps data={bookmakerData} />
                    )}
                    <VerificationSteps data={bookmakerData} />
                  </>
                )}
              </Col>
            </Col>
            <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}></Col>
          </Row>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  allBookmakerData: state.bookMakerReducer.bookmakerData,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookmakerDetails)
);
