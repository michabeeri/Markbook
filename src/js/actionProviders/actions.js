define(['uuid', 'constants'], function (uuid, Constants) {
    'use strict';

    return {
        addBookmark: function (title, date) {
            return {
                type: Constants.ADD_BOOKMARK,
                id: uuid.v4(),
                title: title,
                date: date
            };
        },
        openBookmarkGroup: function (id) {
            return {
                type: Constants.OPEN_BOOKMARK_GROUP,
                id: id
            };
        },
        editBookmark: function (id) {
            return {
                type: Constants.EDIT_BOOKMARK,
                id: id
            };
        },
        toggleBookmarkSelection: function (id, clearOtherSelection) {
            return {
                type: Constants.TOGGLE_BOOKMARK_SELECTION,
                id: id,
                clearOtherSelection: clearOtherSelection
            };
        },
        removeBookmark: function (id) {
            return {
                type: Constants.REMOVE_BOOKMARK,
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
        }
    };
});
