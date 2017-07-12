import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import App from 'grommet/components/App';
import Display from './components/Display';

import { add } from './reporter';

import 'grommet/grommet-hpe.min.css';

class Main extends Component {

  constructor(props){
    super(props);

    this.set = this.set.bind(this);
  }

  componentDidMount() {
    add(this.set);
  }

  set() {
    this.setState({});
  }

  render(){

    return (
      <App>
        <Display
          suite = {this.props.suite}
          tests = {this.props.tests}
          passes = {this.props.passes}
          failures = {this.props.failures}
          pending = {this.props.pending}
          total = {this.props.total}
          time = {this.props.time}
          errors = {this.props.errors}
          suite_list = {this.props.suite_list}
          failed_suites = {this.props.failed_suites}
          last_test = {this.props.last_test}
          slow = {this.props.slow}
        />
      </App>
    );
  }
}

Main.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  time: PropTypes.array,
  errors: PropTypes.array,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  last_test: PropTypes.array,
  slow: PropTypes.array
}

export default Main;
