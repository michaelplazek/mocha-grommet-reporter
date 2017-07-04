import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

class TestMeter extends Component{
  constructor(props){
    super(props);
  }

  getPasses() {
    if (this.props.passes) {
      return this.props.passes.length;
    }
    else {
      return 0;
    }
  }

  getFailures() {
    if (this.props.failures) {
      return this.props.failures.length;
    }
    else {
      return 0;
    }
  }

  render(){
    return(
    <Box>
      <AnnotatedMeter
        legend={false}
        type="circle"
        size="small"
        max={this.props.total}
        units="tests"
        series={[{"label": "Passed", "colorIndex": "ok", "value": Number(this.getPasses())},
          {"label": "Failed", "colorIndex": "critical", "value": Number(this.getFailures())}]}
      />
    </Box>
    );
  }
}

TestMeter.propTypes = {
  passes: PropTypes.array,
  failures: PropTypes.array,
  total: PropTypes.number
};

export default TestMeter;
