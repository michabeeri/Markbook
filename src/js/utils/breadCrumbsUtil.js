define(['lodash'], function (_) {
    'use strict';

    function getItemsData(path, bookmarks) {
        var idPath = _.map(path, 'id');
        return _(bookmarks)
            .filter(function (item) {
                return _.includes(idPath, item.id);
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
