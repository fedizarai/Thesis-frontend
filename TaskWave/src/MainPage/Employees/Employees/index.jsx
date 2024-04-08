/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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
} from "../../../Entryfile/imagepath";

import AllEmployees from './allemployees';
import AllEmployeesList from './employeeslist';
import Leades from './leades';



const users = [
    {
      id: 1,
      image: Avatar_01,
      name: "John Doe fedy ",
      username: "John 2023",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Designer",
      employee_id: "FT-0001",
      email: "johndoe@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",


    },
    {
      id: 2,
      image: Avatar_01,
      name: "Richard Miles",
      username: "Richard 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0002",
      email: "richardmiles@example.com",
      mobile: "9876543210",
      joindate: "18 Mar 2014",
      project: "Video Calling App",
      position: "Team Leader",

    },
    {
      id: 3,
      image: Avatar_01,
      name: "John Smith",
      username:"John 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Android Developer",
      employee_id: "FT-0003",
      email: "johnsmith@example.com ",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Hospital Administration",
      position: "Manager",
    },
    {
      id: 4,
      image: Avatar_01,
      name: "Mike Litorus",
      username: +"Mike 2019",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer",
      employee_id: "FT-0004",
      email: "mikelitorus@example.com",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Office Management",
      position: "Manager",
    },
    {
      id: 5,
      image: Avatar_01,
      name: "Wilmer Deluna",
      username:"Wilmer 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0005",
      email: "wilmerdeluna@example.com",
      mobile: "9876543210",
      joindate: "22 May 2014",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 6,
      image: Avatar_01,
      name: "Jeffrey Warden",
      username:"Jeffrey 2018",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0006",
      email: "jeffreywarden@example.com",
      mobile: "9876543210",
      joindate: "16 Jun 2013",
      project: "Video Calling App",
      position: "Employee",
    },
    {
      id: 7,
      image: Avatar_01,
      name: "Bernardo Galaviz",
      username: "Bernardo 1998",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0007",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",
    },
    {
      id: 8,
      image: Avatar_01,
      name: "Lesley Grauer",
      username: "Lesley 2015",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0008",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Team Leader",
    },
    {
      id: 9,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: "Jeffery 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0009",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 10,
      image: Avatar_01,
      name: "John Doe",
      username: "John 2016",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0010",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",

    },
     {
      id: 11,
      image: Avatar_01,
      name: "zarai fedi",
      username: "fedy 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0011",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Employee",
    },
     {
      id: 12,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: name+" 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0012",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",
    },
  ];


const EmployeesRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
      <Route
          path={`${match.url}/allemployees`} 
          render={(props) => (
          <AllEmployees {...props} users={users} />
      )}
      /> 
      <Route 
         path={`${match.url}/employees-list`} 
         render={(props) => (
          <AllEmployeesList {...props} users={users} />
       )}
      />
      <Route 
         path={`${match.url}/leads`} 
         render={(props) => (
          <Leades {...props} users={users} />
       )}
      />   
   </Switch>
);

export default EmployeesRoute;
