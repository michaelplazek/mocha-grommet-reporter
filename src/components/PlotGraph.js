import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Chart, {Axis, Grid, Line, Marker, Base, Layers} from 'grommet/components/chart/Chart';

class PlotGraph extends Component {
  constructor(props) {
    super(props);

    this.getSuiteListLength = this.getSuiteListLength.bind(this);
    this.getFailedSuiteLength = this.getFailedSuiteLength.bind(this);

    this.state = {
      time: [],
      count: [],
      start: {},
      end: {}
    }
  }

  getFailedSuiteLength() {
    if (this.props.failed_suites) {
      return this.props.failed_suites.length;
    }
    else {
      return 0;
    }
  }

  getSuiteListLength() {
    if (this.props.suite_list) {
      return this.props.suite_list.length;
    }
    else {
      return 0;
    }
  }

  componentDidMount() {
    this.setState({
      time: this.state.time.concat(this.props.time),
      count: this.state.count.concat([this.getFailedSuiteLength()]),
      start: this.props.time,
      end: "end?"
    })
  }

  componentDidUpdate() {
    this.setState(prevState => {
      return ({
        time: prevState.time.concat(this.props.time),
        count: prevState.time.concat(this.props.count)
      });
    });
  }

  //   this.setState({
  //     time:this.state.time.concat([this.props.time]),
  //     count:this.state.count.concat([this.getFailedSuiteLength()]),
  //   })
  // }

  render() {
    return (
      <Chart>
        <Axis count={10}
              labels={[{"index": 5, "label": this.getSuiteListLength() / 2}, {
                "index": 10,
                "label": this.getSuiteListLength()
              }]}
              vertical={true}/>
        <Chart vertical={true}>
          <Base height='medium'
                width='medium'/>
          <Layers>
            <Grid rows={10}
                  columns={5}/>
            <Line values={this.state.count}
                  colorIndex='accent-1'
            />
          </Layers>
          <Axis count={2}
                labels={[{"index": 0, "label": "start"}, {"index": 1, "label": "end"}]}/>
        </Chart>
      </Chart>
    )
  }
}

PlotGraph.propTypes = {
  time: PropTypes.array,
  suite_list: PropTypes.array,
  failed_suites: PropTypes.array
}

export default PlotGraph;
