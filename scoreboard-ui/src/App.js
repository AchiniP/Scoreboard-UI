import {useRoutes} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';
import theme from './theme';
import {appRoutes} from './routes';
import GlobalStyles from './components/GlobalStyles';

const App = () => {
  const routing = useRoutes(appRoutes);
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ThemeProvider theme={theme}>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
