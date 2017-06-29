import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Headline';
import CheckBox from 'grommet/components/CheckBox';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

import Body from './Body';
import Alert from './Alert';
import PlotGraph from './PlotGraph';

const Display = (props) => {

  function getLastTestTag(){
    let result = null;
    if(props.last_test.length > 0){
      result = <Label>Last test performed on&nbsp;{props.last_test[0]}</Label>;
    }
    return result;
  }

  return (
    <Article>
      <Header colorIndex="brand" pad="large" justify="between" direction="row">
        <Box>
          <Heading>NCS API Dashboard</Heading>
          {getLastTestTag()}
        </Box>
          <CheckBox
            toggle={true}
          />

      </Header>
        <Body
          suite = {props.suite}
          tests = {props.tests}
          suite_list = {props.suite_list}
          passes = {props.passes}
          failures = {props.failures}
          pending = {props.pending}
          total = {props.total}
          failed_suites = {props.failed_suites}
        />

      <Alert
        suite = {props.suite_list}
        tests = {props.tests}
      />

    </Article>
  );
};

Display.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  last_test: PropTypes.array
};

export default Display;
