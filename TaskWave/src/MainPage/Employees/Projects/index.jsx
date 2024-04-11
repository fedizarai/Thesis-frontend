import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


import Projects from './projects';
import ProjectView from './projectview';
import ProjectList from './projectlist';
import Taskboard from './taskboard';
import {
  Avatar_16,
  Avatar_02,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_01,
  Diagram,
  PlaceHolder,
} from "../../../Entryfile/imagepath";

const ProjectRoute = ({ match }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/project_dashboard`} />
      <Route
        path={`${match.url}/project_dashboard`}
        render={(props) => (
          <Projects {...props} projects={projects} />
        )}
      />
      <Route
        path={`${match.url}/projects-list`}
        render={(props) => (
          <ProjectList {...props} projects={projects} />
        )}
      />
      <Route
        path={`${match.url}/projects-view/:taskId`}
        render={(props) => (
          <ProjectView {...props} projects={projects} />
        )}
      />
      <Route
        path={`${match.url}/task-board`}
        render={(props) => (
          <Taskboard {...props} projects={projects} />
        )}
      />
    </Switch>
  );
};

export default ProjectRoute;
