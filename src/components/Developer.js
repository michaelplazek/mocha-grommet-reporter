import React from 'react';
import { PropTypes } from 'prop-types';

import DevBody from './DevBody';

import Box from 'grommet/components/Box';

const Developer = (props) => {
  return (
    <Box>
      <DevBody
        suite = {props.suite}
        passes = {props.passes}
        failures = {props.failures}
        pending = {props.pending}
        total = {props.total}
        errors = {props.errors}
        stacks = {props.stacks}
      />
    </Box>
  );
};

Developer.propTypes = {
  suite: PropTypes.object,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  errors: PropTypes.array,
  stacks: PropTypes.array,
};

export default Developer;

