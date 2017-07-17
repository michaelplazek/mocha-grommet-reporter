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

import DashBody from './DashBody';
import DevBody from './DevBody';
import SuiteMeter from "./SuiteMeter";

class Display extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      tab: 0
    };

    this.setPage = this.setPage.bind(this);
    this.getSuiteMeter = this.getSuiteMeter.bind(this);
  }

  // SUITE GETTERS

  getSuitePasses(suite, pass) {
    if (suite) {
      suite.suites.forEach(item => {
        if (item.tests.every(test => this.getTestStatus(test) === 'ok')) {
          pass++;
        }
        if(item.suites.length > 0){
          pass = this.getSuitePasses(item, pass);
        }
      });
    }
    return pass;
  }

  getSuiteFailures(suite, fail) {
    if (suite) {
      suite.suites.forEach(item => {
        if (item.tests.some(test => this.getTestStatus(test) === 'critical')) {
          fail++;
        }
        if(item.suites.length > 0){
          fail = this.getSuiteFailures(item, fail);
        }
      });
    }
    return fail;
  }

  getSuiteWarnings(suite, warn) {
    if (suite) {
      suite.suites.forEach(item => {
        if (item.tests.some(test => this.getTestStatus(test) === 'warning') && !item.tests.some(test => this.getTestStatus(test) === 'critical')) {
          warn++;
        }
        if(item.suites.length > 0){
          warn = this.getSuiteWarnings(item, warn);
        }
      });
    }
    return warn;
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

  getLastTestTag() {
    let result = null;
    if (this.props.last_test.length > 0) {
      result = <Label margin="small">Last test performed on&nbsp;{this.props.last_test[0]}</Label>;
    }
    return result;
  }

  getSubHeader(){
    let timer = this.getLastTestTag();
    let slowtext =  "slow tests";

    if(this.getSlowTests() === 1){slowtext = "slow test";}

    if(this.getSlowTests() > 0){
      return(
        <Animate enter={{"animation": "fade", "duration": 1500, "delay": 250}}>
          <Box>
            {timer}
            <Label margin="none" >
              <Status value="warning" />     {this.getSlowTests()} {slowtext}
            </Label>
          </Box>
        </Animate>
      );
    }
    else{
      return timer;
    }
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
          failed_suites={this.props.failed_suites}
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
        />
      );
    }
  }

  getSuiteMeter(){
    if(this.state.page === 1){
      return(
        <SuiteMeter
          size="small"
          suite={this.props.suite}
          suite_list={this.props.suite_list}
          pass_count={this.getSuitePasses(this.props.suite, 0)}
          fail_count={this.getSuiteFailures(this.props.suite, 0)}
          warning_count={this.getSuiteWarnings(this.props.suite, 0)}
          total_suites={this.getSuiteLength(this.props.suite, 0)}
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
    if(this.state.page === 0){
      return "Overhead Dashboard";
    }
    else{
      return "Developer Dashboard";
    }
  }

  getToggleLabel(){
    if (this.state.page === 1){
      return (
        <Label size="small" margin="small">
          Switch to Overhead View
        </Label>
      );
    }
    else{
      return (
        <Label size="small" margin="small">
          Switch to Developer View
        </Label>
      );
    }
  }

  render() {
    return (
      <Article full={true}>
        <Header colorIndex="light-2" pad="large" justify="between" direction="row" margin={{vertical:"small"}}>
          <Box>
            <Headline>{this.getTitle()}</Headline>
            {this.getSubHeader()}
          </Box>

          {this.getSuiteMeter()}

          <Box justify="center">
            <Label margin="none" align="center">
            <CheckBox
              reverse={true}
              toggle={true}
              onChange={this.setPage}
            />
            </Label>
            {this.getToggleLabel()}
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
  last_test: PropTypes.array,
  errors: PropTypes.array,
  stacks: PropTypes.array,
  slow: PropTypes.array,
};

export default Display;
