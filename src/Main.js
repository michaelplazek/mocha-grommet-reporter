/** * Created by plazek on 6/9/2017. */

import React from 'react';

import App from 'grommet/components/App';
import Display from './components/Display';

import 'grommet/grommet-hpe.min.css';

const Main = (props) => {

  console.log("Entering App...");

  return (
    <App>
      <Display
        suites = {props.suites}
        tests = {props.tests}
        passes = {props.passes}
        failures = {props.failures}
        pending = {props.pending}
        total = {props.total}
        time = {props.time}
      />
    </App>
  );
};

export default Main;
