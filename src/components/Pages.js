import React, {Component, PropTypes} from 'react';

import Dashboard from './Dashboard';
import Developer from './Developer';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {page: props.page};
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({page: nextProps.page});
  }

  render() {

    if (this.props.page === 0) {
      return (
        <Dashboard
          suite={this.props.suite}
          tests={this.props.tests}
          suite_list={this.props.suite_list}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          failed_suites={this.props.failed_suites}
        />
      );
    }

    else {
      return (
        <Developer
          suite_list={this.props.suite_list}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
        />
      );
    }
  }
}

Pages.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  page: PropTypes.number,
  failed_suites: PropTypes.array
}

export default Pages;
