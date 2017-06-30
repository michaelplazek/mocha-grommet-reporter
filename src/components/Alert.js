import React, {Component, PropTypes} from 'react';

import Notification from 'grommet/components/Notification';
import ListItem from 'grommet/components/ListItem';
import List from 'grommet/components/List';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Columns from 'grommet/components/Columns';


class Alert extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.getTimeouts();
  }

  getTimeouts() {
    let timeouts = [];
    if (this.props.tests) {
      this.props.tests.forEach(test => {
        if (test.duration > 10000) {
          timeouts.push(test);
        }
      });
    }

    // timeouts = timeouts.map((test, index) => {
    //   return (
    //     <Box
    //       pad="small"
    //       key={test.title + index}
    //     >
    //       <Notification
    //         message={test.title + " timed out after " + (test.duration/1000).toFixed(2) + " seconds"}
    //         status="warning"
    //         size="medium"
    //       />
    //     </Box>
    //   );
    // });

    return timeouts;
  }

  render() {

    let timeouts = this.getTimeouts();

    if(timeouts.length > 0){
      return(
        <Notification
              message={timeouts.length + " test(s) timed out"}
              status="warning"
              size="medium"
            />
      );
    }

    else {
      return null;
    }
    // let timeouts = this.getTimeouts();
    // if (timeouts.length > 0) {
    //   return (
    //     <Columns
    //       justify="center"
    //       maxCount={1}
    //     >
    //       {timeouts}
    //     </Columns>
    //   );
    // }
    // else {
    //   return null
    // }
  }
}

Alert.propTypes = {
  suite: PropTypes.array,
  tests: PropTypes.array
};

export default Alert;
