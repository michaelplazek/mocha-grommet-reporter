import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

const TIMEOUT = 10000;

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
    let count = 0;
    if (this.props.failures) {
      this.props.failures.forEach(test => {
        if(test.duration <= TIMEOUT){
          count++;
        }
      });
    }
    else {
      return 0;
    }
    return count;
  }

  getTimeOuts() {
    let count = 0;
    if (this.props.failures) {
      this.props.failures.forEach(test => {
        if(test.duration > TIMEOUT){
          count++;
        }
      });
    }
    else {
      return 0;
    }
    return count;
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
          {"label": "Failed", "colorIndex": "critical", "value": Number(this.getFailures())},
          {"label": "Timed Out", "colorIndex": "warning", "value": Number(this.getTimeOuts())}
        ]}
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
