import React, {Image} from 'react-native';
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
import {shallow} from 'enzyme';

import ImgixImage from '../imgix_image';

describe('ImgixImage', () => {

  it('should display the shadow image before layout', () => {
    const props = {
      src: 'http://example.com/foo.jpg',
    };
    const wrapper = shallow(<ImgixImage {...props}/>);

    expect(wrapper.type()).to.equal(Image);
    expect(wrapper.props()).to.have.property('source', ImgixImage.ShadowSource);
  });

  it('should display the real image after layout', () => {
    const props = {
      src: 'http://example.com/foo.jpg',
    };
    const wrapper = shallow(<ImgixImage {...props}/>);
    wrapper.simulate('layout', {nativeEvent: {layout: {width: 110, height: 250}}});

    expect(wrapper.type()).to.equal(Image);
    expect(wrapper.props().source).to.have.property('uri', 'http://example.com/foo.jpg?fit=crop&w=100&h=300&dpr=2');
  });

});
