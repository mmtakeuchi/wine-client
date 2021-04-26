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
import FilterBar from "../components/FilterBar";

class WineContainer extends Component {
  state = {
    varietal_id: "",
    origin_id: "",
  };

  componentDidMount = () => {
    this.props.getOrigins();
    this.props.getWines();
    this.props.getVarietals();
  };

  handleFilterChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this);
    if (this.props.isLoggedIn) {
      return (
        <div>
          <FilterBar
            varietalId={this.state.varietal_id}
            originId={this.state.origin_id}
            wines={this.props.wines}
            varietals={this.props.varietals}
            origins={this.props.origins}
            handleFilterChange={this.handleFilterChange}
          />

          <Switch>
            <Route
              exact
              path="/wines/new"
              render={(props) => <WineForm {...props} user={this.props.user} />}
            />

            <Route
              path="/wines/:id/edit"
              render={(props) => (
                <EditWine
                  {...props}
                  user={this.props.user}
                  wines={this.props.wines}
                />
              )}
            />

            <Route
              path="/wines/:id"
              render={(props) => (
                <Wine
                  {...props}
                  user={this.props.user}
                  wines={this.props.wines}
                  originId={this.state.origin_id}
                  varietalId={this.state.varietal_id}
                  varietals={this.props.varietals}
                  origins={this.props.origins}
                />
              )}
            />
            <Route
              exact
              path="/wines"
              render={(props) => (
                <WineList
                  {...props}
                  user={this.props.user}
                  wines={this.props.wines}
                  originId={this.state.origin_id}
                  varietalId={this.state.varietal_id}
                />
              )}
            />
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
  origins: state.origins,
  varietals: state.varietals,
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  getVarietals: () => dispatch(getVarietals()),
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineContainer);
