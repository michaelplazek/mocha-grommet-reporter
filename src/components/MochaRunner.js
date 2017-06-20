/**
 * Created by plazek on 6/9/2017.
 */

import React, { Component } from 'react';

import MochaDisplay from './Display';

import { Mocha } from 'mocha/mocha.js';

require('mocha/mocha.css');

// require('../../api-tests/index.test.js');


function generate(ref) {
  return function (runner) {

    console.log('before reporter');

    if (runner) {
      runner.on('start', () => {
        ref.eventHandler();
        console.log('HANDLE EVENTS HERE MAYBE');
      });
    }

    console.log('after reporter');
  };
}

class MochaRunner extends Component {

  constructor(props) {
    super(props);

    console.log('start of MochaRunner constructor');

    this.eventHandler = this.eventHandler.bind(this);

    mocha.setup({
      ui: 'bdd',
      slow: 1500,
      timeout: 10000,
      reporter: generate(this)
    });

    this.runner = {};
    this.state = {};

    console.log('end of MochaRunner constructor');
  }

  componentDidMount(){
    console.log('MochaRunner is mounted');
    this.runner = mocha.run();
  }

  // reporter(runner){
  //
  //   console.log('before reporter');
  //
  //   if(runner) {
  //     runner.on('start', () => {
  //       this.eventHandler();
  //       console.log('HANDLE EVENTS HERE MAYBE');
  //     });
  //   }
  //
  //   console.log('after reporter');
  // }

  eventHandler(){
    console.log('HANDLE EVENTS HERE MAYBE');
  }

  render() {
    // return(
    //     <MochaDisplay
    //        runner={this.runner}
    //     />
    // );
    return null;
  }
}



export default MochaRunner;
