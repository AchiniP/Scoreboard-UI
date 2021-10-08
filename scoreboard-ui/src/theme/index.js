import {colors} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: '#5d5252',
      paper: '#403d3d',
    },
    primary: {
      main: '#000000',
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: '#F78B11',
      secondary: '#ffffff',
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows,
  typography,
});

export default theme;
