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

const Display = (props) => {

  return (
    <Article>
      <Header colorIndex="brand" pad="large" justify="between" direction="row">
        <Box>
          <Heading>NCS API Dashboard</Heading>
          <Label>Last test performed on&nbsp;{props.last_test[0]}</Label>
        </Box>
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
      {/*<Notification*/}
        {/*size="small"*/}
        {/*status="warning"*/}
        {/*message="test warning notification"*/}

        {/*justify="start"*/}
        {/*align="center"*/}
      {/*/>*/}
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
