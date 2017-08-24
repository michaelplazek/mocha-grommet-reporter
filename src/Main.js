// © Copyright 2017 Hewlett Packard Enterprise Development LP
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
          stacks = {this.props.stacks}
          suite_list = {this.props.suite_list}
          failed_suites = {this.props.failed_suites}
          warning_suites = {this.props.warning_suites}
          last_test = {this.props.last_test}
          slow = {this.props.slow}
          unreached={this.props.unreached}
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
  stacks: PropTypes.array,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  warning_suites: PropTypes.array,
  last_test: PropTypes.array,
  slow: PropTypes.array,
  unreached: PropTypes.array
}

export default Main;
