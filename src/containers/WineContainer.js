import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import WineList from "../components/WineList";
import Wine from "../components/Wine";
import WineForm from "../components/WineForm";
import EditWine from "../components/EditWine";
import { getWines } from "../actions/wineActions";

class WineContainer extends Component {
  componentDidMount = () => {
    this.props.getWines();
  };

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <Switch>
            <Route exact path="/wines/new" component={WineForm} />
            <Route path="/wines/:id/edit" component={EditWine} />
            <Route path="/wines/:id" component={Wine} />
            <Route exact path="/wines" component={WineList} />
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
  wines: state.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineContainer);
