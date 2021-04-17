import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getWines } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
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
});

const WineList = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getWines());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVarietals());
  }, [dispatch]);

  const varietalName = (wine) => {
    if (props.varietals.length) {
      return props.varietals.find(
        (varietal) => varietal.id === parseInt(wine.varietal_id)
      ).name;
    }
  };

  const originRegion = (wine) => {
    if (props.origins.length) {
      return props.origins.find(
        (origin) => origin.id === parseInt(wine.origin_id)
      ).region;
    }
  };

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
                    <TableCell align="right">{varietalName(wine)}</TableCell>
                    <TableCell align="right">{originRegion(wine)}</TableCell>
                  </TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        );
      } else if (props.varietalId && props.originId === "") {
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

                    <TableCell align="right">{varietalName(wine)}</TableCell>
                    <TableCell align="right">{originRegion(wine)}</TableCell>
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
                    <TableCell align="right">{varietalName(wine)}</TableCell>
                    <TableCell align="right">{originRegion(wine)}</TableCell>
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
                    <TableCell align="right">{varietalName(wine)}</TableCell>
                    <TableCell align="right">{originRegion(wine)}</TableCell>
                  </TableRow>
                ))}
          </React.Fragment>
        );
      }
    }
  };

  if (props.wines) {
    return (
      <div>
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
  }

  return <h1>Relead Page</h1>;
};

const mapStateToProps = (state) => ({
  origins: state.origins,
  varietals: state.varietals,
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  getVarietals: () => dispatch(getVarietals()),
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineList);
