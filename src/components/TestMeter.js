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
    let count = 0;
    if (this.props.failures) {
      this.props.failures.forEach(test => {
        if(test.duration <= test._timeout){
          count++;
        }
      });
    }
    else {
      return 0;
    }
    return count;
  }

  getWarnings(){
    return this.props.slow + this.props.timedout;
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
          {"label": "Warnings", "colorIndex": "warning", "value": Number(this.getWarnings())}
        ]}
      />
    </Box>
    );
  }
}

TestMeter.propTypes = {
  passes: PropTypes.array,
  failures: PropTypes.array,
  total: PropTypes.number,
  slow: PropTypes.number,
  timedout: PropTypes.number
};

export default TestMeter;
