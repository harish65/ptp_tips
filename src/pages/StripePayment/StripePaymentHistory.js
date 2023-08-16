import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "@material-ui/core/TablePagination";
import { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions/StripeTransactions";

const StripePaymentHistory = (props) => {
  // console.log("props", props.currentUser.id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchinp, setSearchinp] = React.useState("");
  const [TranscationData, setTransactionData] = React.useState([]);
  console.log("TranscationData",TranscationData)

  useEffect(() => {
    if (props.currentUser) {
      props
        .dispatch(
          actions.StripeTransactions({
            client_id: props.currentUser.id,
          })
        )
        .then((res) => {
          setTransactionData(res?.data);
        });
    } else {
      setTransactionData([]);
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

{
  !TranscationData.length > 0
  ?
          <div class="d-flex justify-content-center" style={{height: '100vh',
            alignItems: 'center'}}>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div> :
        <div class="col col-md-12" style={cardStyle}>
  <div style={divStyle}>
    <h1>Transcation History </h1>
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
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
            <th scope="col">Transcation Id</th>
            <th scope="col">Transcation Date</th>
            <th scope="col">Email</th>
            <th scope="col">Transcation status</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>

        <tbody>
          {TranscationData &&
            TranscationData.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
              .filter((item) => {
                return item.payment_status
                  .toLowerCase()
                  .includes(searchinp);
              })
              .map((ele, index) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{index + 1+(page*rowsPerPage)}</th>
                      <td>{ele.created_at}</td>
                      <td>{ele.client_email}</td>

                      <td>{ele.payment_status}</td>
                      <td>{ele.amount}</td>
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
      count={TranscationData ? TranscationData.length : 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      class={{ color: "snow" }}
    />
  </div>
</div>

}


</>
        
      )}
    </>
  );
};

// export default StripePaymentHistory;

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(StripePaymentHistory);
