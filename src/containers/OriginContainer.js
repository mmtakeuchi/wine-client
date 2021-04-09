import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import OriginList from "../components/OriginList";
import Origin from "../components/Origin";

export class OriginContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/origins/:id" component={Origin} />
          <Route exact path="/origins" component={OriginList} />
        </Switch>
      </div>
    );
  }
}

export default OriginContainer;
