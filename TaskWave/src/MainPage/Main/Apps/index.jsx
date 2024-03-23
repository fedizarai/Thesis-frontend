/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Chat from './chat';



const AppsRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chat`} />
      <Route path={`${match.url}/chat`} component={Chat} />
   </Switch>

);

export default AppsRoute;
