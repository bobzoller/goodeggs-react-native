import React, {Image, PixelRatio} from 'react-native';

const ImgixImage = React.createClass({
  getInitialState() {
    return {
      width: 0,
      height: 0,
      dpr: 0,
    };
  },

  getDefaultProps() {
    return {
      precision: 100, // round images to nearest 100px to improve caching
    };
  },

  _onLayout(e) {
    let {width, height} = e.nativeEvent.layout;
    let dpr = PixelRatio.get();
    this.setState({
      width: width,
      height: height,
      dpr: dpr,
    });
  },

  render() {

    const {
      width,
      height,
      dpr
    } = this.state;

    const {
      src,
      precision,
      children,
      ...other
    } = this.props;

    let childProps = other;
    childProps.onLayout = this._onLayout;
    childProps.source = ImgixImage.ShadowSource;

    if (width && height) {
      let w = Math.round(width / precision) * precision;
      let h = Math.round(height / precision) * precision;
      childProps.source = {uri: `${src}?fit=crop&w=${w}&h=${h}&dpr=${dpr}`};
    }

    return React.createElement(Image, childProps, children);
  }
});

//TODO(bobzoller): use an embedded default image?
ImgixImage.ShadowSource = {uri: 'https://goodeggs1.imgix.net/product_photos/ZRAxydUPRymywuu9qYvN_OW8sa4RXwXvm1k0GwlTbfpVlrV7RrSrEm0s8yvN308o.jpg?fit=crop&w=100&h=100&dpr=1'}; 

export default ImgixImage;
