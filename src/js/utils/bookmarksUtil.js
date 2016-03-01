define(['lodash'], function (_) {
    'use strict';

    function filterItems(items, searchTerm, itemProperties) {

        var results = {};
        _.forEach(itemProperties, function (property) {
            var result =
                _.chain(items)
                    .map(property)
                    .flatten()
                    .filter(function (item) {
                        return _.startsWith(item.toLowerCase(), searchTerm.toLowerCase());
                    })
                    .union()
                    .value();
            results[property] = result;
        });

        return results;
    }


    return {
        filterItems: filterItems
    };
});
