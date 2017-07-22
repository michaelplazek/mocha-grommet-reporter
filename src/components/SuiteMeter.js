import React, { Component, PropTypes } from 'react';

import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Box from 'grommet/components/Box';

class SuiteMeter extends Component{
  constructor(props){
    super(props);

    if(this.isLoaded()){
      if(this.props.pass_count === this.props.total_suites){
        this.state = {
          value: "",
          units:"Suites Passed"
        };
      }
      else{
        this.state = {
          value: (this.props.fail_count + this.props.warning_count) + " / " + (this.props.total_suites - this.getUnreached()),
          units:"suites failed"
        };
      }
    }

    else if(this.isEmpty()){
      this.state = {
        value: "",
        units:"No Suites"
      };
    }
    else{
      this.state = {
        value: this.getPercent(this.props),
        units:"completed"
      };
    }
  }

  isLoaded() {
    return this.props.total_suites !== 0 && (this.props.fail_count + this.props.warning_count + this.props.pass_count === (this.props.total_suites - this.getUnreached()));
  }

  getPercent(props){
    if(this.props.total_suites > 0 && this.props.tests.length > 0){
      return Number((props.suite_list.length/props.total_suites)*100).toFixed(0) + "%";
    }
    else if(this.props.total_suites > 0 && this.props.tests.length === 0){
      return 100 + "%";
    }
  }

  getSuiteMeterLabel(){
    if(this.isLoaded()){
      if(this.props.pass_count === this.props.total_suites){
        this.setState({
          value:"",
          units:"Suites Passed"
        });
      }
      else{
        this.setState({
          value: (this.props.fail_count + this.props.warning_count) + " / " + (this.props.total_suites - this.getUnreached()),
          units:"suites failed"
        });
      }
    }
    else if(this.isEmpty()){
      this.setState({
        value:"",
        units:"No Suites"
      });
    }
    else{
      this.setState({
        value: this.getPercent(this.props),
        units:"completed"
      });
    }
  }

  isEmpty(){
    return this.props.total_suites === 0;
  }

  componentWillReceiveProps(nextProps){

    if(this.isLoaded()){
      if(this.props.pass_count === this.props.total_suites){
        this.setState({
          value:"",
          units:"Suites Passed"
        });
      }
      else{
        this.setState({
          value: (this.props.fail_count + this.props.warning_count) + " / " + (this.props.total_suites - this.getUnreached()),
          units:"suites failed"
        });
      }
    }
    else if(this.isEmpty()){
      this.setState({
        value:"",
        units:"No Suites"
      });
    }
    else{
      this.setState({
        value: this.getPercent(nextProps),
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

  getUnreached(){
    if(this.props.unreached && this.props.unreached.length > 0){
      return this.props.unreached;
    }
    else{
      return 0;
    }
  }

  render(){
    return(
      <Meter
        onActive={(index) => {this.getSuiteDisplay(index);}}
        type="circle"
        size={this.props.meter_size}
        stacked={true}
        label={<Box responsive={true} wrap={true}><Value responsive={true} size={this.props.text_size} units={this.state.units} value={this.state.value}/></Box>}
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
  tests: PropTypes.array,
  meter_size: PropTypes.string,
  text_size: PropTypes.string,
  suite_list: PropTypes.array,
  pass_count: PropTypes.number,
  fail_count: PropTypes.number,
  warning_count: PropTypes.number,
  total_suites: PropTypes.number,
  click_pass: PropTypes.func,
  click_fail: PropTypes.func,
  click_warn: PropTypes.func,
  unreached: PropTypes.number
};

export default SuiteMeter;
