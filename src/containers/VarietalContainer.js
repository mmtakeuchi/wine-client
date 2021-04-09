import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getVarietals } from "../actions/varietalActions";
import VarietalList from "../components/VarietalList";
import Varietal from "../components/Varietal";

export class VarietalContainer extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    console.log(this);
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/varietals"
            render={(props) => (
              <VarietalList
                {...props}
                varietals={this.props.varietals.varietals}
              />
            )}
          />
          <Route
            path="/varietals/:id"
            render={(props) => (
              <Varietal {...props} varietals={this.props.varietals.varietals} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ varietals }) => ({
  varietals: varietals,
});

const mapDispatchToProps = (dispatch) => ({
  getVarietals: () => dispatch(getVarietals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VarietalContainer);
