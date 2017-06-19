/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

class MochaStatus extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    // this.setTimer();
    this.eventHandler();
    console.log('MochaStatus is running...');
  }

  componentWillUpdate(){

  }

  eventHandler(){
    // this.props.runner.on('end', this.endTimer);
  }

  // setTimer(){
  //   let start = new Date();
  // }
  //
  // endTimer(){
  //   let end = new Date();
  // }


  // unnecessary - just pull runner.total for total tests
  getNumberOfTests(){
    let count = 0;
    for(let i = 0; i < this.props.runner.suite.suites.length; i++) {
      for(let j = 0; j < this.props.runner.suite.suites[i].tests.length; j++) {
        count++;
      }
    }
    return count;
  }

  // updateComplete(){
  //   let test = 0;
  //   this.props.runner.on('test end', () => {
  //     test++;
  //   });
  //   return test;
  // }

  render() {

    const { suite, failures } = this.props.runner;

    const count = this.getNumberOfTests();

    return(
        <Label size="medium" margin="medium">{suite.suites.length}&nbsp;Suites&nbsp; | &nbsp;{count}&nbsp;Tests&nbsp; | &nbsp;{failures}&nbsp;Failures</Label>
    );

  }
}

MochaStatus.propTypes = {
  runner: PropTypes.object
};

export default MochaStatus;
