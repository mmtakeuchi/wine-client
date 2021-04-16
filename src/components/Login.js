import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    marginTop: "1em",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  label: {
    float: "left",
    margin: "0.5em 5em",
    fontSize: "1.25em",
  },
  field: {
    width: "70%",
    margin: "0.5em 4em",
  },
  submit: {
    width: "70%",
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    marginLeft: "0.5em",
    fontSize: "1em",
  },
  noAccout: {
    fontSize: "1.2em",
    margin: "1em",
  },
  error: {
    float: "left",
    margin: "0.5em 5em",
    fontSize: "1.25em",
    color: "red",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.current.error);

  console.log(errorMessages);
  console.log(props);

  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = values;

    let user = {
      username: username,
      password: password,
    };

    dispatch(loginUser(user));
    if (errorMessages) {
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  const handleErrors = () => {
    return (
      <div>
        {errorMessages.map((error) => {
          return (
            <p key={error} className={classes.error}>
              {error}
            </p>
          );
        })}
      </div>
    );
  };

  const { username, password } = values;
  console.log(values);
  return (
    <Container maxWidth="sm">
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.title}>
          <Typography variant="h4">Log In</Typography>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h6" className={classes.label}>
            Username
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleChange}
            />
          </div>
          <Typography variant="h6" className={classes.label}>
            Password
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>{errorMessages ? handleErrors() : null}</div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </div>
        </form>
        <div className={classes.noAccout}>
          Don't have an account?
          <Link href="/signup" className={classes.link} variant="body2">
            Sign Up
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
