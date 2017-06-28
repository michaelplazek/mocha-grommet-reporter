import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from 'grommet/components/Label';

class StatusHeader extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(){
  }

  render() {
    return(
        <Label size="medium" margin="medium">{this.props.suites.length}&nbsp;Suites&nbsp; | &nbsp;{this.props.total}&nbsp;Tests</Label>
    );
  }
}

StatusHeader.propTypes = {
  suites: PropTypes.array,
  total: PropTypes.number,
};

export default StatusHeader;
