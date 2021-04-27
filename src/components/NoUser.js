import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  paper: {
    border: "0.2em solid red",
  },
  intro: {
    justifyContent: "center",
    alignItems: "center",
    margin: "1em",
    textAlign: "center",
    fontSize: "2em",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5em",
  },
  links: {
    textDecoration: "none",
    color: "black",
  },
  button: {
    backgroundColor: "primary",
  },
}));

const NoUser = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.intro}>
          <p className={classes.title}>Please log in to view wines</p>
          <Button variant="contained" className={classes.button}>
            <Link to="/login" className={classes.links}>
              Log In
            </Link>
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default NoUser;
