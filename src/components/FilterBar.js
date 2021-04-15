import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWines, filterWine } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: "15rem",
    textAlign: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const FilterBar = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const history = useHistory();
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

  // useEffect(() => {
  //   dispatch(filterWine(values.varietal_id));
  // }, [values.varietal_id]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setMenu(!menu);
  };

  const handleFilter = (event) => {
    console.log(event.target.parentNode.id);
    console.log(event.target.parentNode.parentNode.id);
    setValues({
      ...values,
      [event.target.parentNode.parentNode.id]: event.target.parentNode.id,
    });
    props.handleFilterChange(
      event.target.parentNode.parentNode.id,
      event.target.parentNode.id
    );
    // return dispatch(filterWine(event.target.parentNode.id));
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
    <div
      className={classes.root}
      style={{
        display: "flex",
        textAlign: "center",
        position: "relative",
        flexWrap: "nowrap",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={6} sm={3}>
          <List className={classes.list}>
            <ListItem button onClick={handleClick}>
              <ListItemText primary={renderName("V")} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding id="varietal_id">
                {props.varietals &&
                  props.varietals.map((varietal) => (
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
                        // onClick={() =>
                        //   history.push(`/varietals/${varietal.id}`)
                        // }
                      ></ListItemText>
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={6} sm={3}>
          <List className={classes.list}>
            <ListItem button onClick={handleOpen}>
              <ListItemText primary={renderName("O")} />
              {menu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={menu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding id="origin_id">
                {props.origins &&
                  props.origins.map((origin) => (
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
                        // onClick={() =>
                        //   history.push(`/origins/${origin.id}`)
                        // }
                      ></ListItemText>
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </List>
        </Grid>
      </Grid>
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
