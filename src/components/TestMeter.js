import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';


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

  getTestValue(){
      return(
        this.props.tests.length + " / " + this.props.total
      );
    }

  render(){
    return(
    <Box margin="medium">
      <Meter
        stacked={true}
        type="circle"
        size="small"
        max={this.props.total}
        label={<Value responsive={true} units="tests" value={this.getTestValue()}/>}
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
  timedout: PropTypes.number,
  tests: PropTypes.array
};

export default TestMeter;
