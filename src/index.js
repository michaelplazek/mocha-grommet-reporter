/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';

import 'grommet/grommet-hpe.min.css';
import 'grommet/grommet.min.css';

import App from './App';

console.log('Index is running...');

const element = document.getElementById('app');
ReactDOM.render(<App />, element);
