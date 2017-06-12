/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component, PropTypes } from 'react';

import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';

class MochaStatus extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    console.log('MochaStatus is running...');
  }

  componentWillUpdate(){

  }

  render() {

    const { suite, failures } = this.props;

    return(
      <Box>
        <Label># of Suites:&nbsp;{suite.suites.length}</Label>
        <Label>&nbsp; | &nbsp;</Label>
        <Label># of Failures:&nbsp;{failures}</Label>
      </Box>
    );

  }
}

MochaStatus.propTypes = {
  suite: PropTypes.Object,
  failures: PropTypes.isInteger
};

export default MochaStatus;
