/** * Created by plazek on 6/9/2017. */

import React, { Component } from 'react';
import listeners from './Main';

import App from 'grommet/components/App';
import Display from './components/Display';

import 'grommet/grommet-hpe.min.css';

class Main extends Component {

  constructor(props) {
    super(props);

    this.set = this.set.bind(this);
    this.props.listeners.push(this.set);
  }

  set() {
    this.setState({});
  }

  render() {
    return (
      <App>
        <Display
          suites={this.props.suites}
          tests={this.props.tests}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          time={this.props.time}
        />
      </App>
    );
  }
}

export default Main;
