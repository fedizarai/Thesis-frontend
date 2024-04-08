import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Leades from './leades';
import {
  Avatar_11,
  Avatar_09,
  Avatar_02,
  Avatar_10,
  Avatar_05,
  Avatar_12,
  Avatar_01,
  Avatar_13,
  Avatar_16,
} from "../../Entryfile/imagepath";



const EmployeeRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route 
         path={`${match.url}/leads`} 
         render={(props) => (
          <Leades {...props} />
       )}
      />
   </Switch>
);

export default EmployeeRoute;
