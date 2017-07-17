import React, { Component, PropTypes } from 'react';

import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';

class SuiteMeter extends Component{
  constructor(props){
    super(props);

    const { suite_list, total_suites } = this.props;

    this.state = {
      value: Number((suite_list.length/total_suites)*100).toFixed(0) + "%",
      units:"suites"
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: Number((nextProps.suite_list.length/nextProps.total_suites)*100).toFixed(0) + "%",
      units:"suites"
    });
  }

  getSuiteDisplay(index){
    if(index === 0){
      this.setState({
        value:this.props.pass_count,
        units:"passes"
      });
    }
    else if(index === 1){
      this.setState({
        value:this.props.fail_count,
        units:"failures"
      });
    }
    else if(index === 2){
      this.setState({
        value:this.props.warning_count,
        units:"warnings"
      });
    }
    else{
      this.setState({
        value:Number((this.props.suite_list.length/this.props.total_suites)*100).toFixed(0) + "%",
        units:"suites"
      });
    }
  }

  render(){
    return(
      <Meter
        onActive={(index) => {this.getSuiteDisplay(index);}}
        type="circle"
        size={this.props.size}
        stacked={true}
        label={<Value responsive={true}  size={this.props.size} units={this.state.units} value={this.state.value}/>}
        max={this.props.total_suites}
        series={[{"label": "Passed", "onClick":this.props.click_pass, "colorIndex": "ok", "value": this.props.pass_count},
          {"label": "Failed", "onClick":this.props.click_fail, "colorIndex": "critical", "value": this.props.fail_count},
          {"label": "Warnings", "onClick":this.props.click_warn, "colorIndex": "warning", "value": this.props.warning_count}
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
  total_suites: PropTypes.number,
  click_pass: PropTypes.func,
  click_fail: PropTypes.func,
  click_warn: PropTypes.func
};

export default SuiteMeter;
