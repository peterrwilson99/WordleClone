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
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
    }
  },
});

export default lightTheme;