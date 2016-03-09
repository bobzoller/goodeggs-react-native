import React, {ListView, View, StyleSheet, Text} from 'react-native';
import {branch} from 'baobab-react/mixins';

import browse from '../repos/browse';
import ImgixImage from '../components/imgix_image';

const ROW_HEIGHT = 175;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  row: {
    height: ROW_HEIGHT
  },
  image: {
    height: ROW_HEIGHT,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowTextWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  rowText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  }
});

const CategoryView = React.createClass({

  mixins: [branch],

  actions: {
    getBrowseCategory: browse.getBrowseCategory,
  },

  cursors: (props, context) => {
    return {
      category: ['browse', 'categories', props.categoryId],
      sections: ['browse', 'sections'],
      items: ['browse', 'items'],
      products: ['products'],
    };
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (c1, c2) => c1.id !== c2.id}),
    };
  },

  componentDidMount() {
    this.actions.getBrowseCategory(this.props.categoryId);
  },

  _renderRow(product) {
    return (
      <View style={styles.row}>
        <ImgixImage style={styles.image} src={product.photo}>
          <View style={styles.rowTextWrapper}>
            <Text style={styles.rowText}>{product.name}</Text>
          </View>
        </ImgixImage>
      </View>
    );
  },

  render() {
    let category = this.cursors.category.get();
    if (!category.links.sections) {
      return null;
    }

    let allSections = this.cursors.sections.get();
    let allItems = this.cursors.items.get();
    let allProducts = this.cursors.products.get();

    let sectionIds = _.map(category.links.sections.linkage, 'id');
    let sections = _(allSections)
      .pick(sectionIds)
      .values()
      .sortBy('sortOrder')
      .value();

    let products = sections.map((section) => {
      let itemIds = _.map(section.links.items.linkage, 'id');
      return _(allItems)
        .pick(itemIds)
        .values()
        .sortBy('sortOrder')
        .map((item) => {
          return allProducts[item.links.product.linkage.id];
        })
        .value();
    });

    products = _.flatten(products);

    this.state.dataSource = this.state.dataSource.cloneWithRows(products);

    return (
      <ListView
        styles={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
});

export default CategoryView;

