// Read this to include independent polyfills https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md

// import "core-js";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Search from 'modules/Search';
import Profile from 'modules/Profile';

import configureStore from 'store';

import 'index.styl';

// Initialize app variables
const store = configureStore().store;


function renderSearch() {
  ReactDOM.render(
    <Provider store={store}>
      <Search />
    </Provider>,
    document.getElementById('search-root')
  );
}

function renderProfile() {
  ReactDOM.render(
    <Provider store={store}>
      <Profile />
    </Provider>,
    document.getElementById('profile-root')
  );
}

window.onload = function(e){
  renderSearch();
  renderProfile();
};

