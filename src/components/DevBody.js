import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PassedSuites from './PassedSuites';
import FailedSuites from './FailedSuites';
import WarningSuites from './WarningSuites';

import Status from 'grommet/components/icons/Status';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ClockIcon from 'grommet/components/icons/base/Clock';

import split from 'lodash.split';

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
      if (test.status === "failed") {
        return ("Test timed out...");
      }
    }
  }

  getTestDuration(test) {

    if (test && test.duration) {
      return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s&nbsp;</Label>;
    }
  }

  getError(test) {
    if (test && test.state && test.state === 'failed') {
      return (
        <List>
          <ListItem>
            <Label size="medium" margin="none">
              {this.props.errors[this.props.errors.length - 1]}
            </Label>
          </ListItem>
          <ListItem>
            <Label margin="none">
              {this.getStack(this.props.stacks[this.props.stacks.length - 1])}
            </Label>
          </ListItem>
        </List>
      );
    }
  }

  getStack(stack){
    let newstack = split(stack, "at");
    let result = newstack.map((item, index) =>
      <pre key={item + index}>{item}</pre>
    );
    return result;
  }

  getBody(test) {
    if (test && test.body) {
      return test.body;
    }
  }

  getPassedSuites(suite){
    let passed_suites = [];

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

  getWarningSuites(){
    let obj = {suites:[]};
    this.props.suite.suites.forEach(suite => {
      if(this.getStatuses(suite) === 'warning'){
        obj.suites.push(suite);
      }
    });
    return obj;
  }

  getTabTitle(status){
    let title = null;
    switch(status){
      case "ok":
        title = "Passes";
        break;
      case "critical":
        title = "Failures";
        break;
      case "warning":
        title = "Warnings";
        break;
      default:
        title = null;
    }

    return(
      <Label>
        <Status value={status}/>&nbsp;{title}
      </Label>
    );
  }

  render() {

    return (
      <Box margin="small">
        <Tabs justify="start">

          <Tab title="All">
            <Box alignContent="center" pad="small">

              {this.getSuite(this.props.suite)}

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("ok")}>
            <Box alignContent="center" pad="small">

              <PassedSuites
                suite = {this.props.suite}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("critical")}>
            <Box alignContent="center" pad="small">

              <FailedSuites
                suite={this.props.suite}
                errors = {this.props.errors}
                stacks = {this.props.stacks}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("warning")}>
            <Box alignContent="center" pad="small">

              <WarningSuites
                suite={this.props.suite}
              />

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
  total: PropTypes.number,
  errors: PropTypes.array,
  stacks: PropTypes.array
};

export default DevBody;
