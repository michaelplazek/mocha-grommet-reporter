/** * Created by plazek on 6/9/2017. */

import React, { Component, PropTypes } from 'react';

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
          suites = {this.props.suites}
          tests = {this.props.tests}
          passes = {this.props.passes}
          failures = {this.props.failures}
          pending = {this.props.pending}
          total = {this.props.total}
          time = {this.props.time}
        />
      </App>
    );
  }
}

Main.propTypes = {
  suites: PropTypes.array,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  // time: PropTypes.number
}

export default Main;
