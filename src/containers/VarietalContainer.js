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
    return (
      <div>
        <Switch>
          <Route path="/varietals/:id" component={Varietal} />
          <Route exact path="/varietals" component={VarietalList} />
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
