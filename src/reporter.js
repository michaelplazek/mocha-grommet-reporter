import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

const listeners = [];

export default function JSONReporter(runner) {
  //Base.call(this, runner);

  function notifyListeners(){
    listeners.forEach( (listener) => {
      listener();
    } )
  }

  const mochaElement = document.getElementById('mocha');

  console.log("START mocha-ui JSON reporter called");

  let self = this;
  let suites = [];
  let tests = [];
  let pending = [];
  let failures = [];
  let passes = [];
  let time = 0;

  runner.on('start', ()=> {
    ReactDOM.render(
      <Main
        suites = {runner.suite.suites}
        passes = {passes}
        failures = {failures}
        pending = {pending}
        total = {runner.total}

        listeners = {listeners}
      />
      , mochaElement);
  });

  runner.on('suite end', function (suite) {
    suites.push(suite);
  });

  runner.on('test end', function (test) {
    tests.push(test);

    notifyListeners();

    // ReactDOM.render(
    //   <Main
    //     tests = {tests}
    //     suites = {runner.suite}
    //     passes = {passes}
    //     failures = {failures}
    //     pending = {pending}
    //     total = {runner.total}
    //     time = {getTotalTime(time, test)}
    //   />
    //   , mochaElement);

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

    let obj = {
      stats: self.stats,
      tests: tests.map(clean),
      pending: pending.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean)
    };

    runner.testResults = obj;

    //process.stdout.write(JSON.stringify(obj, null, 2));
  });
}

function getTotalTime(time, test){
  if(test.duration) {
    time += (test.duration/1000);
  }
  return time;
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @api private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    duration: test.duration,
    currentRetry: test.currentRetry(),
    err: errorJSON(test.err || {})
  };
}

/**
 * Transform `error` into a JSON object.
 *
 * @api private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
  let res = {};
  Object.getOwnPropertyNames(err).forEach(function (key) {
    res[key] = err[key];
  }, err);
  return res;
}
