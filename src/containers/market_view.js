import React, {Image, LayoutAnimation, ListView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';
import {branch} from 'baobab-react/mixins';

import browse from '../repos/browse';
import ImgixImage from '../components/imgix_image';

const ROW_HEIGHT = 175;

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT
  },
  image: {
    height: ROW_HEIGHT
  },
  rowText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 50,
    marginLeft: 20
  }
});

const Market = React.createClass({

  mixins: [branch],

  actions: {
    getBrowseCategories: browse.getBrowseCategories,
  },

  cursors: {
    browseCategories: ['browse', 'categories'],
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (c1, c2) => c1.id !== c2.id}),
    };
  },

  componentDidMount() {
    this.actions.getBrowseCategories();
  },

  _renderRow(category) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={this._onPress.bind(this, category.id)}>
          <ImgixImage style={styles.image} src={category.imageUrl}>
            <View>
              <Text style={styles.rowText}>{category.browseCellName}</Text>
            </View>
          </ImgixImage>
        </TouchableOpacity>
      </View>
    );
  },

  _onPress(categoryId) {
    this.props.navigator.push({id: 'category', props: {categoryId: categoryId}});
  },

  render() {
    let categories = _.values(this.cursors.browseCategories.get());
    let sortedCategories = _.sortBy(categories, 'sortOrder');
    this.state.dataSource = this.state.dataSource.cloneWithRows(sortedCategories);

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
});

export default Market;
