// © Copyright 2017 Hewlett Packard Enterprise Development LP
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component, PropTypes } from 'react';

import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

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
    // else if(this.props.total_suites > 0 && this.props.tests.length === 0){
    //   return 100 + "%";
    // }
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
    if(this.props.unreached && this.props.unreached > 0){
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
        label={<Box responsive={true} wrap={true}><Value responsive={true} units={this.state.units} size={this.props.text_size} value={this.state.value}/></Box>}
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
