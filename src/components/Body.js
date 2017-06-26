/**
 * Created by plazek on 6/14/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Sidebar from 'grommet/components/Sidebar';
import Split from 'grommet/components/Split';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';


class Body extends Component {

  constructor(props){
    super(props);

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentDidMount() {
  }

  getSuite(suite){
    if(suite){
      return(
        <div>
          {this.getSuites(suite)}
          {this.getTests(suite.tests)}
        </div>
      );
    }
  }

  getTests(tests){
    let result = null;
    if(tests && tests.length > 0) {
      result = (
        <Box pad="medium">
          <Accordion
            openMulti={true}
          >
            {
              tests.map(test => (
                <AccordionPanel
                  key={test.title}
                  heading={this.getTestHeading(test)}
                >
                  <Box pad="large">

                    <Label size="small">{this.checkTimeOut(test)}&nbsp;Duration:&nbsp;{this.getTestDuration(test)}&nbsp;s</Label>
                    <Label></Label>
                    <Label size="small">{this.getBody(test)}</Label>
                    {/*{test.body}*/}

                  </Box>
                </AccordionPanel>
              ))
            }
          </Accordion>
        </Box>
      );
    }
    return result;
  }

  getSuites(suites){
    let result = null;
    if(suites && suites.length > 0) {
      result = (
        <Box pad="small">
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

  getSuiteStatus(suite) {
    let result = 'unknown';
    if(suite && suite.tests){
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

    if(test && test.state) {
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

  getTestHeading(test){
    return(
      <Paragraph>
        <Status value={this.getTestStatus(test)} />&nbsp;&nbsp;
        {test.title}
      </Paragraph>
    )
  }

  getSuiteHeading(suite){
    return(
      <Paragraph>
        <Status value={this.getSuiteStatus(suite)} />&nbsp;&nbsp;
        {suite.title}
      </Paragraph>
    )
  }

  checkTimeOut(test) {
    if (test && test.timedOut) {
      if (test.status == "failed") {
        return ("Test timed out...")
      }
    }
  }

  getTestDuration(test) {

    if(test && test.duration) {
      return test.duration/1000;
    }
    else {
      return "...";
    }
  }

  getBody(test){
    if(test && test.body){
      return test.body;
    }
  }

  getPasses(){
    if(this.props.passes) {
      return this.props.passes.length
    }
    else {
      return 0;
    }
  }

  getFailures(){
    if(this.props.failures) {
      return this.props.failures.length
    }
    else {
      return 0;
    }
  }

  render(){

    return (
    <Split flex="right" priority="right">
      <Sidebar size="large">
        <Section full="horizontal">
          <AnnotatedMeter
            legend={false}
            type="circle"
            size="large"
            max= {this.props.total}
            units=''
            series={[{"label":"Passed", "colorIndex":"ok", "value":Number(this.getPasses())},
              {"label":"Failed", "colorIndex":"critical", "value":Number(this.getFailures())}]}
          />
        </Section>
      </Sidebar>
      <Box alignContent="center" pad="medium">

        {this.getSuite(this.props.suites)}

      </Box>
    </Split>
    );
  }
}

Body.propTypes = {
  suites: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number
};

export default Body;
