import { hot } from 'react-hot-loader/root';
import ErrorBoundary from 'components/ErrorBoundary';

import Search from './components/Search';


class SearchApp extends React.Component {
  render() {
    return (
      <div class="Module">
        <ErrorBoundary>
          <Search />
        </ErrorBoundary>
      </div>
    );
  }
}

export default module.hot ? hot(SearchApp) : App;
