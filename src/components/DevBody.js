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
import Button from 'grommet/components/Button';

import split from 'lodash.split';

class DevBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: this.props.tab,
      suite_panels: [],
      test_panels: []
    };
    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({tab:this.props.tab});
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
            active={this.state.test_panels}
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
            active={this.state.suite_panels}
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


  getTestDuration(test) {

    if (test && test.duration) {
      if(test.duration > test._slow && test.duration < test._timeout){
        return (
          <Box>
            <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>
            <Label size="large" margin="small">Expected test to be less than {test._slow/1000} s</Label>
          </Box>
        );
      }
      else if(test.duration < test._slow){
        return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>;
      }
    }
    else{
      return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;under 1 s</Label>;
    }
  }

  getError(test) {
    if (test && test.state && test.state === 'failed') {
      return (
        <List>
          <ListItem margin="none">
              <pre style={{"fontSize":"medium","tabSize":"1"}}>
                {this.props.errors[this.props.errors.length - 1]}
              </pre>
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
    return <pre style={{"fontSize":"small","tabSize":"1"}}>{stack}</pre>;
  }

  getBody(test) {
    if (test && test.body) {
      return <pre style={{"fontSize":"small","tabSize":"1"}}><code>{test.body}</code></pre>
    }
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
        title = "Slow";
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

  setSuitePanels(){
    this.setState({suite_panels:[2,4,6]});
  }

  render() {

    return (
      <Box margin="small">
        {/*<Button onClick={this.setSuitePanels} />*/}
        <Tabs responsive={false} justify="start" onActive={(index) => {this.setState({tab:index});}} activeIndex={this.state.tab}>

          <Tab title="All">
            <Box alignContent="center">

              {this.getSuite(this.props.suite)}

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("ok")}>
            <Box alignContent="center">

              <PassedSuites
                suite = {this.props.suite}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("critical")}>
            <Box alignContent="center">

              <FailedSuites
                suite={this.props.suite}
                errors = {this.props.errors}
                stacks = {this.props.stacks}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("warning")}>
            <Box alignContent="center">

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
  stacks: PropTypes.array,
  tab: PropTypes.number
};

export default DevBody;
