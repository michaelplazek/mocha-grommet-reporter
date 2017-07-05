import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Chart, {Axis, Grid, Line, Marker, Base, Layers} from 'grommet/components/chart/Chart';

class PlotGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: [],
      count: [],
      start: {},
      end: {}
    }
  }

  render() {
    return (
  <Chart vertical={true}>
    <Base height='medium'
      width='medium' />
    <Layers>
      <Line values={[100, 95, 80, 82, 75, 70, 60, 55, 0, 15, 40, 50]}
        colorIndex='accent-1'
        activeIndex={11} />
    </Layers>
  </Chart>
    )
  }
}

// PlotGraph.propTypes = {
//   time: PropTypes.array,
//   suite_list: PropTypes.array,
//   failed_suites: PropTypes.array
// }

export default PlotGraph;
