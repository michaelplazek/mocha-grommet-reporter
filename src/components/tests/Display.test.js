import React from 'react';
import { PropTypes } from 'prop-types';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Display from '../Display';
import TestMeter from '../TestMeter';
import Dashboard from '../Dashboard';
import Developer from '../Developer';
import CheckBox from 'grommet/components/CheckBox';

import Label from 'grommet/components/Label';
import Headline from 'grommet/components/Headline';

describe('<Display />', () => {

  it('renders the time the last test was performed if passed last_test prop', () => {
    const wrapper = shallow(<Display last_test={[]}/>);
    wrapper.setProps({last_test:['0']});
    expect(wrapper.find(Label)).to.be.length(1);
  });

  it("doesn't render time if last_test prop isn't populated", () => {
    const wrapper = shallow(<Display last_test={[]}/>);
    expect(wrapper.find(Label)).to.be.length(0);
  });

  it('renders the Overhead View correctly', () => {
    const wrapper = shallow(<Display last_test={['0']}/>)
    wrapper.setState({ page:0 });
    expect(wrapper.find(Dashboard)).to.be.length(1);
    expect(wrapper.find(Developer)).to.be.length(0);
    expect(wrapper.find(Headline)).to.be.length(1);
  });

  it('renders the Developer View correctly', () => {
    const wrapper = shallow(<Display last_test={['0']}/>)
    wrapper.setState({ page:1 });
    expect(wrapper.find(Developer)).to.be.length(1);
    expect(wrapper.find(Dashboard)).to.be.length(0);
    expect(wrapper.find(Headline)).to.be.length(1);
  });

  it('renders the meter in the header correctly', () => {
    const wrapper = shallow(<Display last_test={['0']}/>)
    expect(wrapper.find(TestMeter)).to.be.length(1);
  });

  it('renders the slider to switch between views correctly', () => {
    const wrapper = shallow(<Display last_test={['0']}/>)
    expect(wrapper.find(CheckBox)).to.be.length(1);
  });
});
