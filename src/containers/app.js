import React, {BackAndroid, Navigator, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {branch} from 'baobab-react/mixins';

import MarketView from './market_view';
import CategoryView from './category_view';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  }
});

let App = React.createClass({
  mixins: [branch],

  cursors: {
    app: ['app']
  },

  _renderScene(route, nav) {
    let props = route && route.props || {};
    switch (route && route.id) {
      case 'category':
        return <CategoryView navigator={nav} {...props} />;
      case 'market':
      default:
        return <MarketView navigator={nav} {...props} />;
    }
  },

  _onHardwareBackPress() {
    if (this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop();
      return true;
    }
    return false;
  },

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._onHardwareBackPress);
  },

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._onHardwareBackPress);
  },

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref={(ref) => this._navigator = ref}
          renderScene={this._renderScene}
          configureScene={(route) => {
            return Navigator.SceneConfigs.HorizontalSwipeJump;
          }}
        />
      </View>
    );
  }
});

export default App;
