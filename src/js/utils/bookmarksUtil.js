define(['lodash', 'constants'], function (_, Constants) {
    'use strict';

    function filterItems(items, searchTerm, itemProperties) {

        var results = {};
        _.forEach(itemProperties, function (property) {
            var result =
                _.chain(items)
                    .map(property)
                    .filter(function (item) {
                        return !_.isUndefined(item);
                    })
                    .flatten()
                    .filter(function (item) {
                        if (typeof item === 'string') {
                            return _.startsWith(item.toLowerCase(), searchTerm.toLowerCase());
                        }
                        return false;
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

    function getGroupByTitle(bookmarks, title) {
        return _.find(bookmarks, function (bm) {
            return ((bm.title === title && bm.children.length > 0) || (bm.id === Constants.ROOT_GROUP_ID && bm.title === title));
        });
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

    function isItemGroup(item) {
        return item.children && item.children.length > 0;
    }

    function isGroup(bookmarks, bookmarkId) {
        var bookmark = getBookmarkById(bookmarks, bookmarkId);
        return isItemGroup(bookmark);
    }

    function getAllGroups(bookmarks) {
        return _.filter(bookmarks, isItemGroup);
    }

    function getCurrentGroupItems(bookmarks, currentPath) {
        return getItemsByGroupId(bookmarks, currentPath[currentPath.length - 1]);
    }

    function getParent(bookmarks, id) {
        return _.find(bookmarks, function (bm) {
            return bm.children && bm.children.indexOf(id) !== -1;
        });
    }

    function getCompareFunctionBySortType(sortType) {
        var sortTypes = Constants.sortTypes;
        var result = {
            property: '',
            direction: 'asc'
        };
        switch (sortType) {
            case sortTypes.DATE_DESC.value:
                return createCompareFunction('date', true);
            case sortTypes.DATE_ASC.value:
                return createCompareFunction('date');
            case sortTypes.TITLE_DESC.value:
                return createCompareFunction('title', true);
            case sortTypes.TITLE_ASC.value:
                return createCompareFunction('title');
            case sortTypes.TYPE.value:
                return function (item1, item2) {
                    var item1IsGroup = isItemGroup(item1);
                    var item2IsGroup = isItemGroup(item2);
                    if (item1IsGroup ^ item2IsGroup) {
                        if (item1IsGroup) {
                            return -1;
                        }
                        return 1;
                    }
                    return 0;
                };
        }
        return result;
    }

    function createCompareFunction(propToSortBy, isDesc) {
        if (isDesc) {
            return function (item1, item2) {
                if (item1[propToSortBy] === item2[propToSortBy]) {
                    return 0;
                }
                return (item1[propToSortBy] < item2[propToSortBy]) ? 1 : -1;
            };
        }
        return function (item1, item2) {
            if (item1[propToSortBy] === item2[propToSortBy]) {
                return 0;
            }
            return (item1[propToSortBy] > item2[propToSortBy]) ? 1 : -1;
        };

    }

    function sort(items, sortType) {
        var compareFunction = getCompareFunctionBySortType(sortType);
        return items.slice(0).sort(compareFunction);
    }

    function getSelectedBookmarks(bookmarks) {
        return _.filter(bookmarks, function (item) {
            return item.selected;
        });
    }

    function getTotalSelectedBookmarks(bookmarks) {
        return getSelectedBookmarks(bookmarks).length;
    }

    function getFilterTerm(filter) {
        if (filter) {
            if (filter.title) {
                return {
                    type: 'title',
                    term: filter.title
                };
            }
            if (filter.tag) {
                return {
                    type: 'tag',
                    term: filter.tag
                };
            }
        }
        return null;
    }

    function getFilteredBookmarks(bookmarks, filter, filterTerm) {
        var term = filterTerm.term;

        function titleCondition(bm) {
            return filterTerm.type !== 'title' || bm.title.indexOf(term) !== -1;
        }

        function tagCondition(bm) {
            return filterTerm.type !== 'tag' || _.findIndex(bm.tags, function (tag) {
                    return tag === filter.tag;
                }) !== -1;
        }

        return _.filter(bookmarks, function (bm) {
            return titleCondition(bm) && tagCondition(bm);
        });
    }

    return {
        filterItems: filterItems,
        getCurrentGroupItems: getCurrentGroupItems,
        getBookmarkById: getBookmarkById,
        getBookmarkIndexById: getBookmarkIndexById,
        getGroupByTitle: getGroupByTitle,
        isCurrentGroup: isCurrentGroup,
        getItemsByGroupId: getItemsByGroupId,
        getParent: getParent,
        isGroup: isGroup,
        getAllGroups: getAllGroups,
        sort: sort,
        getSelectedBookmarks: getSelectedBookmarks,
        getTotalSelectedBookmarks: getTotalSelectedBookmarks,
        getFilterTerm: getFilterTerm,
        getFilteredBookmarks: getFilteredBookmarks
    };
});
