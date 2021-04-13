import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../actions/userActions";
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
    margin: "1em",
  },
  error: {
    float: "left",
    margin: "0.5em 5em",
    fontSize: "1.15em",
    color: "red",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.current.error);

  console.log(errorMessages);

  console.log(props);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    const { username, email, password, password_confirmation } = values;

    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    dispatch(createUser(user));
    if (errorMessages) {
      history.push("/");
    } else {
      history.push("/signup");
    }

    // axios
    //   .post("http://localhost:3001/users", { user }, { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.status === "created") {
    //       this.props.handleLogin(response.data);

    //       this.redirect();
    //     } else {
    //       this.setState({
    //         errors: response.data.errors,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("api errors:", error));
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

  const { username, email, password, password_confirmation } = values;

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} className={classes.paper}>
        <h1>
          <Typography variant="h4">Sign Up</Typography>
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
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <Typography variant="h6" className={classes.label}>
            Password Confirmation
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="password_confirmation"
              name="password_confirmation"
              autoComplete="password_confirmation"
              autoFocus
              type="password"
              value={password_confirmation}
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
              Create Account
            </Button>
          </div>
        </form>
        <div className={classes.noAccout}>
          Already have an account?
          <Link href="/login" className={classes.link} variant="body2">
            Log In
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;
