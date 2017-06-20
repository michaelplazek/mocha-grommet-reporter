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

    this.state = {time: 0}
  }

  componentDidMount() {
    this.getTotalTime();
    console.log('MochaStatus is running...');
  }

  componentDidUpdate(){

  }

  getTotalTime(){
    if(this.props.time){
      this.setState({time: this.props.time});
    }

  }

  render() {

    return(
        <Label size="medium" margin="medium">{this.props.suites.length}&nbsp;Suites&nbsp; | &nbsp;{this.props.total}&nbsp;Tests&nbsp; | &nbsp;Elapsed Time:&nbsp;{this.state.time}</Label>
    );

  }
}

StatusHeader.propTypes = {
  runner: PropTypes.object
};

export default StatusHeader;
