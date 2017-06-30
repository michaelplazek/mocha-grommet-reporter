import React from 'react';

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
      />
    </Box>
  );
};

export default Developer;

