import React from 'react';

import DevBody from './DevBody';

import Box from 'grommet/components/Box';

const Developer = (props) => {
  return (
    <Box>
      <DevBody
        suite_list = {props.suite_list}
        passes = {props.passes}
        failures = {props.failures}
        pending = {props.pending}
        total = {props.total}
      />
    </Box>
  );
};

export default Developer;

