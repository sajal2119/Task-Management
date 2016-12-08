import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import { createStore, applyMiddleware } from 'redux';
import hashHistory from 'react-router/lib/hashHistory';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';

import routes from './config/routes';
import rootReducer from './reducers';

// Apply the middleware to the store
const reactRouterMiddleware = routerMiddleware(hashHistory);

// Add the reducer to your store on the `routing` key
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    reactRouterMiddleware // lets us dispatch() functions related to React-Router-Redux
  )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>
), document.getElementById('container'));
