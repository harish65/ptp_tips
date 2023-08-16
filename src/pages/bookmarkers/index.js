import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import SkeletonLoader from "./components/SkeletonLoader";
import BookmarkCard from "./components/BookmakerCard";
import Pagination from "@material-ui/lab/Pagination";
import ACTIONS from "../../redux/actions/bookmakerActions";
import RenderNext10 from "./components/RenderNext10";
import RenderLast10 from "./components/RenderLast10";
import "./bookmakers.scss";

const Bookmakers = (props) => {
  const [isLoading, setLoading] = React.useState(
    props.BOOK_MAKERS_DATA ? false : true
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [bookmakersArr, setBookmakersArr] = React.useState(
    props.BOOK_MAKERS_DATA
  );
  const [totalPages,setTotalPages] = React.useState(
    Math.ceil(props.BOOK_MAKERS_DATA?.length / rowsPerPage) || 1
  );
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    props.fetchBookMakersData().then((res) => {
     
      if (res?.status) {
        setBookmakersArr(res.data);
        setTotalPages(Math.ceil(res.data.length / rowsPerPage) || 1);
        setLoading(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ marginTop: 32 }}>
        <Helmet>
          <title>Australian Bookmakers</title>
        </Helmet>

        <section className="bookmakers-root">
          <Row>
            <RenderNext10 props={props} />
            {/* <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}></Col > */}
            <Col xl={8} lg={6} style={{ padding: 0 }}>
              <Col xs={12} style={{ marginTop: 20 }}>
                <h1 style={{ textAlign: "center", marginBottom: "18px" }}>
                  Australian Bookmakers
                </h1>
                <div className="bookmaker-list">
                  <Row
                    style={{ justifyContent: "center", alignItems: "center" }}
                    className="pic-listing-row"
                  >
                    {isLoading ? (
                      [0, 0, 0].map((item, i) => (
                        <Col md={12} key={i} className="bookmaker-grid">
                          <div className="bookmaker-card">
                            <SkeletonLoader dark={props.dark} />
                          </div>
                        </Col>
                      ))
                    ) : bookmakersArr?.length === 0 ? (
                      <div className="no-data">
                        <h2>No data</h2>
                      </div>
                    ) : (
                      bookmakersArr
                        ?.slice(
                          (page - 1) * rowsPerPage,
                          (page - 1) * rowsPerPage + rowsPerPage
                        )
                        .map((item, i) => (
                          <Col md={12} key={i} className="bookmaker-grid">
                            <div className="bookmaker-card">
                              <BookmarkCard data={item} />
                            </div>
                          </Col>
                        ))
                    )}
                  </Row>
                </div>
                {totalPages > 1 && (
                  <div className="bookmakers-pagination">
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      variant="outlined"
                      shape="rounded"
                    />
                  </div>
                )}
              </Col>
            </Col>
            <RenderLast10 props={props} />
            {/* <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}></Col > */}
          </Row>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  BOOK_MAKERS_DATA: state.bookMakerReducer?.bookmakerData,
  showCTCN: state.selectionReducer.showCTCN,
  showCTCL: state.selectionReducer.showCTCL,
  showNextNR: state.selectionReducer.showNextNR,
  showLastNR: state.selectionReducer.showLastNR,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookMakersData: () => dispatch(ACTIONS.fetchBookmakersData()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Bookmakers)
);
