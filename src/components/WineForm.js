import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { addWine } from "../actions/wineActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";

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
    alignItems: "center",
  },
  label: {
    float: "left",
    margin: "0.5em 5.5em",
    fontSize: "1.25em",
  },
  field: {
    width: "80%",
    margin: "0.5em 4em",
  },
  select: {
    width: "65%",
    marginLeft: "4em",
  },
  origin: {
    width: "65%",
    marginRight: "4em",
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

const WineForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const varietals = useSelector((state) => state.varietals);
  const origins = useSelector((state) => state.origins);

  const [values, setValues] = useState({
    user_id: `${props.user.id}`,
    brand: "",
    nose: "",
    taste: "",
    origin_id: "",
    varietal_id: "",
    error: "",
  });

  useEffect(() => {
    dispatch(getVarietals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { user_id, brand, nose, taste, origin_id, varietal_id } = values;
    let wineObj = {
      user_id,
      brand,
      nose,
      taste,
      origin_id,
      varietal_id,
    };

    dispatch(addWine(wineObj));

    history.push("/wines");
    setValues({
      brand: "",
      nose: "",
      taste: "",
      origin_id: "",
      varietal_id: "",
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.title}>
          <Typography variant="h4">Create Wine</Typography>
        </div>

        <form className={classes.form} onSubmit={onSubmit}>
          <Typography variant="h6" className={classes.label}>
            Brand
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="brand"
              name="brand"
              autoComplete="brand"
              autoFocus
              value={values.brand}
              onChange={onChange}
            />
          </div>
          <Typography variant="h6" className={classes.label}>
            Nose
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="nose"
              name="nose"
              autoComplete="nose"
              autoFocus
              value={values.nose}
              onChange={onChange}
            />
          </div>
          <Typography variant="h6" className={classes.label}>
            Taste
          </Typography>
          <div>
            <TextField
              className={classes.field}
              variant="outlined"
              margin="normal"
              required
              id="taste"
              name="taste"
              autoComplete="taste"
              autoFocus
              value={values.taste}
              onChange={onChange}
            />
          </div>
          <Grid container>
            <Grid item xs={6}>
              <FormControl className={classes.select}>
                <InputLabel shrink htmlFor="varietal_id">
                  Varietal
                </InputLabel>
                <NativeSelect
                  value={values.varietal_id}
                  onChange={onChange}
                  inputProps={{
                    name: "varietal_id",
                    id: "varietal_id",
                  }}
                  required
                >
                  <option aria-label="None" value="" />
                  {varietals.map((varietal) => (
                    <option key={varietal.id} value={varietal.id}>
                      {varietal.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.origin}>
                <InputLabel shrink htmlFor="origin_id">
                  Origin
                </InputLabel>
                <NativeSelect
                  value={values.origin_id}
                  onChange={onChange}
                  inputProps={{
                    name: "origin_id",
                    id: "origin_id",
                  }}
                  required
                >
                  <option aria-label="None" value="" />
                  {origins.map((origin) => (
                    <option key={origin.id} value={origin.id}>
                      {origin.region}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
          {/* <div>{errorMessages ? handleErrors() : null}</div> */}
          <Button
            variant="contained"
            color="primary"
            placeholder="submit"
            type="submit"
            size="small"
            className={classes.submit}
          >
            Create Wine
          </Button>
        </form>
      </Paper>
      <Button variant="outlined" onClick={() => history.push("/wines")}>
        Back to wines
      </Button>
    </Container>
  );
};

export default WineForm;
