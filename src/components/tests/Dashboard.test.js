import React from 'react';
import { PropTypes } from 'prop-types';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Dashboard from '../Dashboard';
import Body from '../DashBody';
import Alert from '../Alert';

describe('<Dashboard />', () => {

  it('renders Body component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Body)).to.have.length(1);
  });

  it('renders Alert component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Alert)).to.have.length(1);
  });
});
