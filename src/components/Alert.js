import React, {Component, PropTypes} from 'react';

import Notification from 'grommet/components/Notification';
import Box from 'grommet/components/Box';

class Alert extends Component{
  constructor(props) {
    super(props);

    this.state = {timeout:{}}
  }

  componentWillMount(){
    this.checkTimeOut();
  }

  checkTimeOut() {
    if(this.props.failures){
      this.props.failures.forEach(test => {
        if(test.duration > 10000){
          this.setState({timeout:test})
          return true;
        }
      })
    }
  }

  render(){
    if(this.checkTimeOut()){
      return(
        <Notification
          message={this.state.timeout.title + "has timed out."}
          status="warning"
        />
      )
    }
    else{
      return <Box></Box>
    }
  }
}

Alert.propTypes = {
  suite: PropTypes.object,
  failures: PropTypes.array,
  failed_suites: PropTypes.array
};

export default Alert;
