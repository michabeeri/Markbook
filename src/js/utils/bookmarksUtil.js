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
        return _.last(path) === id;
    }

    function getBookmarkById(bookmarks, id) {
        return _.find(bookmarks, {id: id});
    }

    function getBookmarkIndexById(bookmarks, id) {
        return _.findIndex(bookmarks, {id: id});
    }

    function getItemsByGroupId(bookmarks, groupId) {
        var currentGroup = _.find(bookmarks, {id: groupId});
        return _.map(currentGroup.children, function (id) {
            return getBookmarkById(bookmarks, id);
        });
    }

    function isGroup(bookmarks, bookmarkId) {
        var bookmark = getBookmarkById(bookmarks, bookmarkId);
        return (!_.isNull(bookmark.children));
    }

    function getCurrentGroupItems(bookmarks, currentPath) {
        return getItemsByGroupId(bookmarks, currentPath[currentPath.length - 1]);
    }

    function getParent(bookmarks, id) {
        return _.find(bookmarks, function (bm) {
            return bm.children && bm.children.indexOf(id) !== -1;
        });
    }

    return {
        filterItems: filterItems,
        getCurrentGroupItems: getCurrentGroupItems,
        getBookmarkById: getBookmarkById,
        getBookmarkIndexById: getBookmarkIndexById,
        isCurrentGroup: isCurrentGroup,
        getItemsByGroupId: getItemsByGroupId,
        getParent: getParent,
        isGroup: isGroup
    };
});
