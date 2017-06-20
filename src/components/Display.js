/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';

import StatusHeader from './StatusHeader';
import Body from './Body';

const Display = (props) => {

  return (
    <Section>
        <Box colorIndex="brand" alignContent="center">
          <Box pad="large">
            <Heading>
              NCS API Tester
            </Heading>
            <StatusHeader
              total = {props.total}
              suites = {props.suites}
              time = {props.time}
            />
          </Box>
        </Box>

      <Body
        suites = {props.suites}
        passes = {props.passes}
        failures = {props.failures}
        pending = {props.pending}
        total = {props.total}
      />
    </Section>

    // TODO: add components we want to display
  );
};

Display.propTypes = {
  suites: PropTypes.array,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  time: PropTypes.number
};

export default Display;
