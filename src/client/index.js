import React from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './scss/application.scss';
import axios from 'axios';
import CardService from '../client/services/card-service';

const axiosInstance = axios.create({
  baseURL: 'https://search.moonpig.com',
});

const cardService = new CardService(axiosInstance);

render(
  <App cardService={cardService} />,
  document.getElementById('root')
);
