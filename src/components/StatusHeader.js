/**
 * Created by plazek on 6/12/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from 'grommet/components/Label';

class StatusHeader extends Component {

  constructor(props) {
    super(props);

    this.timer = 0;
  }

  componentDidMount() {
  }

  componentDidUpdate(){
    this.getTime();
  }

  getTime(){
    if(this.props.time.length > 0){
      this.timer += this.props.time.pop()/1000;
    }
  }

  render() {
    return(
        <Label size="medium" margin="medium">{this.props.suites.length}&nbsp;Suites&nbsp; | &nbsp;{this.props.total}&nbsp;Tests&nbsp; | &nbsp;Elapsed Time:&nbsp;{this.timer.toFixed(2)}&nbsp;s</Label>
    );
  }
}

StatusHeader.propTypes = {
  suites: PropTypes.array,
  total: PropTypes.number,
  // time: PropTypes.number
};

export default StatusHeader;
