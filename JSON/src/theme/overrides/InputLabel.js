export default function InputLabel(theme) {
    return {
    MuiInputLabel: {
        styleOverrides: {
          root: {
            '&fontFamily':theme.palette.text.primary
          },
          
        }
      }
    };
  }