import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
}));

// export default function SimplePaper() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper elevation={0} />
//       <Paper />
//       <Paper elevation={3} />
//     </div>
//   );
// }

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

    console.log(values);
    console.log(dispatch(loginUser(user)));
    dispatch(loginUser(user));
    if (errorMessages) {
      history.push("/");
    } else {
      history.push("/login");
    }

    // axios
    //   .post("http://localhost:3001/login", { user }, { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.logged_in) {
    //       props.handleLogin(response.data);
    //       redirect();
    //     } else {
    //       setValues({
    //         errors: response.data.errors,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("api errors:", error));
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errorMessages &&
            errorMessages.map((error) => {
              return <li key={error}>{error}</li>;
            })}
        </ul>
      </div>
    );
  };

  const { username, email, password } = values;
  console.log(values);
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to="/signup">sign up</Link>
        </div>
      </form>
      <div>{errorMessages ? handleErrors() : null}</div>
    </div>
  );
};

export default Login;
