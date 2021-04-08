import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";
import WineList from "../components/WineList";
import Wine from "../components/Wine";
import WineForm from "../components/WineForm";
import EditWine from "../components/EditWine";
import OriginList from "../components/OriginList";
import VarietalContainer from "./VarietalContainer";
// import VarietalList from "../components/VarietalList";
// import Varietal from "../components/Varietal";

class WineContainer extends Component {
  // componentDidMount() {
  //   this.props.getWines();
  // }

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
          {/* <WineList wines={this.props.wines} /> */}

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
