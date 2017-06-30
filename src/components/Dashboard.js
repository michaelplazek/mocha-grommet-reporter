import React from 'react';

import Body from './Body';
import Alert from './Alert';

import Box from 'grommet/components/Box';

const Dashboard = (props) => {
  return (
    <Box>
      <Body
        suite={props.suite}
        tests={props.tests}
        suite_list={props.suite_list}
        passes={props.passes}
        failures={props.failures}
        pending={props.pending}
        total={props.total}
        failed_suites={props.failed_suites}
      />

      <Alert
        suite={props.suite_list}
        tests={props.tests}
      />
    </Box>
  );
};

export default Dashboard;

