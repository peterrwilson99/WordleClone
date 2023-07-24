import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6aaa64',
    },
    secondary: {
      main: '#c9b458',
    },
    error: {
      main: red.A400,
    },
    miss: {
      main: '#787c7e'
    },
    borderDefault: {
      main: '#d3d6da'
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#538d4e',
    },
    secondary: {
      main: '#b59f3b',
    },
    error: {
      main: red.A400,
    },
    miss: {
      main: '#3a3a3c'
    },
    borderDefault: {
      main: '#818384'
    },
  },
});

export default lightTheme;