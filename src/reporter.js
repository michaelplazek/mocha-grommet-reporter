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

  function findFailedSuites(){
    if(suites){
      suites.forEach(suite => {
        if(suite.tests.some(test => test.state === "failed")){
          failed_suites.push(suite);
        }
      })
    }
  }

  function addZero(currentdate){
    if(currentdate.getMinutes.toString().length == 1){
      return "0" + currentdate.getMinutes.toString();
    }
    else{
      return currentdate.getMinutes();
    }
  }

  function getTime(){
    let currentdate = new Date();
    if(last_test.length == 0){
      last_test.push((currentdate.getMonth()+1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " at "
        + currentdate.getHours() + ":"
        + addZero(currentdate));
    }
    else{
      last_test.pop();
      last_test.push((currentdate.getMonth()+1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " at "
        + currentdate.getHours() + ":"
        + addZero(currentdate));
    }
  }

  const mochaElement = document.getElementById('mocha');

  console.log("START mocha-grommet-reporter called");

  let suites = [];
  let failed_suites = [];
  let tests = [];
  let pending = [];
  let failures = [];
  let passes = [];
  let errors = [];
  let time = [];
  let last_test = [];

  ReactDOM.render(
    <Main
      suite = {runner.suite}
      tests = {tests}
      suite_list = {suites}
      passes = {passes}
      failures = {failures}
      pending = {pending}
      total = {runner.total}
      time = {time}
      errors = {errors}
      failed_suites = {failed_suites}
      last_test = {last_test}
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
    findFailedSuites();
    getTime();
    notifyListeners();
    console.log("END mocha-grommet-reporter called");
  });
}


