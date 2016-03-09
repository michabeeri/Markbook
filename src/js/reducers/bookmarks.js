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

            case Constants.ADD_BOOKMARK_AND_GROUP:
                return (function () {
                    var newState = state.concat({
                            id: action.group.id,
                            title: action.group.groupName,
                            date: action.group.date,
                            tags: [],
                            children: [action.bookmark.id]
                        },
                        {
                            id: action.bookmark.id,
                            title: action.bookmark.title,
                            date: action.bookmark.date,
                            url: action.bookmark.url,
                            tags: action.bookmark.tags,
                            children: null
                        });

                    var parentId = action.parentGroupId || Constants.ROOT_GROUP_ID;
                    _.find(newState, {id: parentId}).children.push(action.group.id);

                    return newState;
                }());

            case Constants.EDIT_BOOKMARK_AND_CREATE_GROUP:
                return (function () {

                    var bookmarksExcludingEditedBookmark = _.reject(state, {id: action.bookmark.id});

                    var editedBookmark = _.filter(state, {id: action.bookmark.id})[0];

                    var newState = bookmarksExcludingEditedBookmark.concat({
                            id: action.group.id,
                            title: action.group.groupName,
                            date: action.group.date,
                            tags: [],
                            children: [action.bookmark.id]
                        },
                        {
                            id: action.bookmark.id,
                            title: action.bookmark.title,
                            date: editedBookmark.date,
                            url: action.bookmark.url,
                            tags: action.bookmark.tags,
                            children: null
                        });

                    var parentId = action.parentGroupId || Constants.ROOT_GROUP_ID;
                    _.find(newState, {id: parentId}).children.push(action.group.id);

                    return newState;
                }());

            case Constants.EDIT_BOOKMARK:
                return (function () {
                    var editedBookmarkId = action.id;
                    var bookmarksExcludingEditedBookmark = _.reject(state, {id: editedBookmarkId});

                    var editedBookmark = _.filter(state, {id: editedBookmarkId})[0];

                    var newState = bookmarksExcludingEditedBookmark.concat({
                        id: editedBookmarkId,
                        title: action.title,
                        date: editedBookmark.date,
                        url: action.url,
                        tags: action.tags,
                        children: null
                    });

                    var destinationGroup = _.find(newState, {id: action.parentGroupId});
                    var sourceGroup = bookmarksUtil.getParent(newState, editedBookmarkId);

                    if (destinationGroup !== sourceGroup) {
                        destinationGroup.children.push(editedBookmarkId);
                        var indOfBookmark = _.indexOf(sourceGroup.children, editedBookmarkId);
                        if (indOfBookmark > -1) {
                            sourceGroup.children.splice(indOfBookmark, 1);
                        }

                    }

                    return newState;
                }());

            case Constants.TOGGLE_BOOKMARK_SELECTION:
                return _.map(state, function (bm) {
                    if (bm.id === action.id) {
                        return _.assign({}, bm, {selected: !bm.selected});

                    } else if (!action.isMultiSelect) {
                        return _.assign({}, bm, {selected: false});

                    }
                    return bm;
                });

            case Constants.SELECT_DESELECT_ALL:
                return _.map(state, function (bm) {
                    if (_.contains(action.itemIds, bm.id)) {
                        return _.assign({}, bm, {selected: action.isSelectAll});
                    }
                    return bm;
                });

            case Constants.REMOVE_BOOKMARK:
                return (function () {
                    var newState = _.reject(state, function (bm) {
                        return action.ids.indexOf(bm.id) !== -1;
                    });

                    newState.forEach(function (bm) {
                        _.remove(bm.children, function (id) {
                            return action.ids.indexOf(id) !== -1;
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

            case Constants.LOGOUT:
                return initialState;

            case Constants.SET:
                return action.prevState.bookmarks;

            default:
                return state;
        }
    };
});



































