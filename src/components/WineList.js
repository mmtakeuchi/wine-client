import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getWines } from "../actions/wineActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "blue",
  },
  container: {
    backgroundColor: "white",
  },
});

const WineList = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getWines());
  }, []);

  const filterWines = () => {
    if (props.wines && props.wines.length) {
      if (props.varietalId && props.originId) {
        return (
          <React.Fragment>
            {props.wines
              .filter(
                (wine) =>
                  wine.varietal_id === parseInt(props.varietalId) &&
                  wine.origin_id === parseInt(props.originId)
              )
              .sort((a, b) => (a.brand < b.brand ? -1 : 1))
              .map((wine) => (
                <TableRow key={wine.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/wines/${wine.id}`} className={classes.link}>
                      {wine.brand}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{wine.varietal.name}</TableCell>
                  <TableCell align="right">{wine.origin.region}</TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        );
      } else if (props.varietalId && props.originId === "") {
        console.log(typeof props.originId);
        return (
          <React.Fragment>
            {props.wines.length &&
              props.wines
                .filter(
                  (wine) => wine.varietal_id === parseInt(props.varietalId)
                )
                .sort((a, b) => (a.brand < b.brand ? -1 : 1))
                .map((wine) => (
                  <TableRow key={wine.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/wines/${wine.id}`} className={classes.link}>
                        {wine.brand}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{wine.varietal.name}</TableCell>
                    <TableCell align="right">{wine.origin.region}</TableCell>
                  </TableRow>
                ))}
          </React.Fragment>
        );
      } else if (props.originId && props.varietalId === "") {
        return (
          <React.Fragment>
            {props.wines.length &&
              props.wines
                .filter((wine) => wine.origin_id === parseInt(props.originId))
                .sort((a, b) => (a.brand < b.brand ? -1 : 1))
                .map((wine) => (
                  <TableRow key={wine.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/wines/${wine.id}`} className={classes.link}>
                        {wine.brand}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{wine.varietal.name}</TableCell>
                    <TableCell align="right">{wine.origin.region}</TableCell>
                  </TableRow>
                ))}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {props.wines.length &&
              props.wines
                .sort((a, b) => (a.brand < b.brand ? -1 : 1))
                .map((wine) => (
                  <TableRow key={wine.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/wines/${wine.id}`} className={classes.link}>
                        {wine.brand}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{wine.varietal.name}</TableCell>
                    <TableCell align="right">{wine.origin.region}</TableCell>
                  </TableRow>
                ))}
          </React.Fragment>
        );
      }
    }
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <div className={classes.contain}>
      <Container maxWidth="md">
        <Button variant="outlined" size="small">
          <Link to="/wines/new" className={classes.link}>
            Add Wine
          </Link>
        </Button>
        <br />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.title}>Wine Brand</TableCell>
                <TableCell align="right" className={classes.title}>
                  Varietal
                </TableCell>
                <TableCell align="right" className={classes.title}>
                  Country
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filterWines()}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineList);
