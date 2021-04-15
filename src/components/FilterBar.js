import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWines } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const FilterBar = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleFilter = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  return (
    <div style={{ display: "flex" }}>
      <Toolbar
        style={{
          margin: "0 auto",
        }}
      >
        <List className={classes.root}>
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Varietals" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.varietals &&
                props.varietals.map((varietal) => (
                  <ListItem button className={classes.nested} key={varietal.id}>
                    <ListItem
                      button
                      className={classes.nested}
                      key={varietal.id}
                      value={varietal.id}
                    >
                      <ListItemText
                        primary={varietal.name}
                        key={varietal.id}
                        value={varietal.id}
                        onClick={() =>
                          history.push(`/varietals/${varietal.id}`)
                        }
                      ></ListItemText>
                    </ListItem>
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </List>
      </Toolbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  origins: state.origins.origins,
  varietals: state.varietals,
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  getVarietals: () => dispatch(getVarietals()),
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
