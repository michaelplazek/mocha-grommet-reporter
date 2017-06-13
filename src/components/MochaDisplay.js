/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component, PropTypes } from 'react';

import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';

import MochaStatus from './MochaStatus';

const MochaDisplay = (props) => {

  return (
    <Box colorIndex="neutral-4-t" alignContent="center">
        <Headline>
          Mocha Display
        </Headline>
            <MochaStatus
              runner = {props.runner}
            />
    </Box>
    // TODO: add components we want to display
  );
};

MochaStatus.propTypes = {
  runner: PropTypes.Object
};

export default MochaDisplay;
