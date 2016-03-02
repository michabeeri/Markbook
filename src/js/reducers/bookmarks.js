define(['lodash', 'uuid', 'constants', 'utils/bookmarksUtil'], function (_, uuid, Constants, bookmarksUtil) {

    'use strict';

    var initialState = [
        {
            id: Constants.ROOT_GROUP_ID,
            title: 'All Bookmarks',
            date: new Date(2015, 10, 18),
            children: ['bm0001', 'bm0002', 'bm0003', 'bm0004'],
            tags: []
        },
        {
            id: 'bm0001',
            title: 'Fargo Season 2',
            date: new Date(2015, 10, 18),
            children: null,
            url: 'www.tweeter.com',
            tags: ['fargo', 'season2']
        },
        {
            id: 'bm0002',
            title: 'Fargo Season 1',
            date: new Date(2014, 11, 10),
            children: null,
            url: 'www.pinterest.com',
            tags: ['fargo', 'season1']
        },
        {
            id: 'bm0003',
            title: 'Bookmark 2 title',
            date: new Date(2012, 10, 9),
            children: null,
            url: 'www.facebook.com',
            tags: []
        },
        {
            id: 'bm0004',
            title: 'Gaspar Noe Movies',
            date: new Date(2012, 10, 9),
            children: ['bm0005', 'bm0006'],
            tags: []
        },
        {
            id: 'bm0005',
            title: 'Machete Kills',
            date: new Date(2013, 4, 11),
            children: null,
            tags: []
        },
        {
            id: 'bm0006',
            title: 'Grindhouse',
            date: new Date(2007, 9, 20),
            children: ['bm0007'],
            tags: ['Grindhouse']
        },
        {
            id: 'bm0007',
            title: 'Group 1',
            date: new Date(2007, 9, 20),
            children: ['bm0008'],
            tags: ['Group1']
        },
        {
            id: 'bm0008',
            title: 'Group 2',
            date: new Date(2007, 9, 20),
            children: ['bm0009'],
            tags: []
        },
        {
            id: 'bm0009',
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
                    var currentGroupIndex = bookmarksUtil.getBookmarkIndexById(newState, action.currentGroupId);
                    var children = newState[currentGroupIndex].children;
                    var indexDragged = children.indexOf(action.draggedId);
                    var indexDraggedOver = children.indexOf(action.draggedOverId);
                    children.splice(indexDraggedOver, 0, children.splice(indexDragged, 1)[0]);
                    return newState;
                }());

            default:
                return state;
        }
    };
});



































