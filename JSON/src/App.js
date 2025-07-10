// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  const theme = ThemeConfig({
    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
    },});

  return (
    <ThemeConfig theme={theme}>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
