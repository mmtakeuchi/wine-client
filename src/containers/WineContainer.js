import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import WineList from "../components/WineList";
import Wine from "../components/Wine";
import WineForm from "../components/WineForm";
import EditWine from "../components/EditWine";
import { getWines } from "../actions/wineActions";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import VarietalContainer from "./VarietalContainer";
import OriginContainer from "./OriginContainer";
import Varietal from "../components/Varietal";
import Origin from "../components/Origin";
import FilterBar from "../components/FilterBar";

class WineContainer extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
    this.props.getWines();
    this.props.getVarietals();
  };

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <FilterBar
          // wines={this.props.wines}
          // varietals={this.props.varietals}
          // origins={this.props.origins}
          />

          <WineList />
          <Switch>
            <Route exact path="/wines/new" component={WineForm} />
            <Route path="/wines/:id/edit" component={EditWine} />
            <Route path="/wines/:id" component={Wine} />
            <Route path="/origins" component={OriginContainer} />
            <Route path="/origins/:id" component={Origin} />
            <Route path="/varietals" component={VarietalContainer} />
            <Route path="/varietals/:id" component={Varietal} />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        Sorry no Wines
        <button onClick={this.handleRedirect}>Back Home</button>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(WineContainer);
