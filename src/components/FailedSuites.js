import React, {Component} from 'react';
import PropTypes from 'prop-types';

import split from 'lodash.split';

import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Status from 'grommet/components/icons/Status';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ClockIcon from 'grommet/components/icons/base/Clock';

class FailedSuites extends Component{
  constructor(props){
    super(props);

    this.getSuite = this.getSuite.bind(this);
    this.getSuites = this.getSuites.bind(this);
    this.getTests = this.getTests.bind(this);
    this.getSuiteHeading = this.getSuiteHeading.bind(this);
    this.getTestDuration = this.getTestDuration.bind(this);
    this.getTestStatus = this.getTestStatus.bind(this);
    this.getTestHeading = this.getTestHeading.bind(this);
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

  getSuites(suites) {
    let result = null;
    if (suites && suites.length > 0) {
      suites = suites.filter(suite => {
        return (
        suite.tests.some(test => this.getTestStatus(test) === 'critical')) ||
        suite.suites.some(suite => this.getSuiteStatus(suite) === 'critical');
      });
      result = (
        <Box>
          <Accordion
            openMulti={true}
          >
            {
              suites.map((suite, index) => (
                <AccordionPanel
                  heading={this.getSuiteHeading(suite)}
                  key={suite.title + index}
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

  getSuiteHeading(suite) {
    return (
      <Paragraph size="large">{suite.title}</Paragraph>
    );
  }

  getTests(tests) {
    let result = null;
    if (tests && tests.length > 0) {
      tests = tests.filter(test => {return this.getTestStatus(test) === 'critical';});
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

  getTestHeading(test) {
    return (
      <Paragraph size="large">
        <Status value={this.getTestStatus(test)}/>&nbsp;&nbsp;
        {test.title}
      </Paragraph>
    );
  }

  getTestDuration(test) {

    if (test && test.duration) {
      return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>;
    }
    else{
      return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;under 1 s</Label>;
    }
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
      } else if (suite.tests.some(test => this.getTestStatus(test) === 'warning') && !suite.tests.some(test => this.getTestStatus(test) === 'critical')){
        result = "warning";
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

  getError(test) {
    if (test && test.state && test.state === 'failed') {
      return (
        <Box margin={{vertical:"small"}}>
          <pre style={{"fontSize":"medium","tabSize":"1", "white-space":"pre-wrap"}}>
            {this.props.errors[this.props.errors.length - 1]}
          </pre>
          <Label margin="none">
            {this.getStack(this.props.stacks[this.props.stacks.length - 1])}
          </Label>
        </Box>
      );
    }
  }

  getStack(stack){
    return <pre style={{"fontSize":"small","tabSize":"1", "white-space":"pre-wrap"}}>{stack}</pre>;
  }

  getBody(test) {
    if (test && test.body) {
      return <pre style={{"fontSize":"small","tabSize":"1", "white-space":"pre-wrap"}}><code>{test.body}</code></pre>
    }
  }

  render(){
    return this.getSuite(this.props.suite);
  }
}

FailedSuites.propTypes = {
  suite: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  stacks: PropTypes.array.isRequired
};

export default FailedSuites;
