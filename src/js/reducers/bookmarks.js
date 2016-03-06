define(['lodash', 'uuid', 'constants', 'utils/bookmarksUtil'], function (_, uuid, Constants, bookmarksUtil) {

    'use strict';

    var initialState = [{
        id: Constants.ROOT_GROUP_ID,
        title: 'All Bookmarks',
        date: new Date(2015, 10, 18),
        children: [],
        tags: []
    }];

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
                        tags: action.tags,
                        children: null
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

            case Constants.SELECT_DESELECT_ALL:
                return _.map(state, function (bm) {
                    if (_.contains(action.itemIds, bm.id)) {
                        return Object.assign({}, bm, {selected: action.isSelectAll});
                    }
                    return bm;
                });

            case Constants.REMOVE_BOOKMARK:
                return (function () {
                    var newState = _.reject(state, function (bm) {
                        return action.idsToRemove.indexOf(bm.id) !== -1;
                    });

                    newState.forEach(function (bm) {
                        _.remove(bm.children, function (id) {
                            return action.idsToRemove.indexOf(id) !== -1;
                        });
                    });

                    return newState;
                }());

            case Constants.REMOVE_REPARENT_CHILDREN:
                return (function () {
                    var bookmark = _.find(state, {id: action.id});
                    var newState = _.reject(state, {id: action.id});
                    var parentGroup = _.find(state, function (bm) {
                        return bm.children && bm.children.indexOf(action.id) !== -1;
                    });

                    parentGroup.children = parentGroup.children.filter(function (id) {
                        return id !== bookmark.id;
                    }).concat(bookmark.children);

                    return newState;
                }());

            case Constants.DRAG_REORDER_INIT:
                return (function () {
                    var newState = state.slice();
                    var currentGroupIndex = bookmarksUtil.getBookmarkIndexById(newState, action.currentGroupId);
                    //var children = newState[currentGroupIndex].children;
                    var children = bookmarksUtil.getItemsByGroupId(newState, action.currentGroupId);
                    newState[currentGroupIndex].children = bookmarksUtil.sort(children, action.sortType).map(function (bookmark) {
                        return bookmark.id;
                    });
                    return newState;
                }());

            case Constants.DRAG_REORDER:
                return (function () {
                    var newState = state.slice();
                    var currentGroupIndex = bookmarksUtil.getBookmarkIndexById(newState, action.currentGroupId);
                    var children = newState[currentGroupIndex].children;
                    var indexDragged = children.indexOf(action.draggedId);
                    var indexDraggedOver = children.indexOf(action.draggedOverId);
                    children.splice(indexDraggedOver, 0, children.splice(indexDragged, 1)[0]);
                    return newState;
                }());

            case Constants.STORE_DATA:
                return action.bookmarks;

            default:
                return state;
        }
    };
});



































