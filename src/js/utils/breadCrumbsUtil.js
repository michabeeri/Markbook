define(['lodash'], function (_) {
    'use strict';

    function getItemsData(path, bookmarks) {
        return _(bookmarks)
            .filter(function (item) {
                return _.includes(path, item.id);
            })
            .map(function (item) {
                return _.pick(item, ['id', 'title']);
            })
            .value();
    }

    return {
        getItemsData: getItemsData
    };
});
