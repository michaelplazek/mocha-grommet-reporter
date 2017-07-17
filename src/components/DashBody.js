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

class DashBody extends Component {

  constructor(props) {
    super(props);

    this.getTestStatus = this.getTestStatus.bind(this);
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
    return this.props.fail_count + this.props.warning_count + this.props.pass_count === this.props.total_suites;
  }

  splitSuites() {
    let failed_suites = this.props.failed_suites.concat(this.props.warning_suites);

    let result = failed_suites.map((suite, index) => {
      return this.getSuite(suite, index);
    });
    if (this.isLoaded()) {
      result = chunk(result, 5).map((item, index) => {
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
    else if(this.props.pass_count === this.props.total_suites){
      return <Label size="large">All Suites Passed</Label>;
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
        <Box justify="center" align="center" size="large">
          <SuiteMeter
            size="large"
            suite={this.props.suite}
            suite_list={this.props.suite_list}
            pass_count={this.props.pass_count}
            fail_count={this.props.fail_count}
            warning_count={this.props.warning_count}
            total_suites={this.props.total_suites}
            click_pass={this.props.click_pass}
            click_fail={this.props.click_fail}
            click_warn={this.props.click_warn}
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
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
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
