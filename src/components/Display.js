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
            <Heading>NCS API Tester</Heading>
            {/*<StatusHeader*/}
              {/*total = {props.total}*/}
              {/*suites = {props.suite.suites}*/}
            {/*/>*/}
          </Box>
        </Box>

      <Body
        suite = {props.suite}
        suite_list = {props.suite_list}
        passes = {props.passes}
        failures = {props.failures}
        pending = {props.pending}
        total = {props.total}
        top4 = {props.top4}
      />
    </Section>

    // TODO: add components we want to display
  );
};

Display.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  top4: PropTypes.array
};

export default Display;
