define(['uuid', 'constants'], function (uuid, Constants) {
    'use strict';

    return {
        //addBookmarkAsync: function (parentGroupId, title, url, tags) {
        //    return function (dispatch) {
        //        return this.slowOperation().then(
        //            function () {
        //                dispatch(this.addBookmark(parentGroupId, title, url, tags));
        //            }.bind(this)
        //        );
        //    }.bind(this);
        //},
        //slowOperation: function () {
        //    return Promise.resolve('ok');
        //},
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
        editBookmark: function (id) {
            return {
                type: Constants.EDIT_BOOKMARK,
                id: id
            };
        },
        toggleBookmarkSelection: function (id, isMultiSelect) {
            return {
                type: Constants.TOGGLE_BOOKMARK_SELECTION,
                id: id,
                isMultiSelect: isMultiSelect
            };
        },
        removeBookmark: function (id) {
            return {
                type: Constants.REMOVE_BOOKMARK,
                id: id
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
                modalType: Constants.eModalType.MODAL_ADD_BOOKMARK,
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
        }
    };
});
