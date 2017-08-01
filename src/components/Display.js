import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Headline from 'grommet/components/Headline';
import CheckBox from 'grommet/components/CheckBox';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';
import Animate from 'grommet/components/Animate';
import Button from 'grommet/components/Button';
import DashboardIcon from 'grommet/components/icons/base/Dashboard';
import ServicesIcon from 'grommet/components/icons/base/Services';

import DashBody from './DashBody';
import DevBody from './DevBody';
import SuiteMeter from "./SuiteMeter";
import TestMeter from './TestMeter';

class Display extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      tab: 0
    };

    this.setPage = this.setPage.bind(this);
    this.getTestMeter = this.getTestMeter.bind(this);
    this.handleChildClickWarn = this.handleChildClickWarn.bind(this);
  }

  // SUITE GETTERS

  getSuiteStatus(suite) {
    let result = 'unknown';
    if (suite && suite.tests) {
      if (suite.tests.every(test => this.getTestStatus(test) === 'ok')) {
        result = 'ok';
      } else if (suite.tests.some(test => this.getTestStatus(test) === 'critical')) {
        result = 'critical';
      } else if (suite.tests.every(test => this.getTestStatus(test) === 'unknown')) {
        result = 'unknown';
      } else if (suite.tests.some(test => this.getTestStatus(test) === 'warning') && !suite.tests.some(test => this.getTestStatus(test) === 'critical')){
        result = "warning";
      } else {
        result = 'unknown';
      }
      return result;
    }
  }

  getSuitePasses(suite, pass) {
    if (suite) {
      suite.suites.forEach(item => {
        if (item.tests.every(test => this.getTestStatus(test) === 'ok') && item.suites.every(suite => this.getSuiteStatus(suite) === 'ok')) {
          pass++;
        }
        if(item.suites.length > 0){
          pass = this.getSuitePasses(item, pass);
        }
      });
    }
    return pass;
  }

  getSuiteWarnings(suite, warn) {
    if (suite) {
      if ((suite.tests.some(test => this.getTestStatus(test) === 'warning') && !suite.tests.some(test => this.getTestStatus(test) === 'critical'))
      || (suite.suites.some(suite => this.getSuiteStatus(suite) === 'warning') && !suite.suites.some(test => this.getSuiteStatus(suite) === 'critical'))){
        warn++;
      }
      suite.suites.forEach(item => {
        warn = this.getSuiteWarnings(item, warn);
      });
    }
    return warn;
  }

  getSuiteFailures(suite, fail) {
    if (suite) {
      suite.suites.forEach(item => {
        if (item.tests.some(test => this.getTestStatus(test) === 'critical') || item.suites.some(suite => this.getSuiteStatus(suite) === 'critical')) {
          fail++;
        }
        if(item.suites.length > 0){
          fail = this.getSuiteFailures(item, fail);
        }
      });
    }
    return fail;
  }

  getSuiteLength(suite, count) {
    if (suite) {
      count += suite.suites.length;
      suite.suites.forEach(item => {
        if(item.suites.length > 0){
          count = this.getSuiteLength(item, count);
        }
      });
    }
    return count;
  }

  // END SUITE GETTERS

  getTestStatus(test) {

    if (test && test.state) {
      switch (test.state) {
        case "passed":
          switch(true){
            case test.duration >= test._slow:
              return "warning";
            case test.duration < test._slow:
              return "ok";
          }
          break;

        case "failed":
          return "critical";

        default:
          return "warning";
      }
    }
  }

  getSlowTests(){
    if(this.props.slow){
      return this.props.slow.length;
    }
    return 0;
  }

  getFailedTests(){
    if(this.props.failures.length){
      return this.props.failures.length;
    }
  }

  getLastTestTag() {
    let result = null;
    if (this.props.last_test.length > 0) {
      if(this.state.page === 0){
        result = <b><Label size="medium">Last suite completed on&nbsp;{this.props.last_test[0]}</Label></b>;
      }
      else{
        result = <Label size="medium" margin="none">Last test completed on&nbsp;{this.props.last_test[0]}</Label>;
      }
    }
    return result;
  }

  getSubHeader(){
    let timer = this.getLastTestTag();

    return(
      <Animate enter={{"animation": "fade", "duration": 1500, "delay": 250}}>
        <Box align="center">
          {timer}
        </Box>
      </Animate>
    );
  }

  setPage() {
    if (this.state.page === 0) {
      this.setState({
        page: 1,
        tab:0
      });
    }
    else {
      this.setState({
        page: 0,
        tab:0
      });
    }
  }


  getPage(){
    if (this.state.page === 0) {
      return (
        <DashBody
          suite={this.props.suite}
          tests={this.props.tests}
          suite_list={this.props.suite_list}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          unreached={this.props.unreached}
          failed_suites={this.props.failed_suites}
          warning_suites = {this.props.warning_suites}
          pass_count={this.getSuitePasses(this.props.suite, 0)}
          fail_count={this.getSuiteFailures(this.props.suite, 0)}
          warning_count={this.getSuiteWarnings(this.props.suite, 0)}
          total_suites={this.getSuiteLength(this.props.suite, 0)}
          click = {() => {this.handleChildClickAll();}}
          click_pass = {() => {this.handleChildClickPass();}}
          click_fail = {() => {this.handleChildClickFail();}}
          click_warn = {() => {this.handleChildClickWarn();}}
        />
      );
    }

    else {
      return (
        <DevBody
          suite={this.props.suite}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          errors={this.props.errors}
          stacks = {this.props.stacks}
          tab = {this.state.tab}
          unreached={this.props.unreached}
        />
      );
    }
  }

  getTestMeter(){
    if(this.state.page === 1){
      return(
        <TestMeter
          text_size="small"
          meter_size="medium"
          passes = {this.props.passes}
          failures = {this.props.failures}
          slow = {this.props.slow}
          tests = {this.props.tests}
          total = {this.props.total}
          click_pass = {() => {this.handleChildClickPass();}}
          click_fail = {() => {this.handleChildClickFail();}}
          click_warn = {() => {this.handleChildClickWarn();}}
        />
      );
    }
      return null;
  }

  handleChildClickAll(){
    this.setState({
      page:1,
      tab:0
    });
  }

  handleChildClickPass(){
    this.setState({
      page:1,
      tab:1
    });
  }

  handleChildClickFail(){
    this.setState({
      page:1,
      tab:2
    });
  }

  handleChildClickWarn(){
    this.setState({
      page:1,
      tab:3
    });
  }

  getTitle(){
    if(this.state.page === 1){
      return "Test Details";
    }
    else{
      return "Summary";
    }
  }

  getButtonLabel(){
    if (this.state.page === 1){
      return (
        <Label margin="small">
          Dashboard View
        </Label>
      );
    }
    else{
      return (
        <Label margin="small">
          Detailed View
        </Label>
      );
    }
  }

  getButtonIcon(){
    if (this.state.page === 1){
      return (
        <DashboardIcon />
      );
    }
    else{
      return (
        <ServicesIcon />
      );
    }
  }

  // getFix(){
  //   if(this.state.page === 0){return false;}
  //   else{return true;}
  // }

  getNotification(){
    if(this.props.unreached > 0 && this.state.page === 0){
      return <Label size="small"><Status value="warning" />&nbsp;&nbsp;{this.getMessage()}</Label>
    }
  }

  getMessage(){
    return this.props.unreached + " suites were skipped. Check hooks."
  }

  render() {
    return (
      <Article full={true}>
        <Header colorIndex="light-2" pad={{horizontal:"medium", vertical:"small"}} justify="between" direction="row" margin={{vertical:"medium"}}>
          <Box>
            <Headline strong={true} size="small" margin="none">{this.getTitle()}</Headline>
            {this.getSubHeader()}
          </Box>

          {this.getNotification()}

          {this.getTestMeter()}

          <Box>
            <Label margin="none" >
              <Button
                primary={true}
                type="button"
                onClick={this.setPage}
                label={this.getButtonLabel()}
                icon={this.getButtonIcon()}
              />
            </Label>
          </Box>

        </Header>

        {this.getPage()}

      </Article>
    );
  }
}

Display.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  warning_suites: PropTypes.array,
  last_test: PropTypes.array,
  errors: PropTypes.array,
  stacks: PropTypes.array,
  slow: PropTypes.array,
  unreached: PropTypes.array
};

export default Display;
