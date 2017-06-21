import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

const listeners = [];

export function add(set) {
  listeners.push(set);
}

export default function reporter(runner) {

  function notifyListeners() {
    listeners.forEach(function (listener) {
      listener();
    });
  }

  const mochaElement = document.getElementById('mocha');

  console.log("START mocha-ui JSON reporter called");

  let suites = [];
  let tests = [];
  let pending = [];
  let failures = [];
  let passes = [];
  let time = 0;

  ReactDOM.render(
    <Main
      suites = {runner.suite.suites}
      passes = {passes}
      failures = {failures}
      pending = {pending}
      total = {runner.total}
      time = {time}
    />
    , mochaElement);

  runner.on('start', ()=> {

  });

  runner.on('suite end', function (suite) {
    suites.push(suite);
  });

  runner.on('test end', function (test) {
    tests.push(test);
    notifyListeners();
  });

  runner.on('pass', function (test) {
    passes.push(test);
  });

  runner.on('fail', function (test) {
    failures.push(test);
  });

  runner.on('pending', function (test) {
    pending.push(test);
  });

  runner.on('end', function () {
    console.log("END mocha-ui JSON reporter called");
  });
}

// function getTotalTime(time, test){
//   if(test.duration) {
//     time += (test.duration/1000);
//   }
//   return time;
// }

