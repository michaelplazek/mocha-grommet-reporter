import React, {Component} from 'react';
import PropTypes from 'prop-types';

import chunk from 'lodash.chunk';

import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Carousel from 'grommet/components/Carousel';
import Spinning from 'grommet/components/icons/Spinning';
import Label from 'grommet/components/Label';

class Body extends Component {

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
              series={[{"colorIndex": "ok", "value": Number(this.getTestPasses(suite))},
                {"colorIndex": "critical", "value": Number(this.getTestFailures(suite))},
                {"colorIndex": "warning", "value": Number(this.getTestWarnings(suite))}
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
          switch(true){
            case test.duration >= test._timeout:
              return "warning";
            case test.duration < test._timeout:
              return "critical";
          }
          break;

        default:
          return "warning";
      }
    }
  }

  checkTimeout(suite){
    let result = false;
    suite.tests.forEach(test => {
      if(test.duration > test._timeout){
        result = true;
      }
    });
    return result;
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

  getTestTimeouts(suite){
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.duration > test._timeout) {
          count++;
        }
      });
      return count;
    }
  }

  getSlowTests(suite){
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

  getTestWarnings(suite){
    return this.getTestTimeouts(suite) + this.getSlowTests(suite);
  }

  getTestFailures(suite) {
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.state === "failed" && test.duration <= test._timeout) {
          count++;
        }
      });
      return count;
    }
  }

  getSuitesMessage() {
    if (this.isLoaded()) {
      return <Paragraph size="small">4 out of {this.getSuiteLength(this.props.suite, 0)} suites</Paragraph>;
    }
  }

  isLoaded() {
    return this.getSuiteFailures(this.props.suite, 0) + this.getSuiteWarnings(this.props.suite, 0) + this.getSuitePasses(this.props.suite, 0) === this.getSuiteLength(this.props.suite, 0);
  }


  splitSuites() {
    let result = this.props.failed_suites.map((suite, index) => {
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
        <Carousel
          autoplay={true}
          infinite={true}
          persistentNav={true}
          autoplaySpeed={4000}
        >
          {suites}
        </Carousel>
      );
    }
    else if(this.getSuitePasses(this.props.suite, 0) === this.getSuiteLength(this.props.suite, 0)){
      return <Label size="large">All Suites Passed</Label>;
    }
    else {
      return (
        <Spinning size="large"/>
      );
    }
  }

  render() {
    return (
      <Box direction="row">
        <Box pad={{vertical:"large"}} justify="center" align="center" size="large">
          <AnnotatedMeter
            legend={false}
            type="circle"
            size="large"
            units="suites"
            max={this.getSuiteLength(this.props.suite, 0)}
            series={[{"label": "Passed", "colorIndex": "ok", "value": Number(this.getSuitePasses(this.props.suite, 0))},
              {"label": "Failed", "colorIndex": "critical", "value": Number(this.getSuiteFailures(this.props.suite, 0))},
              {"label": "Warnings", "colorIndex": "warning", "value": Number(this.getSuiteWarnings(this.props.suite, 0))}
            ]}
          />

        </Box>
        <Box alignSelf="center" align="center" pad="medium" basis="2/3" size="small">
          {this.getContent()}
        </Box>
      </Box>
    );
  }
}

Body.propTypes = {
  suite: PropTypes.object,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array
};

export default Body;
