import React from 'react';
import { PropTypes } from 'prop-types';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Main from './Main';
import Display from './components/Display';

describe('<Main />', () => {

  it('renders Display component', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Display)).to.have.length(1);
  });
});
