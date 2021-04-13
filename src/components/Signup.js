import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../actions/userActions";
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

const Signup = (props) => {
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

  // redirect = () => {
  //   this.props.history.push("/");
  // };

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

  const { username, email, password, password_confirmation } = values;

  return (
    <div>
      <h1>Sign Up</h1>
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
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={password_confirmation}
          onChange={handleChange}
        />

        <button placeholder="submit" type="submit">
          Sign Up
        </button>
      </form>
      <div>{errorMessages ? handleErrors() : null}</div>
    </div>
  );
};

export default Signup;
