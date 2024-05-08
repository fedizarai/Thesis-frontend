/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PerformanceIndicator from "./perindicator"


const Performanceroute = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/performance-appraisal`} />
        <Route path={`${match.url}/performance-indicator`} component={PerformanceIndicator} />
       
    </Switch>
);

export default Performanceroute;
