/**
 * Created by plazek on 6/9/2017.
 */

import { Component } from 'react'
import mocha from './mocha/mocha'

require('./mocha/mocha.css');

mocha.setup({
  ui: 'bdd',
  slow: 1500,
  timeout: 10000,
  reporter: 'html',
});

class MochaRunner extends Component {

  constructor(props) {
    super(props);

    const mocha = new Mocha({});
    const runner = mocha.run();
  }

  componentWillMount() {

  };

  eventHandler(runner) {

  };
}

export default MochaRunner;
