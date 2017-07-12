import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Headline from 'grommet/components/Headline';
import CheckBox from 'grommet/components/CheckBox';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';
import DashboardIcon from 'grommet/components/icons/base/Dashboard';
import TroubleshootIcon from 'grommet/components/icons/base/Troubleshoot';

import Dashboard from './Dashboard';
import Developer from './Developer';
import TestMeter from "./TestMeter";

class Display extends Component {

  constructor(props) {
    super(props);

    this.setPage = this.setPage.bind(this);
    this.state = {page: 0};
  }

  getTimeOuts() {
    let count = 0;
    if (this.props.failures) {
      this.props.failures.forEach(test => {
        if(test.duration > test._timeout){
          count++;
        }
      });
    }
    else {
      return 0;
    }
    return count;
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
    let timeouttext = "timeouts";

    if(this.getSlowTests() === 1){slowtext = "slow test";}
    if(this.getTimeOuts() === 1){timeouttext = "timeout";}

    if(this.getSlowTests() > 0 || this.getTimeOuts() > 0){
      return(
        <Box>
          {timer}
          <Label margin="none">
            <Status value="warning" />     {this.getSlowTests()} {slowtext}   |   {this.getTimeOuts()} {timeouttext}
          </Label>
        </Box>
      );
    }
    else{
      return timer;
    }
  }

  setPage() {
    if (this.state.page === 0) {
      this.setState({page: 1});
    }
    else {
      this.setState({page: 0});
    }
  }

  getPage(){
    if (this.state.page === 0) {
      return (
        <Dashboard
          suite={this.props.suite}
          tests={this.props.tests}
          suite_list={this.props.suite_list}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          failed_suites={this.props.failed_suites}
        />
      );
    }

    else {
      return (
        <Developer
          suite={this.props.suite}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          errors={this.props.errors}
        />
      );
    }
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
      return <DashboardIcon type="logo"/>;
    }
    else{
      return <TroubleshootIcon type="logo"/>;
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

          <TestMeter
            passes = {this.props.passes}
            failures = {this.props.failures}
            total = {this.props.total}
            slow = {this.getSlowTests()}
            timedout = {this.getTimeOuts()}
            tests = {this.props.tests}
          />

          <Label>
            <CheckBox
              toggle={true}
              onChange={this.setPage}
              label={this.getToggleLabel()}
            />
          </Label>

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
  slow: PropTypes.array
};

export default Display;
