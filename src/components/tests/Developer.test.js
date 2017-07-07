import React from 'react';
import { PropTypes } from 'prop-types';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Developer from '../Developer';
import DevBody from '../DevBody';


describe('<Developer />', () => {

  it('renders DevBody component', () => {
    const wrapper = shallow(<Developer />);
    expect(wrapper.find(DevBody)).to.have.length(1);
  });
});
