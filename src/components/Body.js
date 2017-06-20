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
                  heading={test.title}
                >
                  <Box pad="large">

                    <Label size="small"><Status value={this.getTestStatus(test)} />&nbsp;Duration:&nbsp;{this.getTestDuration(test)}</Label>
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
                  heading={suite.title}
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

  // add function to grab status of each test && suite

  getSuiteStatus(event){
  }

  getTestStatus(test) {

    if(test && test.state) {
      switch (test.state) {
        case "passed":
          console.log("passed");
          return "ok";

        case "failed":
          console.log("failed");
          return "critical";

        default:
          return "warning";
      }
    }

    // else {
    //   return
    // }
  }

  getTestDuration(test) {

    if(test && test.duration) {
      return test.duration/1000;
    }
    else {
      return "...";
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
}

export default Body;
