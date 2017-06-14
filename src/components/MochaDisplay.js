/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';

import MochaStatus from './MochaStatus';
import MochaEvents from './MochaEvents';

const MochaDisplay = (props) => {

  return (
    <Section>
    <Box colorIndex="neutral-4-t" alignContent="center">
      <Box pad="large">
        <Heading>
          Mocha Display
        </Heading>
        <MochaStatus
          runner = {props.runner}
        />
      </Box>
    </Box>
      <MochaEvents
        runner = {props.runner}
      />
    </Section>

    // TODO: add components we want to display
  );
};

MochaDisplay.propTypes = {
  runner: PropTypes.object
};

export default MochaDisplay;
