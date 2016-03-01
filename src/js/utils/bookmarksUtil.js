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

    function isCurrentGroup(path, id) {
        return _.last(path).id === id;
    }

    function getBookmarkById(bookmarks, id) {
        return _.find(bookmarks, {id: id});
    }

    function getBookmarkIndexById(bookmarks, id) {
        return _.findIndex(bookmarks, {id: id});
    }

    function getCurrentGroupItems(bookmarks, currentPath) {
        var currentGroupId = currentPath[currentPath.length - 1].id;
        var currentGroup = _.find(bookmarks, {id: currentGroupId});

        return _.map(currentGroup.children, function (id) {
            return getBookmarkById(bookmarks, id);
        });
    }

    return {
        filterItems: filterItems,
        getCurrentGroupItems: getCurrentGroupItems,
        getBookmarkById: getBookmarkById,
        getBookmarkIndexById: getBookmarkIndexById
        isCurrentGroup: isCurrentGroup
    };
});
