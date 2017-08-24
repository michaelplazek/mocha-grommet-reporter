// © Copyright 2017 Hewlett Packard Enterprise Development LP
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

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

  function findFailedSuites(suites){
    if(suites){
      suites.forEach(suite => {
        if(suite.tests.some(test => test.state === "failed")){
          if(suite.suites.length > 0){
            findFailedSuites(suite.suites);
          }
          if(failed_suites.every(failed_suite => failed_suite.title !== suite.title))
          {failed_suites.push(suite);}
        }
      });
    }
  }

  function getUnreachedSuiteCount(suite, count) {
    if (suite) {
      suite.suites.forEach(item => {
        count++;
        if(item.suites.length > 0){
          count = getUnreachedSuiteCount(item, count);
        }
      });
    }
    return count;
  }

  // function getUnreached(){
  //   if(unreached.length > 1){
  //     unreached[0] += unreached.pop();
  //   }
  // }

  function findWarningSuites(suites){
    if(suites){
      suites.forEach(suite => {
        if(suite.tests.some(test => test.state === "passed" && test.duration > test._slow)){
          if(suite.suites.length > 0){
            findWarningSuites(suite.suites);
          }
          if(warning_suites.every(warning_suite => warning_suite.title !== suite.title))
          {warning_suites.push(suite);}
        }
      });
    }
  }

  function addZero(currentdate){
    if(currentdate.getMinutes().toString().length === 1){
      return "0" + currentdate.getMinutes().toString();
    }
    else{
      return currentdate.getMinutes();
    }
  }

  function getTime(){
    let currentdate = moment().format('MMMM Do YYYY, h:mm a');
    // let currentdate = new Date();
    if(last_test.length === 0){
      last_test.push(currentdate);
    //     + currentdate.getDate() + "/"
    //     + currentdate.getFullYear() + " at "
    //     + currentdate.getHours() + ":"
    //     + addZero(currentdate));
    }
    else{
      last_test.pop();
      last_test.push(currentdate);
    //     + currentdate.getDate() + "/"
    //     + currentdate.getFullYear() + " at "
    //     + currentdate.getHours() + ":"
    //     + addZero(currentdate));
    }
  }

  const mochaElement = document.getElementById('mocha');

  let suites = [];
  let failed_suites = [];
  let warning_suites = [];
  let tests = [];
  let pending = [];
  let failures = [];
  let passes = [];
  let errors = [];
  let stacks = [];
  let time = [];
  let last_test = [];
  let slow = [];
  let hooks = [];
  let unreached = [];

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
      stacks = {stacks}
      failed_suites = {failed_suites}
      warning_suites = {warning_suites}
      last_test = {last_test}
      slow = {slow}
      unreached = {unreached}
    />
    , mochaElement);

  runner.on('start', ()=> {

  });

  runner.on('hook', function(hook){
    hooks.push(hook);
  });

  runner.on('suite end', function (suite) {
    if(suite.tests.length > 0){
      suites.push(suite);
    }
  });

  runner.on('test end', function (test) {
    tests.push(test);

    if(test.duration){
      time.push(test.duration);
    }

    notifyListeners();
  });

  runner.on('pass', function (test) {
    if(test.duration >= test._slow){
      slow.push(test);
    }
    else{
      passes.push(test);
    }
  });

  runner.on('fail', function (test, err) {
    if(test.type === 'hook'){
      unreached.push(getUnreachedSuiteCount(test.parent, 1));
    }
    else{
      failures.push(test);
      errors.push(err.message);
      stacks.push(err.stack);
    }
  });

  runner.on('pending', function (test) {
    pending.push(test);
  });

  runner.on('end', function () {
    findFailedSuites(suites);
    findWarningSuites(suites);
    getTime();
    notifyListeners();
  });
}
