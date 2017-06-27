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
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';


class Body extends Component {

  constructor(props){
    super(props);

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  componentDidMount() {
  }

  getSuite(suites){
    if(suites){
      return(
        <div>
          {this.getSuites(suites)}
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

                    {this.getTestDuration(test)}
                    {/*<Label></Label>*/}
                    {/*<Label size="small">{this.getBody(test)}</Label>*/}
                    {/*{test.body}*/}

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

  getSuites(suites){
    let result = null;
    if(suites && suites.length > 0) {
      result = (
        <Box pad="small">
          <List
            selectable={false}
          >
            {
              suites.map(suite => (
                <ListItem
                  key={suite.title}
                >
                  <Box alignSelf="center">
                    <div>
                      {this.getSuiteHeading(suite)}
                    </div>
                    <Box flex="grow" alignContent="stretch">
                      <AnnotatedMeter
                        max={suite.tests.length}
                        className="suite-meter"
                        type="bar"
                        units="tests"
                        size="medium"
                        series={[{"label":"Passed", "colorIndex":"ok", "value":Number(this.getTestPasses(suite))},
                          {"label":"Failed", "colorIndex":"critical", "value":Number(this.getTestFailures(suite))}]}
                      />
                    </Box>
                    {this.getSuite(suite)}
                  </Box>
                </ListItem>
              ))
            }
          </List>
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
      <Paragraph size="large">
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
      return  <Label size="small">{test.duration/1000}&nbsp;s&nbsp;{this.checkTimeOut(test)}</Label>
    }
    // else {
    //   return "...";
    // }
  }

  getBody(test){
    if(test && test.body){
      return test.body;
    }
  }

  getTestPasses(suite){
    let count = 0;
    if(suite) {
      suite.tests.forEach(test => {
        if(test.state === "passed"){
          count++;
        }
      })
      return count;
    }
  }

  getSuitePasses(){
    let pass = 0;
    if(this.props.suite) {
      this.props.suite.suites.forEach(suite => {
        if(suite.tests.every(test => this.getTestStatus(test) === 'ok')) {
          pass++;
        }
      })
    }
    else {
      pass = 0;
    }
    return pass;
  }

  getTestFailures(suite){
    let count = 0;
    if(suite) {
      suite.tests.forEach(test => {
        if(test.state === "failed"){
          count++;
        }
      })
      return count;
    }
  }

  getSuiteFailures(){
    let fail = 0;
    if(this.props.suite) {
      this.props.suite.suites.forEach(suite => {
        if(suite.tests.some(test => this.getTestStatus(test) === 'critical')) {
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
    if(this.props.suite){
      return this.props.suite.suites.length;
    }
  }

  render(){

    return (
    <Split flex="right" priority="left">
      <Sidebar size="large">
        <Section full="horizontal">
          <Label></Label>
          <Label></Label>
          <AnnotatedMeter
            legend={false}
            type="circle"
            size="large"
            units="suites"
            max= {this.getSuiteLength()}
            series={[{"label":"Passed", "colorIndex":"ok", "value":Number(this.getSuitePasses())},
              {"label":"Failed", "colorIndex":"critical", "value":Number(this.getSuiteFailures())}]}
          />
        </Section>
      </Sidebar>
      <Box alignContent="center" pad="medium">

        {this.getSuite(this.props.top4)}

      </Box>
    </Split>
    );
  }
}

Body.propTypes = {
  suite: PropTypes.object,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array
};

export default Body;
