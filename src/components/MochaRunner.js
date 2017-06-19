/**
 * Created by plazek on 6/9/2017.
 */

import React, { Component } from 'react';

import MochaDisplay from './MochaDisplay';

import { Mocha } from 'mocha/mocha.js';

require('mocha/mocha.css');

class MochaRunner extends Component {

  constructor(props) {
    super(props);

    console.log('start of MochaRunner constructor');

    console.log('end of MochaRunner constructor');
  }

  componentDidMount(){
    console.log('MochaRunner is mounted');
  }

  render() {
    return(
        <MochaDisplay
           runner={runner}
        />
    );
  }
}

mocha.setup({
  ui: 'bdd',
  slow: 1500,
  timeout: 10000,
  reporter: reporter
});

require('../../api-tests/index.test.js');

let runner = mocha.run();

function reporter(runner){

  console.log('before reporter');

  if(runner) {
    runner.on('start', () => {
      eventHandler();
    });
  }

  console.log('after reporter');
}

function eventHandler(){
  console.log('HANDLE EVENTS HERE MAYBE');
}

export default MochaRunner;
