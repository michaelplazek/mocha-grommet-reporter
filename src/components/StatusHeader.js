/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

class StatusHeader extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    console.log('MochaStatus is running...');
  }

  componentWillUpdate(){

  }

  render() {

    return(
        <Label size="medium" margin="medium">{this.props.suites.length}&nbsp;Suites&nbsp; | &nbsp;{this.props.total}&nbsp;Tests&nbsp; | &nbsp;Elapsed Time:&nbsp;{this.props.time}</Label>
    );

  }
}

StatusHeader.propTypes = {
  runner: PropTypes.object
};

export default StatusHeader;
