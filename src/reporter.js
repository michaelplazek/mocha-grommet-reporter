import React from 'react';
import ReactDOM from 'react-dom';

import '../dist/index.css';

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

  function findWorst(){
    let temp = 0;
    let count =0;
    let suite_failures = [suites.length];
    suites.forEach(suite => {
      suite.tests.forEach(test => {
        if(test && test.state && test.state === 'failed' ){
          temp += 1;
        }
      })
      suite_failures[count] = temp;
      temp = 0;
      count++;
    })
    for(var i = 0; i <= 3; i++){
      let max = suite_failures.indexOf(Math.max(...suite_failures));
      top4.push(suites[max]);
      suite_failures.splice(max, 1);
      suites.splice(max,1);
    }
    top4.sort();
  }

  const mochaElement = document.getElementById('mocha');

  console.log("START mocha-grommet-reporter called");

  let suites = [];
  let tests = [];
  let pending = [];
  let failures = [];
  let passes = [];
  let errors = [];
  let time = [];
  let top4 = [];

  ReactDOM.render(
    <Main
      suite = {runner.suite}
      suite_list = {suites}
      passes = {passes}
      failures = {failures}
      pending = {pending}
      total = {runner.total}
      time = {time}
      errors = {errors}
      top4 = {top4}
    />
    , mochaElement);

  runner.on('start', ()=> {

  });

  runner.on('suite end', function (suite) {
    suites.push(suite);
  });

  runner.on('test end', function (test) {
    tests.push(test);

    if(test.duration){
      time.push(test.duration);
    }

    notifyListeners();
  });

  runner.on('pass', function (test) {
    passes.push(test);
  });

  runner.on('fail', function (test, err) {
    failures.push(test);
    errors.push(err.message);
  });

  runner.on('pending', function (test) {
    pending.push(test);
  });

  runner.on('end', function () {
    findWorst();
    notifyListeners();
    console.log("END mocha-grommet-reporter called");
  });
}


