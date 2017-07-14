import React, { Component, PropTypes } from 'react';

import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';


class SuiteMeter extends Component{
  constructor(props){
    super(props);
  }

  getSuiteValue(){
    return this.props.suite_list.length + " / " + this.props.total_suites;
  }

  render(){
    return(
      <Meter
        onActive={(index) => {this.getSuiteValue(index);}}
        type="circle"
        size={this.props.size}
        stacked={true}
        label={<Value responsive={true}  size={this.props.size} units="suites" value={this.getSuiteValue()}/>}
        max={this.props.total_suites}
        series={[{"label": "Passed", "colorIndex": "ok", "value": this.props.pass_count},
          {"label": "Failed", "colorIndex": "critical", "value": this.props.fail_count},
          {"label": "Warnings", "colorIndex": "warning", "value": this.props.warning_count}
        ]}
      />
    );
  }
}

SuiteMeter.propTypes = {
  suite: PropTypes.object,
  size: PropTypes.string,
  suite_list: PropTypes.array,
  pass_count: PropTypes.number,
  fail_count: PropTypes.number,
  warning_count: PropTypes.number,
  total_suites: PropTypes.number
};

export default SuiteMeter;
