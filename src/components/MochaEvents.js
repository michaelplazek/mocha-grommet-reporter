/**
 * Created by plazek on 6/14/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

class MochaEvents extends Component {

  constructor(props){
    super(props);

    this.onFail = this.onFail.bind(this);
    this.onPass = this.onPass.bind(this);
    this.getTestStatus = this.getTestStatus.bind(this);

    this.state = {status:""};
  }

  componentDidMount(){

    this.props.runner.on('test end', this.getTestStatus);
    this.props.runner.on('suite end', this.getSuiteStatus);
    this.props.runner.on('fail', this.onFail);
    this.props.runner.on('pass', this.onPass);
    this.props.runner.on('pending', this.onPending);
  }

  getSuite(suite){
    if(suite){
      return(
        <div>
          {this.getSuites(suite.suites)}
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
                  <Status value={this.getTestStatus(test)} />
                  <Box pad="large">{test.body}</Box>
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

  getTestStatus(test){
    // if(test in window && test.state in window) {
    //   switch(test.state)
    //   {
    //     case "passed":
    //       console.log("passed");
    //       return "ok";
    //
    //     case "failed":
    //       console.log("failed");
    //       return "critical";
    //
    //     default:
    //       return "warning";
    //   }
    // }
    //
    // else {
      switch(this.state.status)
      {
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

  onFail(event){
    console.log('TEST HAS FAILED!!');
    this.setState({status: event.state});
  }

  onPass(event){
    console.log('TEST HAS PASSED!!');
    this.setState({status: event.state});
  }

  onPending(){
    console.log('TEST IS PENDING!!');
  }

  render(){

    return (
      <Section>
        {this.getSuite(this.props.runner.suite)}
        <Status value={this.getTestStatus()} />
      </Section>
    );
  }
}

MochaEvents.propTypes = {
  runner: PropTypes.object
};

export default MochaEvents;
