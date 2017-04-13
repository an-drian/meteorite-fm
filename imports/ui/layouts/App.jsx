import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import appStyle from '../helpers/app_styles';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppTopNavBar from '../components/main_navigation/AppTopNavBar';
import PlayerWrapper from '../components/player/PlayerWrapper';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const muiTheme = getMuiTheme(appStyle);

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppTopNavBar />
      <div className="container">{children}</div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
