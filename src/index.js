/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

console.log('App is running...');

const element = document.getElementById('content');
ReactDOM.render(<App />, element);
