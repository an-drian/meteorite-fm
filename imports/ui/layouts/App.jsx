import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppTopNavBar from '../components/main_navigation/AppTopNavBar';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#00BCD4',
    primary2Color: '#0097A7',
    primary3Color: '#B2EBF2',
    accent1Color: '#FF5722',
    accent2Color: '#FF5722',
    accent3Color: '#FF5722',
    textColor: '#757575',
    alternateTextColor: '#212121',
    canvasColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: '#000000',
  },
});


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
