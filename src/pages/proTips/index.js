import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import { AiFillLock } from "react-icons/ai";
import actions from "../../redux/actions/protipRaces";
import "./proTips.scss";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 582,
  },
});
const columndata = function (loggedIn) {
  return [
    {
      id: "rInfo",
      label: "R. Info",
      class: "r-info",
      align: "center",
      minWidth: 50,
      special: (value) =>
        loggedIn ? (
          <>
            <Chip className="date-chip" label={value?.raceDate}></Chip>
            <Chip className="time-chip" label={value?.raceTime}></Chip>
            <br />
            <Chip className="track-chip" label={value?.trackcode}></Chip>
            <Chip className="race-no-chip" label={`R.${value?.raceNo}`}></Chip>
          </>
        ) : (
          <AiFillLock />
        ),
    },
    {
      //id: "tip",
      label: "Tips",
      class: "r-select",
      minWidth: 40,
      align: "center",
    },
    {
      id: "race_selection",
      label: "Gd",
      class: "r-select",
      minWidth: 40,
      align: "center",
    },
    {
      id: "race_e_win_g",
      label: "Mx",
      class: "r-ewing",
      minWidth: 40,
      align: "center",
      format: (value) => parseFloat(value).toFixed(2),
    },
    {
      id: "race_selection_soft",
      label: "Sft",
      class: "r-select-soft",
      minWidth: 40,
      align: "center",
    },
    {
      id: "race_e_win_s",
      label: "Mx",
      class: "r-ewins",
      minWidth: 40,
      align: "center",
      format: (value) => parseFloat(value).toFixed(2),
    },
    {
      id: "race_selection_synth",
      label: "Syn",
      class: "r-select-syn",
      minWidth: 40,
      align: "center",
    },
    {
      id: "race_e_win_sy",
      label: "Mx",
      minWidth: 40,
      class: "r-winsy",
      align: "center",
      format: (value) => parseFloat(value).toFixed(2),
    },
  ];
};
const ProTips = (props) => {
  const [logedIn, setLogedIn] = useState(null);
  const [newArr, setNewArr] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [columns, setColumns] = useState(columndata(props.loggedIn));

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setColumns([]);
    props?.loggedIn ? setLogedIn(true) : setLogedIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loggedIn]);

  useEffect(() => {
    if (logedIn) {
      props.dispatch(actions.getProtipRaces()).then((res) => {
        mapping(res, logedIn);
      });
    }
    setColumns(columndata(logedIn));
    mapping(props.getRaces.info, logedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logedIn]);

  const mapping = (data, logged) => {
    if (logged) {
      setNewArr(
        data.map((v) => ({
          ...v,
          rInfo: {
            raceDate: v?.race_date,
            raceTime: v?.race_time,
            trackcode: v?.trackcode,
            raceNo: v?.race_no,
          },
        }))
      );
    } else {
      const dummyData = () => {
        return {
          raceDate: "2021-12-06",
          raceTime: "14:35",
          trackcode: "WAGGA",
          raceNo: 1,
          race_e_win_g: 8.5,
          race_e_win_s: 0,
          race_e_win_sy: 0,
          race_selection_synth: 0,
          race_selection: 8,
          race_selection_soft: 0,
          rInfo: {
            raceDate: "2021-12-06",
            raceTime: "14:35",
            trackcode: "WAGGA",
            raceNo: 1,
          },
        };
      };
      const createDummyArr = (num) => {
        return Array.from({ length: num }, dummyData);
      };

      setNewArr(createDummyArr(77));
    }
  };

  return (
    <>
    
      <div style={{ marginTop: 32 }}>
        <Helmet>
          <title>PTP Pro Tips</title>
        </Helmet>

        {(props.getRaces.info.data !== null && props.getRaces.info) ||
        !logedIn ? (
          <section className="pro-tips-table">
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns?.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newArr
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.raceDate + i}
                          >
                            {columns?.map((column) => {
                              const value = logedIn ? (
                                row[column.id]
                              ) : (
                                <AiFillLock />
                              );
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className={column?.class}
                                >
                                  {column.format && logedIn
                                    ? column.format(value)
                                    : column.special
                                    ? column.special(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={newArr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </section>
        ) : (
          <strong>There is no selections for today.</strong>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  getRaces: state.protipRacesReducer,
  loggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(memo(ProTips));
