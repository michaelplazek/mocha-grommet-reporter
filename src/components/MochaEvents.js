/**
 * Created by plazek on 6/14/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

class MochaEvents extends Component {

  constructor(props){
    super(props);
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
      <Accordion
        openMulti={true}
      >
        {
          tests.map(test => (
            <AccordionPanel
              key={test.title}
              heading={test.title}
            >
              <Label>{test.body}</Label>
            </AccordionPanel>
          ))
        }
      </Accordion>
      );
    }
    return result;
  }

  getSuites(suites){
    let result = null;
    if(suites && suites.length > 0) {
      result = (
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
      );
    }
    return result;
  }

  render(){

    return (
      <Section>
        {this.getSuite(this.props.runner.suite)}
      </Section>
    );

  }
}

MochaEvents.propTypes = {
  runner: PropTypes.object
};

export default MochaEvents;
