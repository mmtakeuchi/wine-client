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
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    // alignItems: "center",
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
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.current.errors);

  console.log(errorMessages);

  console.log(props);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    errors: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = values;

    let user = {
      username: username,
      email: email,
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
        <ul>
          {errorMessages.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  const { username, email, password } = values;
  console.log(values);
  return (
    <Container maxWidth="sm">
      <Paper elevation={5} className={classes.paper}>
        <h1>
          <Typography variant="h4">Log In</Typography>
        </h1>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" className={classes.label}>
            Email
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
            />
          </div>
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
              value={password}
              onChange={handleChange}
            />
          </div>
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
          <div>{errorMessages ? handleErrors() : null}</div>
        </form>
      </Paper>
      <div className={classes.noAccout}>
        Don't have an account?
        <Link href="/signup" className={classes.link} variant="body2">
          Sign Up
        </Link>
      </div>
    </Container>
  );
};

export default Login;
