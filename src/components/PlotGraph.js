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
