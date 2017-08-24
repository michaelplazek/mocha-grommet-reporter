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

import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Status from 'grommet/components/icons/Status';
import Label from 'grommet/components/Label';
import ClockIcon from 'grommet/components/icons/base/Clock';

class WarningSuites extends Component{
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
          suite.tests.some(test => this.getTestStatus(test) === 'warning') ||
          suite.suites.some(suite => suite.tests.some(test => this.getTestStatus(test) === 'warning')));
      });
      result = (
        <Box>
          <Accordion
            active = {this.isExpanded(suites)}
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
      tests = tests.filter(test => {return this.getTestStatus(test) === 'warning';});
      result = (
        <Box>
          <Accordion
            active = {this.isExpanded(tests)}
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
      return (
          <Box>
            <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;{test.duration / 1000}&nbsp;s</Label>
            <Label size="large" margin="small">Expected test to be less than {test._slow/1000} s</Label>
          </Box>
        );
    }
    else{
      return <Label size="large" margin="small"><ClockIcon type="logo"/>&nbsp;&nbsp;under 1 s</Label>;
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

  render(){
    return this.getSuite(this.props.suite);
  }
}

WarningSuites.propTypes = {
  suite: PropTypes.object.isRequired
};

export default WarningSuites;
