import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import CheckBox from 'grommet/components/CheckBox';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';

import StatusHeader from './StatusHeader';
import Body from './Body';
import Alert from './Alert';

const Display = (props) => {

  return (
    <Article>
      <Header colorIndex="brand" pad="large" justify="between" direction="row">
        <Heading>NCS API Dashboard</Heading>
          <CheckBox
            toggle={true}
          />

      </Header>
        <Body
          suite = {props.suite}
          suite_list = {props.suite_list}
          passes = {props.passes}
          failures = {props.failures}
          pending = {props.pending}
          total = {props.total}
          failed_suites = {props.failed_suites}
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
  failed_suites: PropTypes.array
};

export default Display;
