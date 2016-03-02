define(['lodash', 'uuid', 'constants', 'utils/bookmarksUtil'], function (_, uuid, Constants, bookmarksUtil) {

    'use strict';

    var initialState = [
        {
            id: Constants.ROOT_GROUP_ID,
            title: 'All Bookmarks',
            date: new Date(2015, 10, 18),
            children: ['0001', '0002', '0003', '0004'],
            tags: []
        },
        {
            id: '0001',
            title: 'Fargo Season 2',
            date: new Date(2015, 10, 18),
            children: null,
            url: 'www.tweeter.com',
            tags: ['fargo', 'season2']
        },
        {
            id: '0002',
            title: 'Fargo Season 1',
            date: new Date(2014, 11, 10),
            children: null,
            url: 'www.pinterest.com',
            tags: ['fargo', 'season1']
        },
        {
            id: '0003',
            title: 'Bookmark 2 title',
            date: new Date(2012, 10, 9),
            children: null,
            url: 'www.facebook.com',
            tags: []
        },
        {
            id: '0004',
            title: 'Gaspar Noe Movies',
            date: new Date(2012, 10, 9),
            children: ['0005', '0006'],
            tags: []
        },
        {
            id: '0005',
            title: 'Machete Kills',
            date: new Date(2013, 4, 11),
            children: null,
            tags: []
        },
        {
            id: '0006',
            title: 'Grindhouse',
            date: new Date(2007, 9, 20),
            children: ['0007'],
            tags: ['Grindhouse']
        },
        {
            id: '0007',
            title: 'Group 1',
            date: new Date(2007, 9, 20),
            children: ['0008'],
            tags: ['Group1']
        },
        {
            id: '0008',
            title: 'Group 2',
            date: new Date(2007, 9, 20),
            children: ['0009'],
            tags: []
        },
        {
            id: '0009',
            title: 'Group 3',
            date: new Date(2007, 9, 20),
            children: null,
            tags: ['Group2']
        }
    ];

    return function bookmarks(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {
            case Constants.ADD_BOOKMARK:
                return (function () {
                    var newState = state.concat({
                        id: action.id,
                        title: action.title,
                        date: action.date,
                        url: action.url,
                        tags: action.tags
                    });

                    var parentId = action.parentGroupId || Constants.ROOT_GROUP_ID;
                    _.find(newState, {id: parentId}).children.push(action.id);

                    return newState;
                }());

            case Constants.EDIT_BOOKMARK:
                // open edit modal
                console.log('edit ' + action.id);
                return state;

            case Constants.TOGGLE_BOOKMARK_SELECTION:
                return _.map(state, function (bm) {
                    if (bm.id === action.id) {
                        return Object.assign({}, bm, {selected: !bm.selected});

                    } else if (!action.isMultiSelect) {
                        return Object.assign({}, bm, {selected: false});

                    }
                    return bm;
                });

            case Constants.REMOVE_BOOKMARK:
                // should implement smarter logic here:
                // delete group if last item removed
                // open modal to ask before deleting group

                return (function () {

                    var idsToRemove = getIdsToRemove(getTopSingleItemGroup(action.id));
                    var newState = _.reject(state, function (bm) {
                        return idsToRemove.indexOf(bm.id) !== -1;
                    });

                    newState.forEach(function (bm) {
                        if (bm.children) {
                            _.remove(bm.children, function (id) {
                                return idsToRemove.indexOf(id) !== -1;
                            });
                        }
                    });

                    function getIdsToRemove(bookmarkId) {
                        var ids = [bookmarkId];
                        var bookmark = _.find(state, {id: bookmarkId});

                        if (bookmark.children) {
                            bookmark.children.forEach(function (id) {
                                ids = ids.concat(getIdsToRemove(id));
                            });
                        }
                        return ids;
                    }

                    function getTopSingleItemGroup(id) {
                        var parentGroup = _.find(state, function (bm) {
                            return bm.children && bm.children.indexOf(action.id) !== -1;
                        });

                        if (parentGroup.id === Constants.ROOT_GROUP_ID || parentGroup.children.length > 1) {
                            return id;
                        }

                        return getTopSingleItemGroup(parentGroup.id);
                    }

                    return newState;
                }());

            case Constants.REMOVE_REPARENT_CHILDREN:
                return (function () {
                    var bookmark = _.find(state, {id: action.id});
                    var parentGroup = _.find(state, function (bm) {
                        return bm.children && bm.children.indexOf(action.id) !== -1;
                    });

                    var newState = _.reject(state, {id: action.id});
                    parentGroup.children = parentGroup.children.concat(bookmark.children);
                    return newState;
                }());

            case Constants.DRAG_REORDER:
                return (function () {
                    var newState = state.slice();
                    var currentGroupIndex = bookmarksUtil.getBookmarkIndexById(action.currentGroup);
                    var children = _.find(newState, currentGroupIndex).children;
                    console.log(children);
                    var indexDragged = _.find(children, action.draggedId.substring(2));
                    var indexDraggedOver = _.find(children, action.draggedOverId.substring(2));
                    children.splice(indexDraggedOver, 0, children.splice(indexDragged, 1)[0]);
                    console.log(children);
                    return newState;
                }());

            default:
                return state;
        }
    };
});



































