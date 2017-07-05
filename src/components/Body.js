import React, {Component} from 'react';
import PropTypes from 'prop-types';

import chunk from 'lodash.chunk';

import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Meter from 'grommet/components/Meter';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Carousel from 'grommet/components/Carousel';
import Spinning from 'grommet/components/icons/Spinning';
import Label from 'grommet/components/Label';
import Status from 'grommet/components/icons/Status';

import Columns from 'grommet/components/Columns';

const TIMEOUT = 10000;


class Body extends Component {

  constructor(props) {
    super(props);

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentDidMount() {
  }

  //TODO: find way to deal with nested suites
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
                {"colorIndex": "warning", "value": Number(this.getTestTimeouts(suite))}
              ]}
            />

        </Box>
      </ListItem>
    );
  }

  getSuiteStatus(suite) {
    let result = 'unknown';
    if (suite && suite.tests) {
      if (suite.tests.every(test => this.getTestStatus(test) === 'ok')) {
        result = 'ok';
      } else if (suite.tests.some(test => this.getTestStatus(test) === 'critical')) {
        result = 'critical';
      } else if (suite.tests.every(test => this.getTestStatus(test) === 'unknown')) {
        result = 'unknown';
      } else {
        result = 'unknown';
      }
      return result;
    }
  }

  getTestStatus(test) {

    if (test && test.state) {
      switch (test.state) {
        case "passed":
          return "ok";

        case "failed":
          return "critical";

        default:
          return "warning";
      }
    }
  }

  checkTimeout(suite){
    let result = false;
    suite.tests.forEach(test => {
      if(test.duration > TIMEOUT){
        result = true;
      }
    });
    return result;
  }

  getSuiteHeading(suite) {
    if(this.checkTimeout(suite)){
      return (
        <Paragraph size="large">
          {suite.title}&nbsp;&nbsp;
          <Status value="warning" />
        </Paragraph>
      );
    }
    else{
      return (
        <Paragraph size="large">
          {suite.title}
        </Paragraph>
      );
    }
  }

  getTestPasses(suite) {
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.state === "passed") {
          count++;
        }
      });
      return count;
    }
  }

  getSuitePasses() {
    let pass = 0;
    if (this.props.suite) {
      this.props.suite.suites.forEach(suite => {
        if (suite.tests.every(test => this.getTestStatus(test) === 'ok')) {
          pass++;
        }
      });
    }
    else {
      pass = 0;
    }
    return pass;
  }

  getTestTimeouts(suite){
    let count = 0;
    if (suite) {
      suite.tests.forEach(test => {
        if (test.duration > TIMEOUT) {
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
        if (test.state === "failed" && test.duration < TIMEOUT) {
          count++;
        }
      });
      return count;
    }
  }

  getSuiteFailures() {
    let fail = 0;
    if (this.props.suite) {
      this.props.suite.suites.forEach(suite => {
        if (suite.tests.some(test => this.getTestStatus(test) === 'critical')) {
          fail++;
        }
      })
    }
    else {
      fail = 0;
    }
    return fail;
  }

  getSuiteLength() {
    if (this.props.suite) {
      return this.props.suite.suites.length;
    }
  }

  getSuitesMessage() {
    if (this.isLoaded()) {
      return <Paragraph size="small">4 out of {this.getSuiteLength()} suites</Paragraph>
    }
  }

  isLoaded() {
    if (this.getSuiteFailures() + this.getSuitePasses() == this.getSuiteLength()) {
      return true;
    }
    else {
      return false;
    }
  }

  splitSuites() {
    let result = this.props.failed_suites.map((suite, index) => {
      return this.getSuite(suite, index);
    });
    if (this.isLoaded()) {
      result = chunk(result, 5).map((item, index) => {
        return (
        <Box key={item}>
          <Box pad="large" margin="medium">
            <List key={index}>{item}</List>
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
    else if(this.getSuitePasses() == this.getSuiteLength()){
      return <Label size="large">All Suites Passed</Label>
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
        <Box pad={{vertical:"large"}} justify="center" size="large">
          <AnnotatedMeter
            legend={false}
            type="circle"
            size="large"
            units="suites"
            max={this.getSuiteLength()}
            series={[{"label": "Passed", "colorIndex": "ok", "value": Number(this.getSuitePasses())},
              {"label": "Failed", "colorIndex": "critical", "value": Number(this.getSuiteFailures())}
            ]}
          />

        </Box>
        <Box alignSelf="center" align="center" pad="medium" basis="1/3">
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
