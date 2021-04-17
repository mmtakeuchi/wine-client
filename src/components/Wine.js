import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { deleteWine, getWines } from "../actions/wineActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    maxWidth: "33rem",
    margin: "0 auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  details: {
    marginRight: "1em",
    textTransform: "capitalize",
  },
  category: {
    justifyContent: "flex-start",
    alignItems: "end",
    marginRight: "0 2em",
    border: "1px solid blue",
    width: "100%",
  },
  data: {
    borderBottom: "1px dotted black",
    textTransform: "capitalize",
    alignItems: "center",
  },
  buttons: {
    margin: "0 auto",
  },
  button: {
    margin: "1em",
  },
  back: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Wine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wines);
  const wineId = props.match.params.id;
  let wine;

  wine =
    wines && wines.length
      ? wines.find((wine) => wine.id === parseInt(wineId))
      : null;

  console.log(wine);

  useEffect(() => {
    dispatch(getWines());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteWine(`${wines.id}`));
    props.history.push("/wines");
  };

  console.log(wines);
  console.log(props);

  if (wines && wine) {
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} variant="h2" gutterBottom>
              {wine.brand}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={2} className={classes.details}>
                <Typography variant="h5">Varietal:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.data}>
                  {wine.varietal.name}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.details}>
                <Typography variant="h5">Origin:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.data}>
                  {wine.origin.region}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ marginRight: "1em" }}>
                <Typography variant="h5">Nose:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.data}>
                  {wine.nose}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.details}>
                <Typography variant="h5" className={classes.details}>
                  Taste:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.data}>
                  {wine.taste}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
              >
                <Link href={`/wines/${wine.id}/edit`}>Edit</Link>
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          </CardActions>
        </Card>
        <div className={classes.back}>
          <Button
            variant="outlined"
            color="default"
            size="small"
            className={classes.button}
          >
            <Link href={"/wines"}>Back to wines list</Link>
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Sorry we could not find the selected wine.</h2>
        <Button variant="outlined" color="default" size="small">
          <Link href={"/wines"}>Back to wines list</Link>
        </Button>
      </React.Fragment>
    );
  }
};

export default Wine;
