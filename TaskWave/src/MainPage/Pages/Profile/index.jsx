import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EmployeeProfile from "./employeeprofile";
import Profile from "./profile";

const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/employee-profile`}
    />
    <Route path={`${match.url}/employee-profile/:profileId`} component={EmployeeProfile} />
    <Route path={`${match.url}/Profile`} component={Profile} />
    
  </Switch>
);

export default subscriptionroute;
