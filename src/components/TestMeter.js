import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Label';
import Status from 'grommet/components/icons/Status';
import Animate from 'grommet/components/Animate';


class TestMeter extends Component{
  constructor(props){
    super(props);

    if(this.isLoaded()){
      if(this.getPasses() === this.props.total){
        this.state = {
          value: "",
          units:"All Tests Passed"
        };
      }
      else{
        this.state = {
          value: (this.getFailures() + this.getWarnings()) + " / " + this.props.total,
          units:"tests failed"
        };
      }
    }
    else{
      this.state = {
        value: Number((this.props.tests.length/this.props.total)*100).toFixed(0) + "%",
        units:"completed"
      };
    }
  }

  componentWillReceiveProps(){

    if(this.isLoaded()){
      if(this.getPasses() === this.props.total){
        this.setState({
          value: "",
          units:"All Tests Passed"
        });
      }
      else{
        this.setState({
          value: (this.getFailures() + this.getWarnings()) + " / " + this.props.total,
          units:"tests failed"
        });
      }
    }
    else{
      this.setState({
        value: Number((this.props.tests.length/this.props.total)*100).toFixed(0) + "%",
        units:"completed"
      });
    }
  }

  getTestDisplay(index){
    if(index === 0){
      this.setState({
        value:this.props.passes.length,
        units:"passes"
      });
    }
    else if(index === 1){
      this.setState({
        value:this.props.failures.length,
        units:"failures"
      });
    }
    else if(index === 2){
      this.setState({
        value:this.props.slow.length,
        units:"slow"
      });
    }
    else{
      this.getTestMeterLabel();
    }
  }

  getTestMeterLabel(){
    if(this.isLoaded()){
      if(this.getPasses() === this.props.total){
        this.setState({
          value: "",
          units:"All Tests Passed"
        });
      }
      else{
        this.setState({
          value: (this.getFailures() + this.getWarnings()) + " / " + this.props.total,
          units:"tests failed"
        });
      }
    }
    else{
      this.setState({
        value: Number((this.props.tests.length/this.props.total)*100).toFixed(0) + "%",
        units:"completed"
      });
    }
  }

  isLoaded(){
    return this.props.passes.length + this.props.failures.length + this.props.slow.length === this.props.total;
  }

  getPasses() {
    if (this.props.passes) {
      return this.props.passes.length;
    }
  }

  getFailures() {
    if(this.props.failures){
      return this.props.failures.length;
    }
  }

  getWarnings(){
    return this.props.slow.length;
  }

  getTestValue(){
      return(
        this.props.tests.length + " / " + this.props.total
      );
    }

  getStatusList(){
    let slowtext =  "slow";
    let failtext = "failed";
    let passtext = "passed";

    let warn_status = null;
    let fail_status = null;
    let pass_status = null;

    if(this.getWarnings() > 0){
      warn_status = (
        <Label size={this.props.text_size} margin="none" style={{ cursor: 'pointer' }} onClick={this.props.click_warn}>
          <Status value="warning" />     {this.getWarnings()} {slowtext}
        </Label>
      );
    }

    if(this.getFailures() > 0){
      fail_status = (
        <Label size={this.props.text_size} margin="none" style={{ cursor: 'pointer' }} onClick={this.props.click_fail}>
          <Status value="critical" />     {this.getFailures()} {failtext}
        </Label>
      );
    }

    if(this.getPasses() > 0){
      pass_status = (
        <Label size={this.props.text_size} margin="none" style={{ cursor: 'pointer' }} onClick={this.props.click_pass}>
          <Status value="ok" />     {this.getPasses()} {passtext}
        </Label>
      );
    }

    return(
      <Animate enter={{"animation": "fade", "duration": 500, "delay": 100}}>
        <Box>
          {pass_status}
          {fail_status}
          {warn_status}
        </Box>
      </Animate>
    );
  }

  render(){
    return(
    <Box margin="medium">
      <Meter
        onActive={(index) => {this.getTestDisplay(index);}}
        stacked={true}
        type="bar"
        size={this.props.meter_size}
        max={this.props.total}
        label={<Value responsive={true} size={this.props.text_size} units={this.state.units} value={this.state.value}/>}
        series={[{"label": "Passed", "onClick":this.props.click_pass, "colorIndex": "ok", "value": Number(this.getPasses())},
          {"label": "Failed", "onClick":this.props.click_fail, "colorIndex": "critical", "value": Number(this.getFailures())},
          {"label": "Warnings", "onClick":this.props.click_warn, "colorIndex": "warning", "value": Number(this.getWarnings())}
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
  slow: PropTypes.array,
  tests: PropTypes.array,
  text_size: PropTypes.string,
  meter_size: PropTypes.string,
  click_pass: PropTypes.func,
  click_fail: PropTypes.func,
  click_warn: PropTypes.func
};

export default TestMeter;
