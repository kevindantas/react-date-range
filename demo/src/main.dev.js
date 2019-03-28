import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Docs from './Docs';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Docs);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Docs', () => {
    render(Docs);
  });
}
