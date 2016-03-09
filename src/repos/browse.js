import _ from 'lodash';

function mapper(tree) {
  return (response) => {
    return response.json()
    .then(({data, included}) => {
      let items = Array.isArray(data) ? data : [data];
      if (included) {
        items = items.concat(included);
      }

      let itemsByType = _.groupBy(items, 'type');
      _.each(itemsByType, (items, type) => {
        switch (type) {
          case 'BrowseCategory':
            update = _.keyBy(items, 'id');
            tree.deepMerge(['browse', 'categories'], update);
            break;
          case 'BrowseSubcategory':
            update = _.keyBy(items, 'id');
            tree.deepMerge(['browse', 'subcategories'], update);
            break;
          case 'BrowseSection':
            update = _.keyBy(items, 'id');
            tree.deepMerge(['browse', 'sections'], update);
            break;
          case 'BrowseItem':
            update = _.keyBy(items, 'id');
            tree.deepMerge(['browse', 'items'], update);
            break;
          case 'Product':
            update = _.keyBy(items, 'id');
            tree.deepMerge(['products'], update);
            break;
        }
      });

      tree.commit();
    });
  };
};

const browse = {
  getBrowseCategories(tree) {
    fetch('https://mobile-api.huevosbuenos.com/api/v3/sfbay/browse/categories')
    .then(mapper(tree))
    .catch((error) => {
      console.warn(error);
    });
  },

  getBrowseCategory(tree, categoryId) {
    fetch(`https://mobile-api.huevosbuenos.com/api/v3/sfbay/browse/categories/${encodeURIComponent(categoryId)}`)
    .then(mapper(tree))
    .catch((error) => {
      console.warn(error);
    });
  },
};

export default browse;

