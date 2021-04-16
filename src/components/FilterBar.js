import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getWines } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    textAlign: "center",
    marginBottom: "1rem",
  },
  list: {
    width: "15rem",
    textAlign: "center",
    border: "1px solid black",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const FilterBar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [values, setValues] = useState({
    varietal_id: "",
    origin_id: "",
  });

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWines());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVarietals());
  }, [dispatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setMenu(!menu);
  };

  const handleFilter = (event) => {
    setValues({
      ...values,
      [event.target.parentNode.parentNode.id]: event.target.parentNode.id,
    });
    props.handleFilterChange(
      event.target.parentNode.parentNode.id,
      event.target.parentNode.id
    );
  };

  const varietalName = () => {
    return (
      values.varietal_id &&
      props.varietals.find(
        (varietal) => varietal.id === parseInt(values.varietal_id)
      )
    ).name;
  };

  const originName = () => {
    return (
      values.origin_id &&
      props.origins.find((origin) => origin.id === parseInt(values.origin_id))
    ).region;
  };

  const renderName = (type) => {
    if (type === "V") {
      return values.varietal_id ? varietalName() : "Varietals";
    } else {
      return values.origin_id ? originName() : "Origins";
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <List className={classes.list}>
              <ListItem button onClick={handleClick}>
                <ListItemText primary={renderName("V")} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding id="varietal_id">
                  <ListItem
                    button
                    className={classes.nested}
                    id="varietal_id"
                    onClick={handleFilter}
                  >
                    <ListItemText
                      primary="Varietals"
                      value=""
                      onClick={handleClick}
                    ></ListItemText>
                  </ListItem>
                  <Divider />
                  {props.varietals &&
                    props.varietals.map((varietal) => (
                      <React.Fragment key={varietal.id}>
                        <ListItem
                          button
                          className={classes.nested}
                          id="varietal_id"
                          key={varietal.id}
                          value={varietal.id}
                          onClick={handleFilter}
                        >
                          <ListItemText
                            primary={varietal.name}
                            key={varietal.id}
                            value={varietal.id}
                            id={varietal.id}
                            onClick={handleClick}
                          ></ListItemText>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                </List>
              </Collapse>
            </List>
          </Grid>
          <Grid item sm={6}>
            <List className={classes.list}>
              <ListItem button onClick={handleOpen}>
                <ListItemText primary={renderName("O")} />
                {menu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menu} timeout="auto" unmountOnExit>
                <Divider />
                <ListItem
                  button
                  className={classes.nested}
                  id="origin_id"
                  onClick={handleFilter}
                >
                  <ListItemText
                    primary="Origins"
                    value=""
                    onClick={handleOpen}
                  ></ListItemText>
                </ListItem>
                <Divider />
                <List component="div" disablePadding id="origin_id">
                  {props.origins &&
                    props.origins.map((origin) => (
                      <React.Fragment key={origin.id}>
                        <ListItem
                          button
                          className={classes.nested}
                          id="origin_id"
                          key={origin.id}
                          value={origin.id}
                          onClick={handleFilter}
                        >
                          <ListItemText
                            primary={origin.region}
                            key={origin.id}
                            value={origin.id}
                            id={origin.id}
                            onClick={handleOpen}
                          ></ListItemText>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                </List>
              </Collapse>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
