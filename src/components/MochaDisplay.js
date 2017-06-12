/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component, PropTypes } from 'react';

import Heading from 'grommet/components/Headline';
import Box from 'grommet/components/Box';

import MochaStatus from './MochaStatus';

const MochaDisplay = (props) => {

  const { suite, failures } = props.runner;

  return (
    <Box alignSelf="center" pad="medium">
      <Box alignSelf="start">
        <Heading size="large">Mocha Display</Heading>
        <MochaStatus
          suite = {suite}
          failures = {failures}
        />
      </Box>
    </Box>
    // TODO: add components we want to display
  );
};

MochaStatus.propTypes = {
  runner: PropTypes.Object
};

export default MochaDisplay;
