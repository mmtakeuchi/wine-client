import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter, Redirect } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { getWines, editWine } from "../actions/wineActions";
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

const EditWine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const { wines } = useSelector((state) => state.wines);
  const varietals = useSelector((state) => state.varietals);
  const origins = useSelector((state) => state.origins);
  const wineId = props.match.params.id;
  // const errorMessages = useSelector((state) => state.wines.error);

  // useEffect(() => {
  //   dispatch(getWines());
  // }, []);

  useEffect(() => {
    dispatch(getVarietals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  let drink =
    props.wines && props.wines.length
      ? props.wines.find((wine) => wine.id === parseInt(wineId))
      : null;

  console.log(props);
  console.log(drink);
  const [values, setValues] = useState({
    user_id: props.user.id,
    brand: drink.brand,
    nose: drink.nose,
    taste: drink.taste,
    origin_id: drink.origin_id,
    varietal_id: drink.varietal_id,
  });
  console.log(values);

  const handleChange = (e) => {
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

    dispatch(editWine({ wineObj: wineObj, id: props.match.params.id }));

    setValues({
      brand: "",
      nose: "",
      taste: "",
      origin_id: "",
      varietal_id: "",
    });

    history.push(`/wines/${props.match.params.id}`);
  };

  if (props.wines && drink) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.title}>
            <Typography variant="h4">Edit Wine</Typography>
          </div>

          <form className={classes.form} onSubmit={onSubmit} noValidate>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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

            <Button
              variant="contained"
              color="primary"
              placeholder="submit"
              type="submit"
              size="small"
              className={classes.submit}
            >
              Edit Wine
            </Button>
          </form>
        </Paper>
        <Button variant="outlined" onClick={() => history.push("/wines")}>
          Loading form
        </Button>
      </Container>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
        <Redirect to={`/wines/${props.match.params.id}`} />
      </div>
    );
  }
};

export default EditWine;
