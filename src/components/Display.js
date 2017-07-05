import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Headline';
import CheckBox from 'grommet/components/CheckBox';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';

import Dashboard from './Dashboard';
import Developer from './Developer';
import TestMeter from "./TestMeter";

class Display extends Component {

  constructor(props) {
    super(props);

    this.setPage = this.setPage.bind(this);

    this.state = {page: 0};
  }

  getLastTestTag() {
    let result = null;
    if (this.props.last_test.length > 0) {
      result = <Label>Last test performed on&nbsp;{this.props.last_test[0]}</Label>;
    }
    return result;
  }

  setPage() {
    if (this.state.page === 0) {
      this.setState({page: 1});
    }
    else {
      this.setState({page: 0});
    }
  }

  getPage(){
    if (this.state.page === 0) {
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
          suite={this.props.suite}
          passes={this.props.passes}
          failures={this.props.failures}
          pending={this.props.pending}
          total={this.props.total}
          errors={this.props.errors}
        />
      );
    }
  }

  render() {

    return (
      <Article full={true}>
        <Header colorIndex="grey-2" pad="large" justify="between" direction="row">
          <Box>
            <Heading>NCS API Dashboard</Heading>
            {this.getLastTestTag()}
          </Box>

          <TestMeter
            passes = {this.props.passes}
            failures = {this.props.failures}
            total = {this.props.total}
          />

          <CheckBox
            toggle={true}
            onChange={this.setPage}
          />

        </Header>

        {this.getPage()}

      </Article>
    );
  }
}

Display.propTypes = {
  suite: PropTypes.object,
  tests: PropTypes.array,
  passes: PropTypes.array,
  failures: PropTypes.array,
  pending: PropTypes.array,
  total: PropTypes.number,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array,
  last_test: PropTypes.array,
  errors: PropTypes.array
};

export default Display;
