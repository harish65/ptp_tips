import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions/CurrentSubscription";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "@material-ui/core/TablePagination";

const SubscriptionHistory = (props) => {
  const [currentplan, setCurrentPlan] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchinp, setSearchinp] = React.useState("");

  const lastind = currentplan.length;

  useEffect(() => {
    if (props.currentUser) {
      props
        .dispatch(
          actions.CurrentSubscription({
            client_id: props.currentUser.id,
          })
        )
        .then((res) => {
          setCurrentPlan(res?.data);
        });
    } else {
      setCurrentPlan([]);
    }
  }, [props.currentUser]);

  const cardStyle = {
    backgroundColor: "white",
    color: "#142841",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 35,
  };
  // main component styling
  const divStyle = {
    margin: "15 0",
    display: "flex",
    justifyContent: "space-between",
  };

  // for pagination==================================================================
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Searchinput = (e) => {
    setSearchinp(e.target.value.toLowerCase());
  };

  return (
    <>
      {!props.currentUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "64px",
            flexDirection: "column",
          }}
        >
          <h1>You are not Logged In.</h1>
          <p style={{ fontSize: "15px", width: "260px", textAlign: "center" }}>
            Please login to your PTP Account to access this page.
          </p>
        </div>
      ) : (
        <>
          {!currentplan.length > 0 ? (
            <div
              class="d-flex justify-content-center"
              style={{ height: "100vh", alignItems: "center" }}
            >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div class="card mt-4 " style={{ maxWidth: "770px" }}>
                <div class="card-header">Active Plan Details</div>
                <div
                  class="card-body"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(16, 74, 96), #997e7b)",
                    color: "white",
                  }}
                >
                  <div className="d-flex justify-content-around">
                    <div>
                      <h5 class="card-title">
                        Current Plan:{" "}
                        <b>{currentplan[lastind - 1].plan_name} </b>
                      </h5>
                    </div>

                    <div>
                      <h5 class="card-title">
                        Start Date:{" "}
                        <b>{currentplan[lastind - 1].start_date} </b>
                      </h5>
                    </div>
                  </div>

                  <div className="d-flex justify-content-around mt-3">
                    <div>
                      <h5 class="card-title">
                        Amount: <b>${currentplan[lastind - 1].amount}</b>
                      </h5>
                    </div>

                    <div>
                      <h5 class="card-title">
                        Expire Date: <b>{currentplan[lastind - 1].end_date} </b>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col col-md-12" style={cardStyle}>
                <div style={divStyle}>
                  <h1>Subscription History </h1>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="subscription type"
                      aria-label="Search"
                      onChange={Searchinput}
                    />
                    <SearchIcon style={{ padding: 2 }} />
                  </div>
                </div>
                <div class="bd-example">
                  <div class="table-responsive-sm">
                    <table
                      class="table"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #142841 , #104A60)",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      <thead>
                        <tr class="thead-dark ">
                          <th scope="col">Subscription Id</th>
                          <th scope="col">Subscription Type</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentplan &&
                          currentplan
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((ele, index) => {
                              return (
                                <>
                                  <tr>
                                    <td scope="row">
                                      {index + 1 + page * rowsPerPage}
                                    </td>
                                    <td>{ele.plan_name}</td>
                                    <td>{ele.start_date}</td>
                                    <td>{ele.end_date}</td>
                                    <td>${ele.amount}</td>
                                  </tr>
                                </>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div></div>

                <div className={classes.root}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={currentplan ? currentplan.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    class={{ color: "snow" }}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.isLoggedIn,
  currentsubscriptionreducer: state.currentsubscriptionreducer.CurrentPlan,
});

export default connect(mapStateToProps)(SubscriptionHistory);
