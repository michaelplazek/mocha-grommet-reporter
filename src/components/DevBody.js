import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Status from 'grommet/components/icons/Status';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Section from 'grommet/components/Section';

import flatten from 'lodash.flatten';

// var config = require('config');
// const TIMEOUT = config.get('timeout');

const TIMEOUT = 10000;

class DevBody extends Component {

  constructor(props) {
    super(props);

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentDidMount() {
  }

  getSuite(suite) {
    if (suite) {
      return (
        <Section pad="medium">
          {this.getSuites(suite.suites)}
          {this.getTests(suite.tests)}
        </Section>
      );
    }
  }

  getTests(tests) {
    let result = null;
    if (tests && tests.length > 0) {
      result = (
        <Box>
          <Accordion
            openMulti={true}
          >
            {
              tests.map(test => (
                <AccordionPanel
                  key={test.title}
                  heading={this.getTestHeading(test)}
                >
                  <Box pad="medium">

                    {this.getTestDuration(test)}
                    {this.getError(test)}

                  </Box>
                </AccordionPanel>
              ))
            }
          </Accordion>
        </Box>
      );
      return result;
    }
  }

  getSuites(suites) {
    let result = null;
    if (suites && suites.length > 0) {
      result = (
        <Box>
          <Accordion
            openMulti={true}
          >
            {
              suites.map(suite => (
                <AccordionPanel
                  key={suite.title}
                  heading={this.getSuiteHeading(suite)}
                >
                  {this.getSuite(suite)}
                </AccordionPanel>
              ))
            }
          </Accordion>
        </Box>
      );
    }
    return result;
  }

  getStatuses(suite){
    let result = this.getSuiteStatus(suite);
    if(result === "critical"){return "critical";}

    if(suite.suites.length > 0){
      suite.suites.forEach(item => {
        result = this.getStatuses(item);
      });
    }
    return result;
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
          switch(true){
            case test.duration > TIMEOUT:
              return "warning";
            case test.duration <= TIMEOUT:
              return "critical";
          }
          break;

        default:
          return "warning";
      }
    }
  }

  getTestHeading(test) {
    return (
      <Paragraph size="large">
        <Status value={this.getTestStatus(test)}/>&nbsp;&nbsp;
        {test.title}
      </Paragraph>
    );
  }

  getSuiteHeading(suite) {
    return (
      <Paragraph size="large">
        <Status value={this.getStatuses(suite)}/>&nbsp;&nbsp;
        {suite.title}
      </Paragraph>
    );
  }

  checkTimeOut(test) {
    if (test && test.timedOut) {
      if (test.status == "failed") {
        return ("Test timed out...");
      }
    }
  }

  getTestDuration(test) {

    if (test && test.duration) {
      return <Label size="medium" margin="none">{test.duration / 1000}&nbsp;s&nbsp;{this.checkTimeOut(test)}</Label>;
    }
    else {
      return <Label size="medium" margin="none">~0 s{this.checkTimeOut(test)}</Label>;
    }
  }

  getError(test) {
    if (test && test.state && test.state == 'failed') {
      return (
        <Label size="medium" margin="none">
          {this.props.errors[this.props.errors.length - 1]}
        </Label>
      );
    }
  }

  getBody(test) {
    if (test && test.body) {
      return test.body;
    }
  }

  getPassedSuites(){
    let obj = {suites:[]};
    this.props.suite.suites.forEach(suite => {
      if(this.getStatuses(suite) === 'ok'){
        obj.suites.push(suite);
      }
    });
    return obj;
  }

  getFailedSuites(){
    let obj = {suites:[]};
    this.props.suite.suites.forEach(suite => {
      if(this.getStatuses(suite) === 'critical'){
        obj.suites.push(suite);
      }
    });
    return obj;
  }

  render() {

    return (
      <Box margin="small">
        <Tabs justify="start">

          <Tab title="All">
            <Box align="center">
            </Box>
            <Box alignContent="center" pad="small">

              {this.getSuite(this.props.suite)}

            </Box>
          </Tab>

          <Tab title="Passes">
            <Box align="center">
            </Box>
            <Box alignContent="center" pad="small">

              {this.getSuite(this.getPassedSuites(this.props.suite))}

            </Box>
          </Tab>

          <Tab title="Failures">
            <Box align="center">
            </Box>
            <Box alignContent="center" pad="small">

              {this.getSuite(this.getFailedSuites(this.props.suite))}

            </Box>
          </Tab>

        </Tabs>
      </Box>
    );
  }
}

DevBody.propTypes = {
  suite: PropTypes.object,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number
};

export default DevBody;
