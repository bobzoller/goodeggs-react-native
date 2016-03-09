'use strict';

import React, {AppRegistry, View, Text} from 'react-native';
import Baobab from 'baobab';
import {root, branch} from 'baobab-react/mixins';

import App from './containers/app';

var VERSION='0.0.1';

export default function native(platform) {

  const tree = new Baobab({
    app: {
      version: VERSION,
      platform: platform
    },
    browse: {
      categories: {},
      subcategories: {},
      sections: {},
      items: {},
    },
    products: {},
  });

  let AppWrapper = React.createClass({
    mixins: [root],
    render() {
      return <App />;
    }
  });

  let AppWrapperWrapper = React.createClass({
    render() {
      return <AppWrapper tree={tree} />;
    }
  });

  AppRegistry.registerComponent('goodeggs', () => AppWrapperWrapper);
}
