import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";
import WineList from "../components/WineList";
import WineForm from "../components/WineForm";
import OriginList from "../components/OriginList";
import VarietalContainer from "./VarietalContainer";
// import VarietalList from "../components/VarietalList";
// import Varietal from "../components/Varietal";

class WineContainer extends Component {
  componentDidMount() {
    this.props.getWines();
  }

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    console.log(this);
    if (this.props.isLoggedIn) {
      return (
        <div>
          <OriginList />
          <VarietalContainer />

          <Switch>
            <Route
              exact
              path="/wines"
              render={(props) => (
                <WineList {...props} wines={this.props.wines} />
              )}
            />
            <Route path="/wines/new" component={WineForm} />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        Sorry
        <button>Back Home</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineContainer);
