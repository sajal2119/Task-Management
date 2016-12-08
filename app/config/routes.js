import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from '../components/App';
import Error404 from '../components/Error404';
import { ProjectListing, ProjectDetails } from '../components/ProjectListing/container';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={ProjectListing} />
      <Route path=":projectKey" component={ProjectDetails} />
      <Route path="*" component={Error404} />
    </Route>
);
