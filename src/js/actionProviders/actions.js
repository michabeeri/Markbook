define(['uuid', 'constants'], function (uuid, Constants) {
    'use strict';

    var Actions = {
        addNewBookmarkToNewGroup: function (parentGroupId, groupName, title, url, tags) {
            return {
                type: Constants.ADD_BOOKMARK_AND_GROUP,
                parentGroupId: parentGroupId,
                bookmark: {
                    id: uuid.v4(),
                    title: title,
                    url: url,
                    tags: tags,
                    date: new Date()
                },
                group: {
                    id: uuid.v4(),
                    groupName: groupName,
                    date: new Date()
                }
            };
        },
        addBookmark: function (parentGroupId, title, url, tags) {
            return {
                type: Constants.ADD_BOOKMARK,
                id: uuid.v4(),
                parentGroupId: parentGroupId,
                title: title,
                url: url,
                tags: tags,
                date: new Date()
            };
        },
        editBookmark: function (id, parentGroupId, title, url, tags) {
            return {
                type: Constants.EDIT_BOOKMARK,
                id: id,
                parentGroupId: parentGroupId,
                title: title,
                url: url,
                tags: tags
            };
        },
        editBookmarkAndCreateNewGroup: function (id, parentGroupId, groupName, title, url, tags) {
            return {
                type: Constants.EDIT_BOOKMARK_AND_CREATE_GROUP,
                parentGroupId: parentGroupId,
                bookmark: {
                    id: id,
                    title: title,
                    url: url,
                    tags: tags
                },
                group: {
                    id: uuid.v4(),
                    groupName: groupName,
                    date: new Date()
                }
            };
        },
        toggleBookmarkSelection: function (id, isMultiSelect) {
            return {
                type: Constants.TOGGLE_BOOKMARK_SELECTION,
                id: id,
                isMultiSelect: isMultiSelect
            };
        },
        removeBookmark: function (ids) {
            return {
                type: Constants.REMOVE_BOOKMARK,
                ids: ids
            };
        },
        removeAndReparent: function (id) {
            return {
                type: Constants.REMOVE_REPARENT_CHILDREN,
                id: id
            };
        },
        logout: function () {
            return {
                type: Constants.LOGOUT
            };
        },
        setFilter: function (tag, title) {
            return {
                type: Constants.SET_FILTER,
                tag: tag,
                title: title
            };
        },
        setSortType: function (sortType) {
            return {
                type: Constants.SET_SORT_TYPE,
                sortType: sortType
            };
        },
        navigateToPreviousGroup: function (id) {
            return {
                type: Constants.NAVIGATE_TO_PREVIOUS_GROUP,
                id: id
            };
        },
        dragReorderInit: function (sortType, currentGroupId) {
            return {
                type: Constants.DRAG_REORDER_INIT,
                sortType: sortType,
                currentGroupId: currentGroupId
            };
        },
        dragReorder: function (draggedId, draggedOverId, currentGroupId) {
            return {
                type: Constants.DRAG_REORDER,
                draggedId: draggedId,
                draggedOverId: draggedOverId,
                currentGroupId: currentGroupId
            };
        },
        openBookmarkGroup: function (id) {
            return {
                type: Constants.OPEN_BOOKMARK_GROUP,
                id: id
            };
        },
        login: function (username, uid, token) {
            return {
                type: Constants.LOGIN, username: username, uid: uid, token: token
            };
        },
        openBookmarkDataModal: function (id) {
            return {
                type: Constants.OPEN_MODAL,
                modalType: Constants.eModalType.MODAL_BOOKMARK_DATA,
                bookmarkId: id
            };
        },
        openDeleteGroupModal: function (id) {
            return {
                type: Constants.OPEN_MODAL,
                modalType: Constants.eModalType.GROUP_DELETE_NOTIFICATION,
                bookmarkId: id
            };
        },
        openLastItemInGroupDelete: function (id) {
            return {
                type: Constants.OPEN_MODAL,
                modalType: Constants.eModalType.LAST_BOOKMARK_IN_GROUP_ALERT,
                bookmarkId: id
            };
        },
        closeModal: function () {
            return {
                type: Constants.CLOSE_MODAL
            };
        },
        loadData: function () {
            return {
                type: Constants.LOAD_DATA
            };
        },
        storeData: function (bookmarks, sort) {
            return {
                type: Constants.STORE_DATA,
                bookmarks: bookmarks,
                sort: sort
            };
        },
        updateDatabase: function () {
            return {
                type: Constants.UPDATE_DATABASE
            };
        },
        selectDeselectAll: function (itemIds, isSelectAll) {
            return {
                type: Constants.SELECT_DESELECT_ALL,
                itemIds: itemIds,
                isSelectAll: isSelectAll
            };
        },
        setLayout: function (layoutType) {
            return {
                type: Constants.SET_LAYOUT,
                layoutType: layoutType
            };
        },
        turnOnFlag: function (flagName) {
            return {
                type: Constants.ADD_FLAG,
                flag: flagName
            };
        },
        turnOffFlag: function (flagName) {
            return {
                type: Constants.REMOVE_FLAG,
                flag: flagName
            };
        },
        undo: function () {
            return {
                type: Constants.UNDO
            };
        },
        set: function (state) {
            return {
                type: Constants.SET,
                prevState: state
            };
        },
        nop: function () {
            return {
                type: Constants.NOP
            };
        }
    };

    return Actions;
});
