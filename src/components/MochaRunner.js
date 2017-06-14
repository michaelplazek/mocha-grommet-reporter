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

  }

  // componentDidMount() {
  //
  //   runner.on('start', )
  // }

  render() {
    return(
        <MochaDisplay
           runner={runner}
        />

    );
  }
}

// SET UP MOCHA OUTSIDE OF CLASS

mocha.setup({
  ui: 'bdd',
  slow: 1500,
  timeout: 10000,
  reporter: reporter
});

require('../index.test.js');

function eventHandler(){
  console.log('HANDLE EVENTS HERE MAYBE');
}

function reporter(runner){
  // mocha.reporters.Base.call(this, runner);
  runner.on('start', eventHandler);
}

const runner = mocha.run();

// END OF MOCHA SETUP

export default MochaRunner;
