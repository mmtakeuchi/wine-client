import React, { Component } from "react";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class FilterBar extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
    this.props.getWines();
    this.props.getVarietals();
  };

  state = {
    anchorEl: null,
    anchorEl2: null,
    varietal_id: "",
    origin_id: "",
  };

  handleMenu = (event) => {
    this.setState({ [event.target.offsetParent.id]: event.currentTarget });
  };

  handleFilter = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    this.setState({ [event.target.parentNode.parentNode.parentNode.id]: null });
  };

  handleClose = (event) => {
    this.setState({ [event.target.parentNode.id]: null });
  };

  renderName = (id, type) => {
    if (type === "v") {
      return this.props.varietals.find((varietal) => varietal.id === id).name;
    } else {
      return this.props.origins.find((origin) => origin.id === id).region;
    }
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Toolbar
          style={{
            margin: "0 auto",
          }}
        >
          <Button
            id="anchorEl"
            className="anchorEl"
            aria-controls="anchorEl"
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            {this.state.varietal_id
              ? this.renderName(this.state.varietal_id, "v")
              : "Varietals"}
          </Button>
          <Menu
            id="anchorEl"
            className="anchorEl"
            aria-controls="anchorEl"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            value="varietal"
          >
            {this.props.varietals.map((varietal) => (
              <MenuItem
                key={varietal.id}
                id="varietal_id"
                className="varietal_id"
                onClick={this.handleFilter}
                value={varietal.id}
              >
                {varietal.name}
              </MenuItem>
            ))}
          </Menu>
          <Button
            id="anchorEl2"
            aria-controls="anchorEl2"
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            {this.state.origin_id
              ? this.renderName(this.state.origin_id, "o")
              : "Origins"}
          </Button>
          <Menu
            id="anchorEl2"
            anchorEl={this.state.anchorEl2}
            keepMounted
            open={Boolean(this.state.anchorEl2)}
            onClose={this.handleClose}
            value="origin"
          >
            {this.props.origins.map((origin) => (
              <MenuItem
                key={origin.id}
                id="origin_id"
                className="origin_id"
                onClick={this.handleFilter}
                value={origin.id}
              >
                {origin.region}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  origins: state.origins.origins,
  varietals: state.varietals.varietals,
  wines: state.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  getVarietals: () => dispatch(getVarietals()),
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
