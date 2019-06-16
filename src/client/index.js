import React from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);
