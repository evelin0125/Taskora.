import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Teal
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // Orange
      contrastText: '#fff',
    },
    background: {
      default: '#f0f4f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

export default theme;