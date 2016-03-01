define(['lodash'], function (_) {
    'use strict';

    function getItemsData(path, bookmarks) {
        var idPath = _.map(path, 'id');
        var items = _(bookmarks)
            .filter(function (item) {
                return _.includes(idPath, item.id);
            })
            .map(function (item) {
                return _.pick(item, ['id', 'title']);
            })
            .value();

        if (path.length > 3) {
            items.splice(1, items.length - 4);
            items[items.length - 3].title = '...';
        }

        return items;
    }

    return {
        getItemsData: getItemsData
    };
});
