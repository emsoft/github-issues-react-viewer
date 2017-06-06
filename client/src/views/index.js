import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import { AppContainer } from 'react-hot-loader';
import App from './App';


mobx.useStrict(true);

const render = (Component, props) => {
  ReactDOM.render(
      <AppContainer>
        <Component {...props} />
      </AppContainer>,
      document.getElementById('root'),
  );
};

render(App);


if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
