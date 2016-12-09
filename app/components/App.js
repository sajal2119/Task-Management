import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({});

const App = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="container" style={{ padding: '0px', width: '100%' }}>
      {props.children && React.cloneElement(props.children, {})}
    </div>
  </MuiThemeProvider>

);

App.propTypes = {
  children: PropTypes.node
};

export default App;
