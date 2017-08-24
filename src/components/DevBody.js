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
import Header from 'grommet/components/Header'

import findIndex from 'lodash.findindex';

class DevBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: this.props.tab,
      expanded: this.props.expanded
    };
    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      // tab: nextProps.tab,
      expanded: nextProps.expanded
    });
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
            active={this.isExpanded(tests)}
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
            active={this.isExpanded(suites)}
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

  isExpanded(suites){
    let arr = null;
    if(this.props.expanded === false){
      arr = this.collapse();
    }
    else if(this.props.expanded === true){
      arr = this.expand(suites);
    }

    return arr;
  }

  expand(suites){
    let arr = [];
    for(let i = 0; i < suites.length; i++){
      arr[i] = i;
    }
    return arr;
  }

  collapse(){
    return null;
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
            <Label size="medium" margin="small">Expected test to be less than {test._slow/1000} s</Label>
          </Box>
        );
      }
      else if(test.duration > test._timeout){
        return <Label size="medium" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>;


      }
      else if(test.duration < test._slow){
        return <Label size="medium" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>;
      }
    }
    else{
      return <Label size="medium" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;under 1 s</Label>;
    }
  }

  getError(test) {
    if (test && test.state && test.state === 'failed') {
      let index = findIndex(this.props.failures, function(o){return o.title === test.title;});
      return (
        <List>
          <ListItem margin="none" wrap={true}>
              <pre style={{"fontSize":"medium","tabSize":"1", "white-space":"pre-wrap"}}>
                {this.props.errors[index]}
              </pre>
          </ListItem>
          <ListItem>
            <Label margin="none">
              {this.getStack(this.props.stacks[index])}
            </Label>
          </ListItem>
        </List>
      );
    }
  }

  getStack(stack){
    return <pre style={{"fontSize":"small","tabSize":"1", "white-space":"pre-wrap"}}>{stack}</pre>;
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
                expanded = {this.state.expanded}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("critical")}>
            <Box alignContent="center">

              <FailedSuites
                suite={this.props.suite}
                errors = {this.props.errors}
                stacks = {this.props.stacks}
                expanded = {this.state.expanded}
                failures = {this.props.failures}
              />

            </Box>
          </Tab>

          <Tab title={this.getTabTitle("warning")}>
            <Box alignContent="center">

              <WarningSuites
                suite={this.props.suite}
                expanded = {this.state.expanded}
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
