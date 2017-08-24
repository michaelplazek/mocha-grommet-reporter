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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SuiteMeter from './SuiteMeter';

import chunk from 'lodash.chunk';

import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Carousel from 'grommet/components/Carousel';
import Spinning from 'grommet/components/icons/Spinning';
import Label from 'grommet/components/Label';
import Animate from 'grommet/components/Animate';
import Status from 'grommet/components/icons/Status';

class DashBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      unreached:this.getUnreached(this.props)
    };

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({unreached:this.getUnreached(nextProps)});
  }

  getUnreached(props){
    if(props.unreached && props.unreached.length > 0){
      return props.unreached[0];
    }
    else{
      return 0;
    }
  }

  getSuite(suite, index) {
    return (
      <ListItem
        key={suite.title + index}
      >
        <Box>
          <div>
            {this.getSuiteHeading(suite)}
          </div>

            <Meter
              max={suite.tests.length}
              type="bar"
              size="large"
              stacked={true}
              series={[{"colorIndex": "ok", "onClick":this.props.click_pass, "value": Number(this.getTestPasses(suite))},
                {"colorIndex": "critical", "onClick":this.props.click_fail, "value": Number(this.getTestFailures(suite))},
                {"colorIndex": "warning", "onClick":this.props.click_warn, "value": Number(this.getTestWarnings(suite))}
              ]}
            />

        </Box>
      </ListItem>
    );
  }

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

  getSuiteHeading(suite) {
    return (
      <Paragraph size="large">
        {suite.title}
      </Paragraph>
    );
  }

  getTestPasses(suite) {
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.state === "passed" && test.duration < test._slow) {
          count++;
        }
      });
      return count;
    }
  }

  getTestWarnings(suite){
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.duration >= test._slow && test.duration < test._timeout) {
          count++;
        }
      });
      return count;
    }
  }

  getTestFailures(suite) {
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.state === "failed") {
          count++;
        }
      });
      return count;
    }
  }

  isLoaded() {
    return this.props.fail_count + this.props.warning_count + this.props.pass_count === this.props.total_suites - this.getUnreached(this.props);
  }

  splitSuites() {
    let failed_suites = this.props.failed_suites.concat(this.props.warning_suites);
    let result = failed_suites.map((suite, index) => {
      return this.getSuite(suite, index);
    });
    if (this.isLoaded()) {
      result = chunk(result, 4).map((item, index) => {
        return (
        <Box key={item + index}>
          <Box pad="large" margin="medium">
            <List key={item + index}>{item}</List>
          </Box>
        </Box>
        );
      });
    }
    return result;
  }

  getContent() {

    let suites = this.splitSuites();

    if (suites.length > 0 ) {
      return (
        <Animate enter={{"animation": "fade", "duration": 1500, "delay": 400}}>
          {/*<Label size="large" align="center" pad={{vertical:"medium"}}>Problem Suites</Label>*/}
          <Carousel
            autoplay={true}
            infinite={true}
            persistentNav={true}
            autoplaySpeed={4000}
          >
            {suites}
          </Carousel>
        </Animate>
      );
    }
    else if(this.props.pass_count === (this.props.total_suites - this.state.unreached) && this.props.tests.length !== 0){
      return <Label size="large"><Status value="ok" size="medium" />     All Suites Passed</Label>;
    }
    else if(this.props.tests.length === 0){
      return null;
    }
    else {
      return (
        <Box align="center">
          <Spinning size="medium"/>
          <Label margin="small">Running tests...</Label>
        </Box>
      );
    }
  }

  render() {
    return (
      <Box direction="row" responsive={true}>
        <Box justify="start" align="center" size="large" margin={{vertical:"medium"}}>
          <SuiteMeter
            meter_size="large"
            text_size="medium"
            suite={this.props.suite}
            tests = {this.props.tests}
            suite_list={this.props.suite_list}
            pass_count={this.props.pass_count}
            fail_count={this.props.fail_count}
            warning_count={this.props.warning_count}
            total_suites={this.props.total_suites}
            click_pass={this.props.click_pass}
            click_fail={this.props.click_fail}
            click_warn={this.props.click_warn}
            unreached={this.state.unreached}
          />
        </Box>
        <Box alignSelf="center" align="center" pad={{horizontal:"medium"}} basis="2/3" size="small">
          {this.getContent()}
        </Box>
      </Box>
    );
  }
}

DashBody.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  unreached: PropTypes.array,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  pass_count: PropTypes.number,
  fail_count: PropTypes.number,
  warning_count: PropTypes.number,
  total_suites: PropTypes.number,
  warning_suites: PropTypes.array,
  click: PropTypes.func,
  click_pass: PropTypes.func,
  click_fail: PropTypes.func,
  click_warn: PropTypes.func
};

export default DashBody;
