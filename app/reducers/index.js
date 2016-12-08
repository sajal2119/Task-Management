import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projectDetails from './projectDetails';

// Combine all custom reducers along with routeReducer, which keeps track of router state
const rootReducer = combineReducers({
  projectDetails,
  routing: routerReducer
});

export default rootReducer;
