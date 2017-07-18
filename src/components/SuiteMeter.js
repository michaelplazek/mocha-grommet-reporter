import React, { Component, PropTypes } from 'react';

import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';

class SuiteMeter extends Component{
  constructor(props){
    super(props);

    if(this.isLoaded()){
      this.state = {
        value: (this.props.fail_count + this.props.warning_count) + " / " + this.props.total_suites,
        units:"suites failed"
      };
    }
    else{
      this.state = {
        value: Number((this.props.suite_list.length/this.props.total_suites)*100).toFixed(0) + "%",
        units:"completed"
      };
    }
  }

  isLoaded() {
    return this.props.fail_count + this.props.warning_count + this.props.pass_count === this.props.total_suites;
  }

  getSuiteMeterLabel(){
    if(this.isLoaded()){
      this.setState({
        value: (this.props.fail_count + this.props.warning_count) + " / " + this.props.total_suites,
        units:"suites failed"
      });
    }
    else{
      this.setState({
        value: Number((this.props.suite_list.length/this.props.total_suites)*100).toFixed(0) + "%",
        units:"completed"
      });
    }
  }

  componentWillReceiveProps(nextProps){

    if(this.isLoaded()){
      this.setState({
        value: (this.props.fail_count + this.props.warning_count) + " / " + this.props.total_suites,
        units:"suites failed"
      });
    }
    else{
      this.setState({
        value: Number((nextProps.suite_list.length/nextProps.total_suites)*100).toFixed(0) + "%",
        units:"completed"
      });
    }
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
        units:"slow"
      });
    }
    else{
      this.getSuiteMeterLabel();
    }
  }

  render(){
    return(
      <Meter
        onActive={(index) => {this.getSuiteDisplay(index);}}
        type="circle"
        size={this.props.meter_size}
        stacked={true}
        label={<Value responsive={true}  size={this.props.text_size} units={this.state.units} value={this.state.value}/>}
        max={this.props.total_suites}
        series={[{"label": "Passed", "onClick":this.props.click_pass, "colorIndex": "ok", "value": this.props.pass_count},
          {"label": "Failed", "onClick":this.props.click_fail, "colorIndex": "critical", "value": this.props.fail_count},
          {"label": "Slow", "onClick":this.props.click_warn, "colorIndex": "warning", "value": this.props.warning_count}
        ]}
      />
    );
  }
}

SuiteMeter.propTypes = {
  suite: PropTypes.object,
  meter_size: PropTypes.string,
  text_size: PropTypes.string,
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
