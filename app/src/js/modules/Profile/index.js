import { hot } from 'react-hot-loader/root';
import ErrorBoundary from 'components/ErrorBoundary';

import Profile from './components/Profile';


class ProfileApp extends React.Component {
  render() {
    return (
      <div class="Module">
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
      </div>
    );
  }
}

export default module.hot ? hot(ProfileApp) : App;
