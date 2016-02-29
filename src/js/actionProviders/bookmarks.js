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
        removeBookmark: function (id) {
            return {
                type: Constants.REMOVE_BOOKMARK,
                id: id
            };
        }
    };
});
